import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { coleccionExists, checkEmail, userExists } from "../functions";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "DELETE"){
        const nombre = req.query.nombre as string;
        if(!nombre){
            return res.status(400).json({message: "No se recibio el id de ningun disenio"});
        }
        if(session){
            const email = session?.user.email;
            return await deleteColeccion(req, res, email, nombre);
        }
        return res.status(403).end();
    }
    else{
        return res.status(405).end();
    }
}

async function deleteColeccion(req: NextApiRequest, res: NextApiResponse, email: string, nombre: string){
    if(!nombre){
        return res.status(400).json({message: "No se recibio ningun nombre de coleccion"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const coleccionExistente: boolean = await coleccionExists(nombre, email);
    if(!coleccionExistente){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }

    try{
        const coleccion = await prisma.coleccion.findFirst({
            where:{
                nombre: nombre,
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