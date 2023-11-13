import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { userExists, checkEmail} from "../functions";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "GET"){
        if(session){
            const email = session?.user.email;
            return await diseñosRecientes(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function diseñosRecientes(req: NextApiRequest, res: NextApiResponse, email: string){
    if(!email){
        return res.status(400).json({message: "Algun parametro enviado no cumple los requisitos"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }

    try{
        const diseños = await prisma.disenio.findMany({
            take: 3,
            where:{
                duenio_id: email
            },
            orderBy:{
                fecha: "desc"
            },
            select:{
                imagen: true
            }
        })
        if(diseños){
            return res.status(200).json(diseños);
        }
        return res.status(204).json({message: "El usuario no tiene diseños"});
    } catch {
        return res.status(500).end();
    }
}