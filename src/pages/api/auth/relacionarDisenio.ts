import { PrismaClient, coleccion, usuario } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { checkEmail, coleccionExists, disenioExists, userExists } from "../functions";

const prisma = new PrismaClient();

interface ExtendedNextApiRequestAgregarDisenio extends NextApiRequest{
    body: {
        coleccion: string,
        id: number
    }
}

export default async function handler(req: ExtendedNextApiRequestAgregarDisenio, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "PATCH"){
        const id = req.body.id;
        if(!id){
            return res.status(400).json({message: "No se recibio el id de ningun disenio"});
        }
        if(session){
            const email = session?.user.email;
            return await agregarDisenioAcoleccion(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function agregarDisenioAcoleccion(req: ExtendedNextApiRequestAgregarDisenio, res:NextApiResponse, email: string){
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
        return res.status(404).json({message: "El disenio que se quiere agregar no existe"});
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
            const relacion = !!await prisma.disenioYcoleccion.findFirst({
                where:{
                    disenio_id: body.id, 
                    coleccion_id: coleccion.id
                }
            })
            if(relacion){
                return res.status(404).json({message: "El disenio ya se encuentra en la coleccion a la que se lo quiere agregar"});
            }

            const success = await prisma.disenioYcoleccion.create({
                data: {
                    disenio_id: body.id,
                    coleccion_id: coleccion.id
                }
            })
            if(success){
                return res.status(200).json({message: "Disenio agregado con exito"}); 
            }
            return res.status(404).json({message: "Algo salio mal en la unificacion del disenio y la coleccion"});
        }
        return res.status(404).json({message: "No se pudo encontrar la coleccion"});
    } catch {
        return res.status(500).end();
    }
}