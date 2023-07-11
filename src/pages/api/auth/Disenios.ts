import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { disenioFromUserExists, isArrayEmpty, disenioExists, isbase64, userExists, checkEmail, coleccionExists, coleccionIsFromUser } from "../functions";
import { v2 } from "cloudinary";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
const cloudinary = v2;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(req.method === "POST"){
        if(session){
                const email = session?.user.email as string;
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
    else if(req.method === "GET"){
        const id = parseInt(req.query.id as string);
        if(!id){
            return res.status(400).json({message: "Ningun id de disenio fue recibido"});
        }
        if(session){
            const email = session?.user.email as string;
            return await viewDisenio(req, res, email, id);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function diseños(req: NextApiRequest, res: NextApiResponse, email: string){
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
    if(!coleccionExists(body.coleccion, email)){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }

    try{
        const data = await prisma.coleccion.findMany({
            where: {
                duenio_id: email,
                nombre: body.coleccion
            },
            include: {
                disenios: true
            }
        })
        if(Object.keys(data).length == 0){
            return res.status(204).json({message: "La coleccion no tiene disenios"});
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

    if(
        !body.nombre || !email || !body.ambiente || !body.disenioIMG || !body.mascara || !body.presupuesto || !body.estilo || !body.links
    ){
        return res.status(400).json({message: "Algun parametro enviado no cumple los requisitos"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    if(!isbase64(body.disenioIMG)){
        return res.status(400).json({message: "La imagen enviada no esta en base 64"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    if(!Array.isArray(body.colecciones) || isArrayEmpty(body.colecciones) || body.colecciones.length == 0){
        return res.status(400).json({message: "No hay colecciones"});
    }
    for(let i = 0; i < body.colecciones.length; i++){
        const coleccionExistente: boolean = await coleccionExists(body.colecciones[i], email);
        if(!coleccionExistente){
            return res.status(400).json({message: "La coleccion ingresada no existe"});
        }
    }
    if(!Array.isArray(body.link) || isArrayEmpty(body.link) || body.link.length == 0){
        return res.status(400).json({message: "No hay links"});
    }
    const disenioFromUserExistente: boolean = await disenioFromUserExists(body.nombre, email);
    if(disenioFromUserExistente){
        return res.status(400).json({message: "Ya existe un disenio con este nombre"});
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
    else {
        try{
            const newDisenio = await prisma.disenio.create({
                data: {
                    nombre: body.nombre,
                    duenio_id: email,
                    imagen: disenioURL.secure_url,
                    mascara: mascaraURL.secure_url,
                    ambiente: body.ambiente,
                    presupuesto: body.presupuesto,
                    estilo: body.estilo,
                }
            })
            for(let i = 0; i < body.link.length; i++){
                await prisma.link.create({
                    data: {
                        url: body.link[i][0],
                        mueble: body.link[i][1],
                        disenio: {
                            connect: {
                                id: newDisenio.id
                            }
                        }
                    }
                }) 
            }
            for(let i = 0; i < body.colecciones.length; i++){
                const coleccionConnect = await prisma.coleccion.findFirst({
                    where: {
                        duenio_id: email,
                        nombre: body.colecciones[i]
                    }
                })
                if(coleccionConnect){
                    await prisma.disenio.update({
                        where: {
                            id: newDisenio.id,
                        },
                        data: {
                            colecciones: {
                                connect: {
                                    id: coleccionConnect.id
                                }
                            }
                        }
                    })
                }
                
            }
            if(newDisenio){
                return res.status(200).json({message: "Nuevo disenio creado con exito"});
            }
        } catch(error) {
            console.log(error);
            return res.status(500).end();
        }
    }
}

async function viewDisenio(req: NextApiRequest, res: NextApiResponse, email: string, id: number){

    if(!email || id <= 0){
        return res.status(400).json({message: "El email de la token esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
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