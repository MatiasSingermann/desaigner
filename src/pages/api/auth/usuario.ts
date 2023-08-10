// import { PrismaClient } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { checkContrasenia, checkEmail } from "../functions";

// const prisma = new PrismaClient();

// interface ExtendedNextApiRequest extends NextApiRequest{
//     body: {
//         readonly contrasenia: string
//     }
// }

// export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
//     const session = await getSession({req});
//     if(req.method === "DELETE"){
//         if(session){
//             const email = session?.user.email as string;
//             return await deleteUsuario(req, res, email);
//         }
//     }
//     else{
//         return res.status(405).end();
//     }
// }

// async function deleteUsuario(req: ExtendedNextApiRequest, res: NextApiResponse, email: string){
//     const body = req.body;
//     if (!('contrasenia' in body)) {
//         return res.status(400).json({message: "La contraseña"});
//     }
//     if(!body.contrasenia || !email){
//         return res.status(400).json({message: "Algun parametro no cumple con los requisitos"});
//     }
//     if(!checkContrasenia(body.contrasenia)){
//         return res.status(400).json({message: "La contrasenia no es valida"});
//     }
//     if(!checkEmail(email)){
//         return res.status(400).json({message: "El email no es valido"});
//     }

//     try{
//         const user = await prisma.usuario.findFirst({
//             where: {
//                 email: email.toLowerCase(),
//                 contrasenia: body.contrasenia
//             }
//         })
//         if(user){
//             await prisma.autorizados.deleteMany({
//                 where:{
//                     usuario_email: email
//                 }
//             })
//             const colecciones = await prisma.coleccion.findMany({
//                 where:{
//                     duenio_id: email
//                 }
//             })
//             if(colecciones){

//             }
//         }
//         else{
//             return res.status(401).json({message: "El usuario no pudo ser encontrado"});
//         }  
//     }
// }