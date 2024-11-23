
import jwt from "jsonwebtoken";

export const validateToken = (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                reject("Invalid token");
            } else {
                resolve(true);
            }
        });
    });
};
