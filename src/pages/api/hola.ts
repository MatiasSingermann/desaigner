import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const email = "uwu@gmail.com"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const colecciones = await prisma.coleccion.findMany({
        where:{
            duenio_id: email
        }
    })
    console.log(colecciones);
    return res.status(200).json(colecciones);
}