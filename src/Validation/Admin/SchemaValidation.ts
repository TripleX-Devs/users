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

export const updateAdminSchemaValidation = Joi.object({
    id: Joi.forbidden(), // ID should not be updated
    name: Joi.string().optional(),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .optional(),
    profilePicUrl: Joi.string().uri().optional(),
    dateOfBirth: Joi.date().optional(),
    phoneNumber: Joi.string().optional(),
    email: Joi.string().email().optional(),
    category: Joi.string()
        .valid(...Object.values(Category))
        .optional(),
    password: Joi.string().optional().min(4),
    permanentAddress: Joi.string().optional(),
    currentAddress: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    pincode: Joi.string().optional(),
    country: Joi.string().optional(),
    universityEmail: Joi.string().email().optional(),
    universityEmailPassword: Joi.string().optional().min(4),
    department: Joi.string().optional(),
});
