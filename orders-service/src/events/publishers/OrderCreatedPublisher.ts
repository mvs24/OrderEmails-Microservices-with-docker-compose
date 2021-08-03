import { OrderCreatedEvent, Publisher, Subjects } from "@marius98/messagequeue";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreatedEvent;
}
