import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "El nombre es obligatorio"),
  username: z
    .string()
    .min(5, "El nombre de usuario es obligatorio")
    .max(255, "El nombre de usuario es demasiado largo")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    ),
  role: z.string().min(4, "role must be assigned"),
  categoryId: z
    .number()
    .int()
    .positive("El ID de categoría debe ser un número entero positivo")
    .min(1, "El ID de categoría no puede ser menor que 1"),
});
