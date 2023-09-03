import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { coleccionExists, checkEmail, userExists } from "../functions";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

interface ExtendedNextApiRequestDisenios extends NextApiRequest{
    body: {
        nombre: string
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "DELETE"){
        if(session){
            const email = session?.user.email;
            return await deleteColeccion(req, res, email);
        }
        return res.status(403).end();
    }
    else{
        return res.status(405).end();
    }
}

async function deleteColeccion(req: ExtendedNextApiRequestDisenios, res: NextApiResponse, email: string){
    const body = req.body;

    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const coleccionExistente: boolean = await coleccionExists(body.nombre, email);
    if(!coleccionExistente){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }

    try{
        const coleccion = await prisma.coleccion.findFirst({
            where:{
                nombre: body.nombre,
                duenio_id: email
            }
        })
        if(coleccion){
            const relaciones = await prisma.disenioYcoleccion.findMany({
                where:{
                    coleccion_id: coleccion.id
                }
            })
            if(relaciones){
                await prisma.disenioYcoleccion.deleteMany({
                where:{
                    coleccion_id: coleccion.id
                }
            })
            
            const success = await prisma.coleccion.delete({
                where:{
                    id: coleccion.id
                }
            })
            if(success){
                return res.status(200).json({message: "Coleccion eliminada exitosamente"});
            }
        }
            
        }
        return res.status(400).json({message: "Algo salio mal"});
    } catch {
        return res.status(500).end();
    }
}