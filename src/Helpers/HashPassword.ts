import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashedPasswordFunction = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (password === "") {
            reject("Password cannot be empty");
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject("Error");
            } else {
                resolve(hash);
            }
        });
    });
};

export const comparePasswordFunction = (
    password: string,
    hash: string,
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject(new Error("Error comparing passwords"));
            } else {
                if (result) {
                    resolve(true);
                } else {
                    reject(new Error("Password does not match"));
                }
            }
        });
        // if(password === hash){
        //     resolve(true);
        // }else{
        //     reject(new Error("Password does not match"));
        // }
    });
};
