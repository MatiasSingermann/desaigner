import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { coleccionExists, checkEmail, userExists } from "../functions";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

interface ExtendedNextApiRequestCreateColeccion extends NextApiRequest{
    body: {
        nombre: string,
        favorito: boolean
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "POST"){
        if(session){
            const email = session?.user.email;
            return await crearColeccion(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function crearColeccion(req: ExtendedNextApiRequestCreateColeccion, res: NextApiResponse, email: string){
    const body = req.body;

    if(!body.nombre || body.favorito === undefined || !email){
        return res.status(400).json({message: "Algun parametro enviado no cumple los requisitos"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const coleccionExistente: boolean = await coleccionExists(body.nombre, email);
    if(coleccionExistente){
        return res.status(400).json({message: "La coleccion enviada ya existe"});
    }


    try{
        const newColeccion = await prisma.coleccion.create({
            data: {
                nombre: body.nombre,
                favorito: body.favorito,
                duenio_id: email
            }
        })
        if(newColeccion){
            return res.status(200).json({message: "Nueva coleccion creada con exito"});
        }
    } catch {
        return res.status(500).end();
    }
}