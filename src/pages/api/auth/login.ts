import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { checkEmail, checkContrasenia } from "../functions";

const prisma = new PrismaClient();

interface ExtendedNextApiRequest extends NextApiRequest{
    body: {
        readonly email: string,
        readonly contrasenia: string
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        return await revisarDatos(req, res);
    }
    else{
        return res.status(405).end();
    }
}

async function revisarDatos(req: ExtendedNextApiRequest, res: NextApiResponse) {
    const body = req.body;
    if (!('email' in body && 'contrasenia' in body)) {
        return res.status(400).json({message: "Falta el mail o la contraseña"});
    }
    if(!body.email || !body.contrasenia){
        return res.status(400).json({message: "Algun parametro no cumple con los requisitos"});
    }
    if(!checkContrasenia(body.contrasenia)){
        return res.status(400).json({message: "La contrasenia no es valida"});
    }
    if(!checkEmail(body.email)){
        return res.status(400).json({message: "El email no es valido"});
    }
    try{
        const user = await prisma.usuario.findFirst({
            where: {
                email: body.email.toLowerCase(),
                contrasenia: body.contrasenia
            }
        })
        if(user){
            return res.status(200).end();
        }
        else{
            return res.status(401).end();
        }   
    } catch(error) {
        console.error(error);
        return res.status(500).end();
    }
}