import {
  Publisher,
  Subjects,
  SuccessfulOrderEmailEvent,
} from "@marius98/messagequeue";

export class SuccessfulOrderEmailPublisher extends Publisher<SuccessfulOrderEmailEvent> {
  subject: SuccessfulOrderEmailEvent["subject"] =
    Subjects.SuccessfulOrderEmailEvent;
}
