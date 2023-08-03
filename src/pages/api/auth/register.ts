import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { checkEmail, checkContrasenia } from "../functions";

const prisma = new PrismaClient();

interface ExtendedNextApiRequest extends NextApiRequest{
    body: {
        email: string,
        contrasenia: string
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        return await crearUsuario(req, res);
    }
    else{
        return res.status(405).end();
    }
}

async function crearUsuario(req: ExtendedNextApiRequest, res: NextApiResponse){
    const body = req.body;
    if (!('email' in body && 'contrasenia' in body)) {
        return res.status(400).json({message: "Falta el mail o la contraseña"});
    }
    if(!body.email || !body.contrasenia){
        return res.status(400).json({message: "Algun parametro no cumple con los requisitos"});
    }
    if(!checkEmail(body.email)){
        return res.status(400).json({message: "El email no es valido"});
    }
    if(!checkContrasenia(body.contrasenia)){
        return res.status(400).json({message: "La contrasenia no cumple con los parametros requeridos"});
    }
    try{
        const newUser = await prisma.usuario.create({
            data: {
                email: body.email.toLowerCase(),
                contrasenia: body.contrasenia,
            }
        });
        if(newUser){
            return res.status(200).json({message: "Se ha creado con exito el perfil para: " + newUser.email});
        }
        
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({message: "La cuenta ya existe"});
        }
        return res.status(500).end();
    }

    // async function crearAdmin(req: NextApiRequest, res: NextApiResponse){
    //     //esta funcion se espera que se use de forma correcta y por ende no trae ningn tipo de revisión
    //     const body = req.body;
    //     try{
    //         const newUser = await prisma.usuario.create({
    //             data: {
    //                 email: body.email.toLowerCase(),
    //                 contrasenia: body.contrasenia,
    //                 rolUsuario: 1
    //             }
    //         });
    //         if(newUser && newUser.rolUsuario == 1){
    //             return res.status(200).json({message: "Se a creado con exito el perfil de admin 😎🤑 para: " + newUser.email});
    //         }
    //         else if (newUser) {
    //             return res.status(200).json({message: "Se a creado con exito el perfil para: " + newUser.email});
    //         }
            
    //     } catch(error) {
    //         if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //             return res.status(409).json({message: "La cuenta ya existe"});
    //         }
    //         return res.status(500).end();
    //     }
    // }
}