import { Stan } from "node-nats-streaming";
import { Subjects } from "../subjects/subjects";

export interface EventData {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends EventData> {
  abstract subject: T["subject"];
  constructor(protected stan: Stan) {}

  publish(eventData: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stan.publish(this.subject, JSON.stringify(eventData), (err) => {
        if (err) return reject(err);

        console.log(`Event published- subject:${this.subject}`);
        resolve();
      });
    });
  }
}
