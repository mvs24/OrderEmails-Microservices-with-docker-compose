import { Listener, Subjects, OrderCreatedEvent } from "@marius98/messagequeue";
import { Message } from "node-nats-streaming";
import { Email } from "../../Email";
import Order from "../../models/orderModel";
import { SuccessfulOrderEmailPublisher } from "../publishers/SuccessfulOrderEmailPublisher";
import { queueGroup } from "./queueGroup";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreatedEvent;
  queueGroup = queueGroup;

  async eventHandler(data: OrderCreatedEvent["data"], msg: Message) {
    try {
      const order = await Order.findById(data.orderId);

      if (!order) return;

      const { userEmail } = order;

      await new Email({
        to: userEmail,
        text: "Your order was successful!",
        subject: "Successful order",
      }).sendEmail();

      console.log(`Email sent to ${userEmail}`);

      new SuccessfulOrderEmailPublisher(this.stan).publish({
        orderId: data.orderId,
      });

      msg.ack();
    } catch (err) {
      console.log(err);
    }
  }
}
