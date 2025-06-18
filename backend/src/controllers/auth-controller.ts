import type { Request, RequestHandler, Response } from "express";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { z } from "zod";

import { prisma } from "../config/db";
import { hashPassword } from "../helper/hashpassword";
import { comparePasswords } from "../helper/verifyPassword";

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

const loginSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6),
  mobile_number: z.string().optional(),
});

export const handleUserSignup: RequestHandler = async (
  req: Request,
  res: Response,
) => {
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
        password: hashedPassword,
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
      console.log("Prisma error:", error.message);
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
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: "Invalid input",
      details: parseResult.error.flatten().fieldErrors,
    });
    console.log("Error paring data: ", parseResult.error.flatten().fieldErrors);
    return;
  }
  const { email, mobile_number, password } = parseResult.data;
  if (!email && !mobile_number) {
    res.status(400).json({ error: "mobile_number or email required." });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({ error: "User doesn't exist" });
      return;
    }
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "email or password incorrect" });
      return;
    }
    //jwt token
    console.log("You are login");
    res.json({ message: "You are login and get token" });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("Prisma error:", error.message);
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
