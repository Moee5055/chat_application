import { Request, Response } from "express";

export const handleUserLogin = async (req: Request, res: Response) => {
  console.log(req.body);
};

export const handleUserSignup = async (req: Request, res: Response) => {
  console.log(req.body);
};
