import { Subjects } from "../../subjects/subjects";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreatedEvent;
  data: {
    orderId: string;
  };
}
