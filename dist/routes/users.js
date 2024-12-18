"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const userSchema_1 = require("../schemas/userSchema");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error retrieving users" });
    }
});
router.post("/users", async (req, res) => {
    const { name, username, role, categoryId } = req.body;
    try {
        userSchema_1.userSchema.parse({ name, username, role, categoryId });
        const user = await prisma.user.create({
            data: {
                name,
                username,
                role: role,
                categoryId,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: "Error creating user" });
    }
});
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: req.body,
    });
    res.json(updatedUser);
});
router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });
    res.json(user);
});
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: { id: Number(id) },
    });
    res.json(user);
});
exports.default = router;
