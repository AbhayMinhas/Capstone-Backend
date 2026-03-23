import express from "express";
import  connectDB  from "./config/database.js"
const app = express();
import 'dotenv/config'; 
import router from "./routes/index.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

app.use(express.json());

app.use("/api",router);

app.use(errorHandler);








connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("DB cannot be Connected" + err);
  });
