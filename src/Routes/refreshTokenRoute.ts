import express from "express";
import type { Request , Response } from "express";
import ResponsePayload from '@/utils/resGenerator';
import jwt from "jsonwebtoken";
import { createRefreshToken, createToken, JWT } from "@/Helpers/createTokens";
const router = express.Router();


router.post('/', (req : Request , res : Response) => {
    const funcName = "refreshTokenRoute";
    const resPayload = new ResponsePayload();
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        resPayload.setConflict("Refresh token required");
        console.log(resPayload, `-> response for ${funcName}`);
        return res.status(404).json(resPayload);
    }

    const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN as string) as { sub: string; rollType: string; userData: { name: string; universityEmail: string } };

     const newAccessToken = createToken(decodedToken);
     const newRefreshToken = createRefreshToken(decodedToken);

     res.cookie('refreshToken', newRefreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
     })

     resPayload.setSuccess(newAccessToken);
     return res.json(resPayload);
})

export default router;