import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { disenioFromUserExists, isArrayEmpty, disenioExists, isbase64, userExists, checkEmail, coleccionExists, coleccionIsFromUser, objectHasData } from "../functions";
import { v2 } from "cloudinary";

const prisma = new PrismaClient();
const cloudinary = v2;

interface ExtendedNextApiRequestDisenios extends NextApiRequest{
    body: {
        coleccion: string
    }
}

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
        presupuesto: number,
        estilo: string,
        colecciones: string[],
    }
}

interface ExtendedNextApiRequestRemoverDisenio extends NextApiRequest{
    body: {
        coleccion: string
    }
}

interface ExtendedNextApiRequestPermitirUsuario extends NextApiRequest{
    body: {
        
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const session = await getSession({req});
    // if(req.method === "POST"){
    //     if(session){
    //             const email = session?.user.email as string;
    //             if(req.body.coleccion){
    //                 return await diseños(req, res, email);
    //             }
    //             else{
    //                 return await crearDisenio(req, res, email);
    //             }
    //     }
    //     else{
    //         return res.status(403).end();
    //     }
    // }
    // else if(req.method === "GET"){
    //     const id = parseInt(req.query.id as string);
    //     if(!id){
    //         return res.status(400).json({message: "Ningun id de disenio fue recibido"});
    //     }
    //     if(session){
    //         const email = session?.user.email as string;
    //         return await viewDisenio(res, email, id);
    //     }
    //     else{
    //         return res.status(403).end();
    //     }
    // }
    // else if(req.method === "DELETE"){
    //     const id = req.body.id;
    //     if(!id){
    //         return res.status(400).json({message: "No se recibio el id de ningun disenio"});
    //     }
    //     if(session){
    //         const email = session?.user.email as string;
    //         return await deleteDisenio(req, res, email, id);
    //     }
    // }
    // else if(req.method === "PATCH"){
    //     const id = req.body.id;
    //     if(!id){
    //         return res.status(400).json({message: "No se recibio el id de ningun disenio"});
    //     }
    //     if(session){
    //         const email = session?.user.email as string;
    //         if(req.body.usuarios){
    //             return await permitirUsuario(req, res, email, id);
    //         }
    //         else{
    //             return await removerDisenio(req, res, email, id);
    //         }
    //     }
    // }
    // else{
    //     return res.status(405).end();
    // }

    const id = req.body.id;
    const email = "wilson@gmail.com";
    return removerDisenio(req, res, email, id);
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
                disenios: {
                    include: {
                        disenio: {
                            include:{
                                muebles: true
                            }
                        }
                    }
                }
            }
        })
        if(Object.keys(data).length === 0){
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
    if(!Array.isArray(body.colecciones) || body.colecciones.every(str => str.length > 0) || body.colecciones.length === 0){
        return res.status(400).json({message: "No hay colecciones"});
    }
    for(let i = 0; i < body.colecciones.length; i++){
        const coleccionExistente: boolean = await coleccionExists(body.colecciones[i]!.toString(), email); //Revisar
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
            await prisma.mueble.create({
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
            
        }
        if(newDisenio){ //Revisable
            return res.status(200).json({message: "Nuevo disenio creado con exito"});
        }
    } catch(error) {
        console.log(error);
        return res.status(500).end();
    }
}

async function viewDisenio(res: NextApiResponse, email: string, id: number){
    if(!email || id <= 0){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quiz //as escribiste algun parametro mal"});
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

async function deleteDisenio(req: NextApiRequest, res: NextApiResponse, email: string, id: number){
    if(!email || id <= 0){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const disenioExistente: boolean = await disenioExists(id); // tizi was here 🐔🐨
    if(!disenioExistente){
        return res.status(404).json({message: "El disenio que se quiere visualizar no existe"});
    }

    const duenio = !!await prisma.disenio.findFirst({
        where: {
            id: id,
            duenio_id: email 
        }
    })
    if(!duenio){
        return res.status(400).json({message: "No te pertenece este disenio"});
    }

    try{
        const success = await prisma.disenio.delete({
            where: {
                id: id
            }
        })
        if(success){
            return res.status(200).json({message: "Disenio borrado con exito"});
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).end();
    }
}

async function removerDisenio(req: ExtendedNextApiRequestRemoverDisenio, res: NextApiResponse, email: string, id: number){
    const body = req.body;
    
    if(!body.coleccion){
        return res.status(400).json({message: "No se recibio el nombre de ninguna coleccion"});
    }
    if(!email || id <= 0){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente"});
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
    if(!coleccionExists(body.coleccion, email)){
        return res.status(400).json({message: "La coleccion enviada no existe"});
    }

    const duenio = !!await prisma.disenio.findFirst({
        where: {
            id: id,
            duenio_id: email 
        }
    })
    if(!duenio){
        return res.status(400).json({message: "No te pertenece este disenio"});
    }

    try{
        const coleccion = await prisma.coleccion.findFirst({
            where:{
                duenio_id: email,
                nombre: body.coleccion
            }
        })
        if(coleccion){
            const relacion= await prisma.disenioYcoleccion.findFirst({
                where:{
                    disenio_id: id, 
                    coleccion_id: coleccion.id
                }
            })
            if(relacion){
                const succes = await prisma.disenioYcoleccion.delete({
                    where:{
                        id: relacion.id
                    }
                })
            }
        return res.status(200).json({message: "Disenio removido con exito"});            
        }
    } catch{
        return res.status(500).end();
    }
}

async function permitirUsuario(req: NextApiRequest, res: NextApiResponse, email: string, id: number){
    const body = req.body;
    
    if(!email || id <= 0 || !body.usuario){
        return res.status(400).json({message: "El email de la sesion esta vacio o el id del disenio es inexistente, tambien es posible que el usuario a autorizar no haya sido enviado"});
    }
    if(!checkEmail(email)){
        return res.status(400).json({message: "El usuario no es valido"});
    }
    const usuarioExistente: boolean = await userExists(email);
    if(!usuarioExistente){
        return res.status(400).json({message: "El usuario enviado no existe, quizas escribiste algun parametro mal"});
    }
    const usuarioAutorizadoExiste: boolean = await userExists(body.usuario);
    if(!usuarioAutorizadoExiste){
        return res.status(400).json({message: "El usuario que se quiere autorizar no existe"});
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
    if(!duenio){
        return res.status(400).json({message: "No te pertenece este disenio"});
    }

    try{
        const usersAutorizados = await prisma.autorizados.findMany({
            where: {
                disenio_id: id
            }
        })
        
    } catch{
        return res.status(500).end();
    }
}