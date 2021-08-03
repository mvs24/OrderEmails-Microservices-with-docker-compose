import mongoose from "mongoose";

interface OrderEmailAttrs {
  orderId: string;
}

interface OrderEmailDocument extends mongoose.Document {
  orderId: string;
  sent: boolean;
}

interface OrderEmailModel extends mongoose.Model<OrderEmailDocument> {
  build(attrs: OrderEmailAttrs): OrderEmailDocument;
}

const orderEmailSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  sent: {
    type: Boolean,
    default: false,
  },
});

orderEmailSchema.statics.build = function (attrs: OrderEmailAttrs) {
  return new OrderEmail(attrs);
};

const OrderEmail = mongoose.model<OrderEmailDocument, OrderEmailModel>(
  "OrderEmail",
  orderEmailSchema
);

export default OrderEmail;
