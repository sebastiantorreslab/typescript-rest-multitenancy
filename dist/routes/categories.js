"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/categories", async (req, res) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});
router.post("/categories", async (req, res) => {
    const category = await prisma.category.create({
        data: req.body,
    });
    res.json(category);
});
router.delete("/categories/:id", (req, res) => {
    const { id } = req.params;
    const category = prisma.category.delete({
        where: { id: Number(id) },
    });
    res.json(category);
});
exports.default = router;
