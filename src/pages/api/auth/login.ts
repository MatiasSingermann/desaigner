import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { isString, checkEmail, isEmpty, isNullorUndefined, checkContrasenia } from "../functions";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { type } from "os";
import Email from "next-auth/providers/email";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        return await revisarDatos(req, res);
    }
    else{
        return res.status(405).end();
    }
}

async function revisarDatos(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    if (!('email' in body && 'contrasenia' in body)) {
        return res.status(400).json({message: "Falta el mail o la contraseña"});
    }
    if(isNullorUndefined(body.email) || isNullorUndefined(body.contrasenia)){
        return res.status(400).json({message: "Algun parametro es null o undefined"});
    }
    if(!isString(body.email) || !isString(body.contrasenia)){
        return res.status(400).json({message: "El email o la contraseña no son un string"});
    }
    if(isEmpty(body.email) || isEmpty(body.contrasenia)){
        return res.status(400).json({message: "Algun parametro esta vacio"});
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
            return res.status(200).json(body.email.toLowerCase());
        }
        else{
            return res.status(401).end();
        }   
    } catch(error) {
        console.error(error);
        return res.status(500).end(); //puede ser un 500 tmb asi que no se
    }
}