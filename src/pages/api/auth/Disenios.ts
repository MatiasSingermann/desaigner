import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { tidyBase64, isbase64, userExists, isEmpty, isNullorUndefined, checkEmail, coleccionExists, coleccionIsFromUser, isInt, hasAccesToken, renewTokens } from "../functions";
import { v2 } from "cloudinary";

const prisma = new PrismaClient();
const cloudinary = v2;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
    const AT = cookies.DesAIgnerToken;
    const RT = cookies.DesAIgnerRefeshToken;
    const data = hasAccesToken(AT);
    if(req.method === "POST"){
        if(Object.keys(data).length != 0){
                const email = Object(data).email;
                if(req.body.coleccion){
                    return await diseños(req, res, email);
                }
                else{
                    return await crearDisenio(req, res, email);
                }
        }
        else{
            const data = renewTokens(RT, res);
            if(Object.keys(data).length != 0){
                const email = Object(data).email; 
                if(req.body.coleccion){
                    return await diseños(req, res, email);
                }
                else{
                    return await crearDisenio(req, res, email);
                }
            }
            else{
                res.status(403).end();
            }
        }
    }
    else{
        res.status(405).end();
    }
}

async function diseños(req: NextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;

    if(isNullorUndefined(body.coleccion) || isNullorUndefined(email)){
        res.status(400).json({message: "Algun parametro enviado es undefined o null"});
    }
    if(isEmpty(body.coleccion) || isEmpty(email)){
        res.status(400).json({message: "El email o el nombre de la coleccion enviado esta vacio"});
    }
    if(!checkEmail(email)){
        res.status(400).json({message: "El usuario no es valido"});
    }
    if(!isInt(body.coleccion)){
        res.status(400).json({message: "La coleccion enviada no es un INT, debe ser un INT"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
    if(!usuarioExistente){
        res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    if(!coleccionExists(body.coleccion, email)){
        res.status(400).json({message: "La coleccion enviada no existe"});
    }
    if(!coleccionIsFromUser(email, body.coleccion)){
        res.status(403).json({message: "No tienes acceso a esta coleccion"});
    }

    try{
        const data = await prisma.coleccion.findMany({
            where: {
                duenio_id: email,
                id: body.coleccion
            },
            include: {
                disenios: true
            }
        })
        if(Object.keys(data).length == 0){
            return res.status(204).json({message: "La coleccion no tieene diseños"});
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

async function crearDisenio(req: NextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;

    if(isNullorUndefined(body.nombre) || isNullorUndefined(email)){
        res.status(400).json({message: "Algun parametro enviado es undefined o null"});
    }
    if(isEmpty(email) || isEmpty(body.nombre)){
        res.status(400).json({message: "O el usuario o el nombre de la coleccion estan vacios"});
    }
    if(!checkEmail(email)){
        res.status(400).json({message: "El usuario no es valido"});
    }
    if(!isbase64(body.disenioImg) || !isbase64(body.mascaraImg)){
        res.status(400).json({message: "Las imagenes enviadas no estan en base 64"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
    if(!usuarioExistente){
        res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const coleccionExistente: boolean = await coleccionExists(body.nombre, email);
    if(!coleccionExistente){
        res.status(400).json({message: "La coleccion ingresada no existe"});
    }

    const disenioURL = "";
    const mascaraURL = "";

    cloudinary.uploader.upload(tidyBase64(body.disenioImg), {
        resource_type: "image"
    }).then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
    cloudinary.uploader.upload(tidyBase64(body.mascaraImg), {
        resource_type: "image"
    }).then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
}