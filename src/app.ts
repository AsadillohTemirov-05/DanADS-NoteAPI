import express from "express";
import noteRoutes from "./routes/note.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api/notes", noteRoutes);

setupSwagger(app);

app.use(errorHandler);

export default app;
