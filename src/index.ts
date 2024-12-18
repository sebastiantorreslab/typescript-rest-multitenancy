import express from "express";
import userRouter from "./routes/usersRoutes";
import categoryRouter from "./routes/categoriesRoutes";
import tenantRoutes from "./routes/tenantRoutes";

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", tenantRoutes);

app.get("/", (req, res) => {
  res.send("¡Typescript api rest!");
});

app.use(express.json());
