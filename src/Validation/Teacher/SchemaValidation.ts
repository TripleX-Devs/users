import Joi from "joi";
import { Gender, Category } from "@prisma/client";

// Define the Joi schema for the Teacher model
export const teacherSchema = Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().required(),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required(),
    profilePicUrl: Joi.string().uri().required(),
    dateOfBirth: Joi.date().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email().required(),
    category: Joi.string()
        .valid(...Object.values(Category))
        .required(), // Replace with actual categories
    password: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    currentAddress: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
    country: Joi.string().required(),
    universityEmail: Joi.string().email().required(),
    universityEmailPassword: Joi.string().required(),
    department: Joi.string().required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
});

export const teacherUpdateSchema = Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().optional(),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .optional(),
    profilePicUrl: Joi.string().uri().optional(),
    dateOfBirth: Joi.date().optional(),
    phoneNumber: Joi.number().optional(),
    email: Joi.string().email().optional(),
    category: Joi.string()
        .valid(...Object.values(Category))
        .optional(), // Replace with actual categories
    password: Joi.string().optional(),
    permanentAddress: Joi.string().optional(),
    currentAddress: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    pincode: Joi.number().optional(),
    country: Joi.string().optional(),
    universityEmail: Joi.string().email().optional(),
    universityEmailPassword: Joi.string().optional(),
    department: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
});


export const signInSchemaValidation = Joi.object({
    universityEmail: Joi.string().email().required(),
    universityEmailPassword: Joi.string().required().min(4),
});