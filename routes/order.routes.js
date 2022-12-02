import express from "express";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";

const orderRoute = express.Router();

orderRoute.post("/create-order", async (req, res) => {
  try {
    const newOrder = await OrderModel.create(req.body);

    //console.log(newOrder);

    //newOrder.products => [com todos os produtos] => [{productID: "", quantity: ""}]
    newOrder.products.forEach(async (element) => {
      await ProductModel.findByIdAndUpdate(
        element.productID,
        {
          $push: {
            orders: newOrder._id,
          },
        },
        { runValidators: true }
      );
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
});

orderRoute.get("/order/:idOrder", async (req, res) => {
  try {
    const { idOrder } = req.params;
    const order = await OrderModel.findById(idOrder).populate({
      path: "products",
      populate: {
        path: "productID",
        model: "Product",
        select: "name price -_id",
      },
    });

    //total da order
    let total = 0;
    order.products.forEach((element) => {
      total += element.productID.price * element.quantity;
    });

    return res.status(200).json({ order, total });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
});

export default orderRoute;
