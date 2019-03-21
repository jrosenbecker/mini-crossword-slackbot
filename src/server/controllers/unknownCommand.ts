import { Request, Response } from "express";

export function unknownCommand(req: Request, res: Response) {
  return res.status(200).send(`Unkown command entered. Please specify 'add' or 'top'.`);
}
