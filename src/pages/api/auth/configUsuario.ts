import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { checkEmail } from "../functions";

const prisma = new PrismaClient();

interface ExtendedNextApiRequest extends NextApiRequest{
    body: {
        estilo: number,
        idioma: number,
        font: number
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "PATCH"){
        if(session){
            const email = session?.user.email;
            return await configUsuario(req, res, email);
        }
    }
    else{
        return res.status(405).end();
    }
}

async function configUsuario(req: ExtendedNextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;
    
    if(!body.estilo || !email || !body.idioma || !body.font){
        return res.status(400).json({message: "Algun parametro no cumple con los requisitos"});
    }
    if(body.estilo < 0 || body.estilo > 1 || body.idioma < 0 || body.idioma > 10 || body.font < 0 || body.font > 4){
        return res.status(400).json({message: "Alguna configuración tiene un valor invalido"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El email no es valido"});
    }

    try{
        const updateData = await prisma.usuario.update({
            where:{
                email: email
            },
            data:{
                estilo: body.estilo,
                idioma: body.idioma,
                font: body.font
            }
        }) 
        if(updateData){
            return res.status(200).json({message: "Configuración editada con exito"});
        }
    } catch {
        return res.status(500).end();
    }
}