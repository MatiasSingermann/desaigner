import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 } from "cloudinary";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { checkEmail, coleccionExists, disenioFromUserExists, isbase64, objectHasData, userExists } from "../functions";

const prisma = new PrismaClient();
const cloudinary = v2;

interface ExtendedNextApiRequestCreateDisenios extends NextApiRequest{
    body: {
        nombre: string,
        ambiente: string,
        disenioIMG: string,
        muebles: Array<{
            box: Array<number>,
            prompt: string,
            links: Array<string>
        }>,
        presupuesto: string,
        estilo: string,
        colecciones: string[]
    }
}

export default async function handler(req: ExtendedNextApiRequestCreateDisenios, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(req.method === "POST"){
        if(session){
            const email = session?.user.email;
            return await crearDisenio(req, res, email);
        }
        else{
            return res.status(403).end();
        }
    }
    else{
        return res.status(405).end();
    }
}

async function crearDisenio(req: ExtendedNextApiRequestCreateDisenios, res: NextApiResponse, email: string){
    const body = req.body;

    if(
        !body.nombre || !email || !body.ambiente || !body.disenioIMG || !body.muebles || !body.presupuesto || !body.estilo
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
    if(!Array.isArray(body.colecciones) || !body.colecciones.every(str => str.length > 0) || body.colecciones.length === 0){
        return res.status(400).json({message: "No hay colecciones"});
    }
    for(let i = 0; i < body.colecciones.length; i++){
        const coleccionExistente: boolean = await coleccionExists(body.colecciones[i]!.toString(), email);
        if(!coleccionExistente){
            return res.status(400).json({message: "La coleccion ingresada no existe"});
        }
    }
    if(!Array.isArray(body.muebles) || !body.muebles.every(objectHasData) || body.muebles.length === 0){
        return res.status(400).json({message: "No hay muebles o algun dato esta mal"});
    }
    const disenioFromUserExistente: boolean = await disenioFromUserExists(body.nombre, email);
    if(disenioFromUserExistente){
        return res.status(400).json({message: "Ya existe un disenio con este nombre"});
    }
    

    const disenioURL = await cloudinary.uploader.upload(body.disenioIMG, {
        resource_type: "image"
    })
    
    if(disenioURL.error){
        return res.status(500);
    }
    try{
        const newDisenio = await prisma.disenio.create({
            data: {
                nombre: body.nombre,
                duenio_id: email,
                imagen: disenioURL.secure_url,
                ambiente: body.ambiente,
                presupuesto: body.presupuesto,
                estilo: body.estilo,
            }
        })
        for(let i = 0; i < body.muebles.length; i++){
            const muebleCreate = await prisma.mueble.create({
                data: {
                    url1: body.muebles[i]!.links[0]!,
                    url2: body.muebles[i]!.links[1]!,
                    url3: body.muebles[i]!.links[2]!,
                    descripcion: body.muebles[i]!.prompt,
                    x: body.muebles[i]!.box[0]!,
                    y: body.muebles[i]!.box[1]!,
                    width: body.muebles[i]!.box[2]!,
                    height: body.muebles[i]!.box[3]!,
                    disenio: {
                        connect: {
                            id: newDisenio.id
                        }
                    }
                }
            })
            if(!muebleCreate){
                return res.status(400).json({message: "Los muebles no pudieron ser creados"});
            }
        }
        for(let i = 0; i < body.colecciones.length; i++){
            const coleccionConnect = await prisma.coleccion.findFirst({
                where: {
                    duenio_id: email,
                    nombre: body.colecciones[i]?.toString()
                }
            })
            if(coleccionConnect){
                await prisma.disenioYcoleccion.create({
                    data: {
                        disenio_id: newDisenio.id,
                        coleccion_id: coleccionConnect.id
                    }
                })
            }
            else{
                const newColeccion = await prisma.coleccion.create({
                    data: {
                        nombre: body.nombre,
                        favorito: false,
                        duenio_id: email
                    }
                })
                if(!newColeccion){
                    return res.status(404).json({message: "No se pudo crear la coleccion"});
                }
                else if(newColeccion){
                    const coleccionConnect1 = await prisma.coleccion.findFirst({
                        where: {
                            duenio_id: email,
                            nombre: body.colecciones[i]?.toString()
                        }
                    })
                    if(coleccionConnect1){
                        await prisma.disenioYcoleccion.create({
                            data: {
                                disenio_id: newDisenio.id,
                                coleccion_id: coleccionConnect1.id
                            }
                        })
                    }
                    else{
                        return res.status(404).json({message: "Algo salio mal"});
                    }
                }
            }
        }
        if(newDisenio){ //Revisable
            return res.status(201).json({message: "Nuevo disenio creado con exito"});
        }
    } catch(error) {
        console.log(error);
        return res.status(500).end();
    }
}