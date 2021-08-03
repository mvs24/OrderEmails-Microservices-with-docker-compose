import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
  userEmail: string;
  address: string;
  products: string[];
}

interface OrderDocument extends mongoose.Document {
  userId: string;
  userEmail: string;
  address: string;
  products: string[];
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build(attrs: OrderAttrs): OrderDocument;
}

const orderSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  address: String,
  products: [String],
});

orderSchema.statics.build = function (attrs: OrderAttrs) {
  return new Order(attrs);
};

// @ts-ignore
const Order = mongoose.model<OrderDocument, OrderModel>("Order", orderSchema);

export default Order;
