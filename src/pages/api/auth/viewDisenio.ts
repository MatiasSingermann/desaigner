import { PrismaClient, coleccion, usuario } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { checkEmail, disenioExists, userExists } from "../functions";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "GET"){
        const id = parseInt(req.query.id as string);
        if(!id){
            return res.status(400).json({message: "Ningun id de disenio fue recibido"});
        }
        if(session){
            const email = session?.user.email;
            return await viewDisenio(res, email, id);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function viewDisenio(res: NextApiResponse, email: string, id: number){
    if(!email || id <= 0){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quiz //as escribiste algun parametro mal"});
    }
    const disenioExistente: boolean = await disenioExists(id);
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere visualizar no existe"});
    } 

    const duenio = !!await prisma.disenio.findFirst({
        where: {
            id: id,
            duenio_id: email 
        }
    })
    const permiso = !!await prisma.autorizados.findFirst({
        where: {
            disenio_id: id,
            usuario_email: email
        }
    })

    if(!duenio && !permiso){
        return res.status(400).json({message: "No tienes acceso a este disenio"});
    }
    try{
        const data = await prisma.disenio.findFirst({
            where: {
                id: id
            }
        })
        if(data){
            return res.status(200).json(data);
        }
    } catch{
        return res.status(500).end();
    }
}