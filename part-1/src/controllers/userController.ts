import { Request, Response } from "express";
import { prisma } from "../db";
import { InsertUserCode } from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import logger from "../logger";

export const insert_user = async (req: Request, res: Response) => {
  logger.info("Insert user request", { email: req.body.email });
  const { user_name, date_of_birth, email, password } = req.body;

  if (!user_name || typeof user_name !== "string") {
    return res.status(400).json({ error: InsertUserCode.INVALID_NAME });
  }
  if (!date_of_birth || typeof date_of_birth !== "string") {
    return res
      .status(400)
      .json({ error: InsertUserCode.INVALID_DATE_OF_BIRTH });
  }
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: InsertUserCode.INVALID_EMAIL });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({ error: InsertUserCode.INVALID_PASSWORD });
  }

  if (user_name.length < 5 || user_name.length > 16) {
    return res.status(400).json({ error: InsertUserCode.INVALID_NAME });
  }

  const dob = new Date(date_of_birth);
  if (isNaN(dob.getTime())) {
    return res
      .status(400)
      .json({ error: InsertUserCode.INVALID_DATE_OF_BIRTH });
  }

  const age = new Date().getFullYear() - dob.getFullYear();
  if (age < 18) {
    return res
      .status(400)
      .json({ error: InsertUserCode.INVALID_DATE_OF_BIRTH });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: InsertUserCode.INVALID_EMAIL });
  }

  if (password.length < 5 || password.length > 16) {
    return res.status(400).json({ error: InsertUserCode.INVALID_PASSWORD });
  }

  const digitCount = (password.match(/\d/g) || []).length;
  const upperCount = (password.match(/[A-Z]/g) || []).length;
  if (digitCount < 2 || upperCount < 1) {
    return res.status(400).json({ error: InsertUserCode.INVALID_PASSWORD });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ user_name }, { email }],
      },
    });
    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email ? "DUPLICATE_EMAIL" : "DUPLICATE_NAME",
      });
    }

    const user = await prisma.user.create({
      data: {
        user_name,
        date_of_birth: new Date(date_of_birth),
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(400).json({
        error: "DUPLICATE_EMAIL",
      });
    }
    logger.error("Error inserting user", { error: err });
    res.status(500).json({ error: "Internal server error" });
  }
};
