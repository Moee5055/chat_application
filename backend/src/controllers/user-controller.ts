import type { RequestHandler, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

import { prisma } from "../config/db";

export const checkUserExist: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
  }

  try {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      res.status(200).json({ error: "User already exists with this email" });
      return;
    }
    res.status(200).json({ message: "User is available" });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("Primsa Error: ", error.code);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: "Unexpected error occurred" });
      return;
    }
    res.status(500).json({ error: "Unknown error" });
  }
};
