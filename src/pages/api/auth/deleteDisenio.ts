import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { checkEmail, disenioExists, userExists } from "../functions";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "GET"){
        const id = parseInt(req.query.id as string);
        if(!id){
            return res.status(400).json({message: "No se recibio el id de ningun disenio"});
        }
        if(session){
            const email = session?.user.email;
            return await deleteDisenio(req, res, email, id);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function deleteDisenio(req: NextApiRequest, res: NextApiResponse, email: string, id: number){
    if(!email || id <= 0){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const disenioExistente: boolean = await disenioExists(id); // tizi was here 🐔🐨
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere visualizar no existe"});
    }

    const duenio = !!await prisma.disenio.findFirst({
        where: {
            id: id,
            duenio_id: email 
        }
    })
    if(!duenio){
        return res.status(400).json({message: "No te pertenece este disenio"});
    }

    try{
        const autorizados = await prisma.autorizados.findFirst({
            where:{
                disenio_id: id
            }
        })
        if(autorizados){
            await prisma.autorizados.deleteMany({
                where:{
                    disenio_id: id
                }
            })
        }
        
        const relacion = await prisma.disenioYcoleccion.deleteMany({
            where:{
                disenio_id: id
            }
        })
        if(relacion){
            const muebles = await prisma.mueble.deleteMany({
                where:{
                    disenio_id: id
                }
            })
            if(muebles){
                const success = await prisma.disenio.delete({
                    where: {
                        id: id
                    }
                })
                if(success){
                    return res.status(200).json({message: "Disenio borrado con exito"});
                }
                return res.status(400).json({message: "Algo salio mal"});
            }
            return res.status(400).json({message: "El disenio a eliminar no tenia muebles, esto no deberia ser posible"});
        }
        else{
            return res.status(400).json({message: "El disenio a eliminar no tenia ninguna coleccion, esto no deberia ser posible"});
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).end();
    }
}