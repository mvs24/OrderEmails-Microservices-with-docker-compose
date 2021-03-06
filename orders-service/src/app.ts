import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import orderRouter from "./routes/orderRoutes";
import { natsWrapper } from "./natsWrapper";
import { globalErrorHandler } from "./controllers/errorController";
import { AppError } from "../utils/AppError";
import { SuccessfulOrderEmailListener } from "./events/listeners/SuccessfulOrderEmailListener";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use("/api/orders", orderRouter);

app.all("*", (_req: Request, _res: Response, next: NextFunction) => {
  return next(new AppError("This route is not yet defined", 400));
});

app.use(globalErrorHandler);

(async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID is not defined!");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID is not defined!");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL is not defined!");
  }

  try {
    let uriConnection: string =
      "mongodb://host.docker.internal:27017/order-service";

    await mongoose.connect(uriConnection, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Order Database connected successfully!");

    await natsWrapper.connect({
      clusterId: process.env.NATS_CLUSTER_ID,
      clientId: process.env.NATS_CLIENT_ID,
      connectionUrl: process.env.NATS_URL,
    });

    natsWrapper.stan.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    new SuccessfulOrderEmailListener(natsWrapper.stan).listen();
  } catch (error) {
    console.error(error);
  }
})();

export default app;
