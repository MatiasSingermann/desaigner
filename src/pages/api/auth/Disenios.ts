import { PrismaClient, coleccion, usuario } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { disenioFromUserExists, isArrayEmpty, disenioExists, isbase64, userExists, checkEmail, coleccionExists, coleccionIsFromUser, objectHasData } from "../functions";
import { v2 } from "cloudinary";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
const cloudinary = v2;

interface ExtendedNextApiRequestDisenios extends NextApiRequest{
    body: {
        coleccion: string
    }
}

export default async function handler(req: ExtendedNextApiRequestDisenios, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "POST"){
        if(session){
            const email = session?.user.email;
            return await diseños(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function diseños(req: ExtendedNextApiRequestDisenios, res: NextApiResponse, email: string){
    const body = req.body;

    if(!body.coleccion || !email){
        return res.status(400).json({message: "Algun parametro enviado no cumple los requisitos"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    if(!await coleccionExists(body.coleccion, email)){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }

    try{
        const data = await prisma.coleccion.findFirst({
            where: {
                duenio_id: email,
                nombre: body.coleccion
            },
            select: {
                disenios: {
                    include: {
                        disenio: {
                            include:{
                                muebles: true,
                                permitidos: true
                            }
                        }
                    }
                }
            }
        })
        if(data?.disenios.length === 0){
            return res.status(204).json({message: "La coleccion no tiene disenios"});
        }
        if(data){
            return res.status(200).json(data);
        }
        return res.status(400).json({message: "Algo salio mal"}); //no se si el status esta bien pero bue
    } catch {
        return res.status(500).end();
    }
}