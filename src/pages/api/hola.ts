import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    const email = session?.user.email;
    console.log(email);
    return res.status(200).send(req.body);
}