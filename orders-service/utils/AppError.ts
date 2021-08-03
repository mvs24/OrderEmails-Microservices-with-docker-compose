export class AppError {
  public isOperational: boolean;
  public status: string;

  constructor(public message: string, public statusCode: number) {
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}
