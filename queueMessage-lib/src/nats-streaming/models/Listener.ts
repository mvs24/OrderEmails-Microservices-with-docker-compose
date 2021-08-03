import { Message, Stan } from "node-nats-streaming";
import { EventData } from "./Publisher";

export abstract class Listener<T extends EventData> {
  abstract subject: T["subject"];
  abstract queueGroup: string;
  abstract eventHandler(data: T["data"], msg: Message): void;
  ackWait: number;

  constructor(protected stan: Stan, ackWait: number = 1500) {
    this.ackWait = ackWait;
  }

  private subscriptionOptions() {
    return this.stan
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroup)
      .setManualAckMode(true);
  }

  public listen() {
    const subscription = this.stan.subscribe(
      this.subject,
      this.queueGroup,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      const data = this.parseMessage(msg);

      console.log(
        `Event received- subject:${this.subject}, queueGroup:${this.queueGroup}`
      );
      this.eventHandler(data, msg);
    });
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
