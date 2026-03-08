export default class ExpressError extends Error {
  constructor(statusCode, message, success) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
  }
}
