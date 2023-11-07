import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkEmail, userExists } from "../functions";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "POST"){
        if(session){
            const email = session?.user.email;
            return await colecciones(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
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