import {
  Listener,
  Subjects,
  SuccessfulOrderEmailEvent,
} from "@marius98/messagequeue";
import { Message } from "node-nats-streaming";
import OrderEmail from "../../models/orderEmailModel";
import { queueGroup } from "./queueGroup";

export class SuccessfulOrderEmailListener extends Listener<SuccessfulOrderEmailEvent> {
  subject: SuccessfulOrderEmailEvent["subject"] =
    Subjects.SuccessfulOrderEmailEvent;
  queueGroup = queueGroup;

  async eventHandler(data: SuccessfulOrderEmailEvent["data"], msg: Message) {
    try {
      await OrderEmail.findOneAndUpdate(
        { orderId: data.orderId },
        {
          sent: true,
        }
      );

      msg.ack();
    } catch (err) {
      console.log(err);
    }
  }
}
