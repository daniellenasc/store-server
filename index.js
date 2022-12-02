import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import productRoute from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";

dotenv.config();

connect();

const app = express();
app.use(express.json());

app.use("/products", productRoute);
app.use("/orders", orderRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
