import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { disenioExists, isbase64, userExists, isEmpty, isNullorUndefined, checkEmail, coleccionExists, coleccionIsFromUser, isInt, hasAccesToken, renewTokens } from "../functions";
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
                return res.status(403).end();
            }
        }
    }
    else if(req.method === "GET"){
        const router = useRouter();
        const id = parseInt(router.query.id as string);
        if(isNaN(id)){
            return res.status(400).json({message: "Ningun id de disenio fue recibido"});
        }
        if(Object.keys(data).length != 0){
            const email = Object(data).email;
            return await viewDisenio(req, res, email, id);
        }
        else{
            const data = renewTokens(RT, res);
            if(Object.keys(data).length != 0){
                const email = Object(data).email;
                return await viewDisenio(req, res, email, id);
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

async function diseños(req: NextApiRequest, res: NextApiResponse, email: string){
    const body = req.body;

    if(isNullorUndefined(body.coleccion) || isNullorUndefined(email)){
        return res.status(400).json({message: "Algun parametro enviado es undefined o null"});
    }
    if(isEmpty(body.coleccion) || isEmpty(email)){
        return res.status(400).json({message: "El email o el nombre de la coleccion enviado esta vacio"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    if(!isInt(body.coleccion)){
        return res.status(400).json({message: "La coleccion enviada no es un INT, debe ser un INT"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    if(!coleccionExists(body.coleccion, email)){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }
    if(!coleccionIsFromUser(email, body.coleccion)){
        return res.status(403).json({message: "No tienes acceso a esta coleccion"});
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

    if(isNullorUndefined(body.nombre) || isNullorUndefined(email) || isNullorUndefined(body.ambiente) || isNullorUndefined(body.disenioIMG) || isNullorUndefined(body.mascaraIMG) || isNullorUndefined(body.presupuesto || isNullorUndefined(body.estilo) || isNullorUndefined(body.links))){
        return res.status(400).json({message: "Algun parametro enviado es undefined o null"});
    }
    if(isEmpty(email) || isEmpty(body.nombre) || isEmpty(body.ambiente) || isEmpty(body.disenioIMG) || isEmpty(body.mascaraIMG) || isEmpty(body.presupuesto) || isEmpty(body.estilo) || isEmpty(body.links)){
        return res.status(400).json({message: "alguno de los parametros estan vacios"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    if(!isbase64(body.disenioIMG) || !isbase64(body.mascaraIMG)){
        return res.status(400).json({message: "Las imagenes enviadas no estan en base 64"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const coleccionExistente: boolean = await coleccionExists(body.nombre, email);
    if(!coleccionExistente){
        return res.status(400).json({message: "La coleccion ingresada no existe"});
    }

    const disenioURL = await cloudinary.uploader.upload(body.disenioIMG, {
        resource_type: "image"
    })
    const mascaraURL = await cloudinary.uploader.upload(body.mascaraIMG, {
        resource_type: "image"
    })
    
    if(disenioURL.error || mascaraURL.error){
        return res.status(500);
    }
    else if(disenioURL.status == 200){
        try{
            const newDisenio = await prisma.disenio.create({
                data: {
                    duenio_id: email,
                    colecciones: body.nombre,
                    imagen: disenioURL.url,
                    mascara: mascaraURL.url,
                    ambiente: body.ambiente,
                    presupuesto: body.presupuesto,
                    estilo: body.estilo,
                    link: body.links
                }
            })
            if(newDisenio){
                return res.status(200).json({message: "Nuevo disenio creado con exito"});
            }
        } catch {
            return res.status(500).end();
        }
    }
}

async function viewDisenio(req: NextApiRequest, res: NextApiResponse, email: string, id: number){
    const body = req.body;

    if(isEmpty(email) || id <= 0){
        return res.status(400).json({message: "El email de la token esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email, body.contrasenia);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const disenioExistente: boolean = await disenioExists(id);
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere visualizar no existe"});
    } 

    const duenio = !!await prisma.disenio.findFirst({
        where: {
            id: id,
            duenio_id: email 
        }
    })
    const permiso = !!await prisma.autorizados.findFirst({
        where: {
            disenio_id: id,
            usuario_email: email
        }
    })

    if(!duenio || !permiso){
        return res.status(400).json({message: "No tienes acceso a este disenio"});
    }
    try{
        const data = await prisma.disenio.findFirst({
            where: {
                id: id
            }
        })
        if(data){
            return res.status(200).json(data);
        }
    } catch{
        return res.status(500).end();
    }
}