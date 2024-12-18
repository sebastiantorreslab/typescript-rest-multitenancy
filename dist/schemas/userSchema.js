"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "El nombre es obligatorio"),
    username: zod_1.z
        .string()
        .min(1, "El nombre de usuario es obligatorio")
        .max(255, "El nombre de usuario es demasiado largo")
        .regex(/^[a-zA-Z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos"),
    role: zod_1.z.string().min(4, "role must be assigned"),
    categoryId: zod_1.z
        .number()
        .int()
        .positive("El ID de categoría debe ser un número entero positivo")
        .min(1, "El ID de categoría no puede ser menor que 1"),
});
