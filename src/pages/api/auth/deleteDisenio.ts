import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { checkEmail, disenioExists, userExists } from "../functions";
import crypto from "crypto";

const prisma = new PrismaClient();

interface ExtendedNextApiRequest extends NextApiRequest{
    body: {
        readonly id: number
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "POST"){
        if(session){
            const email = session?.user.email;
            return await deleteDisenio(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function deleteDisenio(req: NextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;
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
    const disenioExistente: boolean = await disenioExists(body.id); // tizi was here 🐔🐨
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere visualizar no existe"});
    }

    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const getPublicIdFromUrl = (url: string) => {
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const generateSHA1 = (data: string) => {
        const hash = crypto.createHash("sha1");
        hash.update(data);
        return hash.digest("hex");
    }

    const generateSignature = (publicId: string, apiSecret: string) => {
        const timestamp = new Date().getTime();
        return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    };

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
        const autorizados = await prisma.autorizados.findFirst({
            where:{
                disenio_id: body.id
            }
        })
        if(autorizados){
            await prisma.autorizados.deleteMany({
                where:{
                    disenio_id: body.id
                }
            })
        }
        
        const relacion = await prisma.disenioYcoleccion.deleteMany({
            where:{
                disenio_id: body.id
            }
        })
        if(relacion){
            const muebles = await prisma.mueble.deleteMany({
                where:{
                    disenio_id: body.id
                }
            })
            if(muebles){
                const disenio = await prisma.disenio.findFirst({
                    where:{
                        id: body.id
                    }
                })
                if(disenio){
                    const publicId = getPublicIdFromUrl(disenio.imagen);

                    if(publicId){
                        const timestamp = new Date().getTime();
                        const signature = generateSHA1(generateSignature(publicId, process.env.CLOUDINARY_SECRET!));
                        const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME!}/image/destroy`;

                        try{
                            const result = await fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    public_Id: publicId,
                                    signature: signature,
                                    api_key: process.env.CLOUDINARY_KEY,
                                    timestamp: timestamp
                                })
                            })

                            if(!result){
                                return res.status(400).json({message: "El diseño de Cloudinary no pudo ser borrado"});
                            }

                        } catch(error){
                            return res.status(500).end();
                        }
                    }
                }
                

                const success = await prisma.disenio.delete({
                    where: {
                        id: body.id
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