import express from "express";
import connectDB from "./config/database.js";
const app = express();
import "dotenv/config";
import router from "./routes/index.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { verifyEmailConnection } from "./utils/email.service.js";

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

connectDB()
  .then(async () => {
    console.log("DB connection established");

    await verifyEmailConnection();

    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("DB cannot be Connected" + err);
  });
