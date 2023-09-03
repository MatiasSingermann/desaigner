import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { checkEmail, disenioExists, userExists } from "../functions";

const prisma = new PrismaClient();

interface ExtendedNextApiRequestNoPermitirUsuario extends NextApiRequest{
    body: {
        usuario: string,
        id: number
    }
}

export default async function handler(req: ExtendedNextApiRequestNoPermitirUsuario, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "DELETE"){
        const id = req.body.id;
        if(!id){
            return res.status(400).json({message: "No se recibio el id de ningun disenio"});
        }
        if(session){
            const email = session?.user.email;
            return await revocarUsuario(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function revocarUsuario(req: ExtendedNextApiRequestNoPermitirUsuario, res: NextApiResponse, email: string){
    const body = req.body;
    
    if(!email || body.id <= 0 || !body.usuario){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente, tambien es posible que el usuario a autorizar no haya sido enviado"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const usuarioAutorizadoExiste: boolean = await userExists(body.usuario);
    if(!usuarioAutorizadoExiste){
        return res.status(400).json({message: "El usuario que se quiere autorizar no existe"});
    }
    const disenioExistente: boolean = await disenioExists(body.id);
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere visualizar no existe"});
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
        const yaAutorizado = await prisma.autorizados.findFirst({
            where: {
                disenio_id: body.id,
                usuario_email: body.usuario
            }
        })
        if(yaAutorizado){
            const desautorizar = await prisma.autorizados.delete({
                where: {
                    id: yaAutorizado.id
                }
            })
            if(desautorizar){
                return res.status(201).json({message: "Usuario desautorizado con exito"});
            }
        }
        return res.status(200).json({message: "Este usuario no esta autorizado en primer lugar"});
    } catch{
        return res.status(500).end();
    }
}