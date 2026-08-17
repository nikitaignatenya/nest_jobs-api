import { Response } from 'express';
const buildResponse = (res: Response, status: number, message: any) => {
  res.status(status).send(message);
};
export { buildResponse };
