import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { checkEmail, coleccionExists, disenioExists, userExists } from "../functions";

const prisma = new PrismaClient();

interface ExtendedNextApiRequestRemoverDisenio extends NextApiRequest{
    body: {
        coleccion: string,
        id: number
    }
}

export default async function handler(req: ExtendedNextApiRequestRemoverDisenio, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "PATCH"){
        const id = req.body.id;
        if(!id){
            return res.status(400).json({message: "No se recibio el id de ningun disenio"});
        }
        if(session){
            const email = session?.user.email;
            return await removerDisenio(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function removerDisenio(req: ExtendedNextApiRequestRemoverDisenio, res: NextApiResponse, email: string){
    const body = req.body;
    
    if(!body.coleccion){
        return res.status(400).json({message: "No se recibio el nombre de ninguna coleccion"});
    }
    if(!email || body.id <= 0){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const disenioExistente: boolean = await disenioExists(body.id);
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere remover no existe"});
    }
    if(!await coleccionExists(body.coleccion, email)){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }

    const duenio = !!await prisma.disenio.findFirst({
        where: {
            id: body.id,
            duenio_id: email 
        }
    })
    if(!duenio){
        return res.status(400).json({message: "No te pertenece este disenio"});
    }

    try{
        const coleccion = await prisma.coleccion.findFirst({
            where:{
                duenio_id: email,
                nombre: body.coleccion
            }
        })
        if(coleccion){
            const relacion = await prisma.disenioYcoleccion.findFirst({
                where:{
                    disenio_id: body.id, 
                    coleccion_id: coleccion.id
                }
            })
            if(relacion){
                const success = await prisma.disenioYcoleccion.delete({
                    where:{
                        id: relacion.id
                    }
                })
                if(success){
                    return res.status(200).json({message: "Disenio removido con exito"}); 
                }
                return res.status(404).json({message: "Algo salio mal al intentar remover el disenio de la coleccion"});
            }
            return res.status(404).json({message: "El disenio especificado no se encontro en la coleccion enviada"});
        }
        return res.status(404).json({message: "La coleccion no existe"});            
    } catch{
        return res.status(500).end();
    }
}