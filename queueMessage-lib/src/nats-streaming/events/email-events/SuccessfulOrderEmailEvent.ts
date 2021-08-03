import { Subjects } from "../../subjects/subjects";

export interface SuccessfulOrderEmailEvent {
  subject: Subjects.SuccessfulOrderEmailEvent;
  data: {
    orderId: string;
  };
}
