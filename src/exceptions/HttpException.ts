export interface iHttpException {
  id: number;
  message: string;
}

export default class HttpException extends Error {
  public status: number;
  public message: string;
  public id: number;
  constructor(status: number, obj: iHttpException) {
    super(obj.message);
    this.status = status;
    this.message = obj.message;
    this.id = obj.id;
  }
}
