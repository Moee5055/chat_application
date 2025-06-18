import type { Request, RequestHandler, Response } from "express";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { z } from "zod";

import { prisma } from "../config/db";
import { hashPassword } from "../helper/hashpassword";

//zod schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
  mobile_number: z.string(),
  profilePictureUrl: z.string().url().optional(),
  isOnline: z.boolean().optional(),
});

export const handleUserSignup: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  console.log(req.body);

  // Validate using Zod
  const parseResult = signupSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: "Invalid input",
      details: parseResult.error.flatten().fieldErrors,
    });
    console.log("Error paring data: ", parseResult.error.flatten().fieldErrors);
    return;
  }

  const {
    email,
    password,
    firstname,
    lastname,
    mobile_number,
    profilePictureUrl,
    isOnline,
  } = parseResult.data;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // 🔒 Consider hashing this before saving
        firstname,
        lastname,
        mobile_number,
        profilePictureUrl: profilePictureUrl ?? "",
        isOnline: isOnline ?? false,
      },
    });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("Prisma error:", error.code);
      res.status(500).json({ error: "Database error" });
      return;
    }
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: "Unexpected error occurred" });
      return;
    }
    res.status(500).json({ error: "Unknown error" });
  }
};

export const handleUserLogin: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ error: "Username or Password requied" });
  return;
};
