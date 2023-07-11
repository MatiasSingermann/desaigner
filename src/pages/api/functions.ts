import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import Email from "next-auth/providers/email";

const prisma = new PrismaClient();

function checkEmail(email: string): boolean{
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegEx.test(email);
}

function isEmpty(variable: string): boolean{
    return variable.length <= 0;
}

async function disenioFromUserExists(nombre: string, duenio: string): Promise<boolean>{
    try{
        const existe = await prisma.disenio.findFirst({
            where: {
                nombre: nombre,
                duenio_id: duenio 
            }
        })
        if(existe){
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

function isArrayEmpty(variable: Array<string>): boolean{
    if(variable.length > 0){
        for(let i = 0; i < variable.length; i++){
            if(variable[i]!.length == 0){
                return true;
            }
        }
    }
    return variable.length <= 0;
}

function checkContrasenia(contrasenia: string): boolean{
    const contraseniaRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#_@$!%*?&])[A-Za-z\d#_@$!%*?&]{8,}$/g;
    return contraseniaRegEx.test(contrasenia);
}

async function userExists(usuario: string): Promise<boolean>{
    try{
        const existe = await prisma.usuario.findFirst({
            where: {
                email: usuario,
            }
        })
        if (existe){
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

async function coleccionExists(nombre: string, duenio: string): Promise<boolean>{
    try{
        const existe = await prisma.coleccion.findFirst({
            where: {
                nombre: nombre,
                duenio_id: duenio
            }
        })
        if(existe){
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

async function coleccionIsFromUser(email: string, coleccion: number): Promise<boolean>{
    try{
        const pertenece = await prisma.coleccion.findFirst({
            where: {
                id: coleccion,
                duenio_id: email
            }
        })
        if(pertenece){
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

function isbase64(variable: string): boolean{
    const base64RegEx = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/g;
    const [metadata, base64] = variable.split(",");
    if(base64){
        return base64RegEx.test(base64) && "data:image/jpeg;base64" === metadata;
    }
    return false;
}

async function disenioExists(id: number): Promise<boolean>{
    try{
        const existe = await prisma.disenio.findFirst({
            where: {
                id: id
            }
        })
        if(existe){
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

export { checkEmail, isEmpty, checkContrasenia, userExists, coleccionExists, coleccionIsFromUser,
isbase64, disenioExists,isArrayEmpty, disenioFromUserExists };

