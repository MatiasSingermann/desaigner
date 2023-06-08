import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { isBoolean, coleccionExists, checkEmail, isEmpty, isNullorUndefined, userExists, hasAccesToken, renewTokens } from "../functions";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
    const AT = cookies.DesAIgnerToken;
    const RT = cookies.DesAIgnerRefeshToken;
    const data = hasAccesToken(AT);
    if(req.method === "POST"){
        if(Object.keys(data).length != 0){
                const email = Object(data).email;
                if(req.body.nombre){
                    return await crearColeccion(req, res, email);
                }
                else{
                    return await colecciones(req, res, email);
                }
        }
        else{
            const data = renewTokens(RT, res);
            if(Object.keys(data).length != 0){
                const email = Object(data).email; 
                if(req.body.nombre){
                    return await crearColeccion(req, res, email);
                }
                else{
                    return await colecciones(req, res, email);
                }
            }
            else{
                return res.status(403).end();
            }
        }
    }
    else{
        return res.status(405).end();
    }
}

async function colecciones(req: NextApiRequest, res: NextApiResponse, email: string) {
    const body = req.body;

    //chequeos de informacion
    if(isNullorUndefined(email)){
        return res.status(400).json({message: "El usuario es undefined o null"});
    }
    if(isEmpty(email)){
        return res.status(400).json({message: "El usuario enviado estaba vacio"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
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
        if(Object.keys(data).length == 0){
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

async function crearColeccion(req: NextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;

    if(isNullorUndefined(body.nombre || isNullorUndefined(email) || isNullorUndefined(body.favorito))){
        return res.status(400).json({message: "Algun parametro enviado es undefined o null"});
    }
    if(isEmpty(email) || isEmpty(body.nombre)){
        return res.status(400).json({message: "O el usuario o el nombre de la coleccion estan vacios"});
    }
    if(!isBoolean(body.favorito)){
        return res.status(400).json({message: "El parametro de favorito no fue recibido como bool, tiene que serlo"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
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