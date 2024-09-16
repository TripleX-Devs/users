import Joi from "joi";
import { Gender, Category } from "@prisma/client";

export const signUpSchemaValidation = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required(),
    profilePicUrl: Joi.string().uri().required(),
    dateOfBirth: Joi.date().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    category: Joi.string()
        .valid(...Object.values(Category))
        .required(),
    password: Joi.string().required().min(4),
    permanentAddress: Joi.string().required(),
    currentAddress: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    country: Joi.string().required(),
    universityEmail: Joi.string().email().required(),
    universityEmailPassword: Joi.string().required().min(4),
});

export const signInSchemaValidation = Joi.object({
    universityEmail: Joi.string().email().required(),
    universityEmailPassword: Joi.string().required().min(4),
});
