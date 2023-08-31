export class CustomError extends Error {
  statusCode?: number;
  name: string;

  constructor(message: string, statusCode?: number, name?: string) {
    super(message);
    this.name = name ?? "";
    this.statusCode = statusCode ?? 500;
  }
}
