import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { coleccionExists, checkEmail, userExists, coleccionIsFromUser } from "../functions";
import { getSession } from "next-auth/react";
import Email from "next-auth/providers/email";

const prisma = new PrismaClient();

interface ExtendedNextApiRequestCreateColeccion extends NextApiRequest{
    body: {
        nombre: string,
        favorito: boolean
    }
}

interface ExtendedNextApiRequestDisenios extends NextApiRequest{
    body: {
        nombre: string
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const session = await getSession({req});
    // if(req.method === "POST"){
    //     if(session){
    //         const email = session.user.email as string;
    //         if(req.body.nombre){
    //             return await crearColeccion(req, res, email);
    //         }
    //         else{
    //             return await colecciones(req, res, email);
    //         }
    //     }
    //     else{
    //         return res.status(403).end();
    //     }
    // }
    // if(req.method === "DELETE"){
    //     if(session){
    //         const email = session.user.email as string;
    //         return await deleteColeccion(req, res, email);
    //     }
    //     return res.status(403).end();
    // }
    // else{
    //     return res.status(405).end();
    // }
    const email = "uwu@gmail.com";
    return await crearColeccion(req, res, email);
}

async function colecciones(req: NextApiRequest, res: NextApiResponse, email: string) {
    //chequeos de informacion
    if(!email){
        return res.status(400).json({message: "El email enviado tiene algun error"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }

    //la query en si
    try{
        const data = await prisma.coleccion.findMany({
            where:{
                duenio_id: email
            }
        })
        if(Object.keys(data).length === 0){
            return res.status(204).json({message: "El usuario no tiene colecciones"});
        }
        if(data){
            return res.status(200).json(data);
        }
        else{
            return res.status(400).json({message: "Algo salio mal"}); //no se si el status esta bien pero bue
        }
    } catch {
        return res.status(500).end();
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
            const success = await prisma.coleccion.delete({
                where:{
                    id: coleccion.id
                }
            })
        }
        return res.status(200).json({message: "Coleccion eliminada exitosamente"});
    } catch {
        return res.status(500).end();
    }
}