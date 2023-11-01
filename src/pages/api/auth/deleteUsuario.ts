import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { checkContrasenia, checkEmail } from "../functions";
import { authOptions } from "./[...nextauth]";
import crypto from "crypto";

const prisma = new PrismaClient();

interface ExtendedNextApiRequest extends NextApiRequest{
    body: {
        readonly contrasenia: string
    }
}
export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "POST"){
        if(session){
            const email = session?.user.email;
            return await deleteUsuario(req, res, email);
        }
    }
    else{
        return res.status(405).end();
    }
}

async function deleteUsuario(req: ExtendedNextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;
    if(!body.contrasenia || !email){
        return res.status(400).json({message: "Falta algun parametro"});
    }
    if(!checkContrasenia(body.contrasenia)){
        return res.status(400).json({message: "La contrasenia no es valida"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El email no es valido"});
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

    try{
        const user = await prisma.usuario.findFirst({
            where: {
                email: email.toLowerCase(),
                contrasenia: body.contrasenia
            }
        })
        if(user){
            await prisma.autorizados.deleteMany({
                where:{
                    usuario_email: email
                }
            })
            const disenios = await prisma.disenio.findMany({
                where:{
                    duenio_id: email
                }
            })
            if(disenios){
                for(let i = 0; i < disenios.length; i++){
                    await prisma.mueble.deleteMany({
                        where:{
                            disenio_id: disenios[i]?.id
                        }
                    })
                    await prisma.disenioYcoleccion.deleteMany({
                        where:{
                            disenio_id: disenios[i]?.id
                        }
                    })
                    await prisma.autorizados.deleteMany({
                        where:{
                            disenio_id: disenios[i]?.id
                        }
                    })

                    const publicId = getPublicIdFromUrl(disenios[i]?.imagen!);

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
                await prisma.disenio.deleteMany({
                    where:{
                        duenio_id: email
                    }
                })
            }
            await prisma.coleccion.deleteMany({
                where:{
                    duenio_id: email
                }
            })
        }
        else{
            return res.status(401).json({message: "El usuario no pudo ser encontrado"});
        }  
        const success = await prisma.usuario.delete({
            where:{
                email: email.toLowerCase()
            }
        })

        if(success){
            return res.status(200).json({message: "Usuario eliminado con exito"});
        }
        return res.status(404).json({message: "Algo fallo en el proceso"});
    } catch {
        return res.status(500).end();
    }
}