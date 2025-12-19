import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDb } from "./config/database";

const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
