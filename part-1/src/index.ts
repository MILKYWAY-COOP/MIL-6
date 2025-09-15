import express from "express";
import morgan from "morgan";
import { prisma } from "./db";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ message: "API is running!", dbTime: (result as any)[0].now });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err });
  }
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
