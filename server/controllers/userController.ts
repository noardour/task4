import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class UserController {
  authMiddleware: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const user = await prisma.user.findUnique({ where: { id: decoded["userID"] } });
      if (!user || user.status == "BLOCKED") return res.sendStatus(403);

      next();
    });
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || user.password !== password) return res.status(400).send("Неправильный email или пароль");
      if (user.status === "BLOCKED") return res.status(400).send("Данный пользователь заблокирован");

      const token = jwt.sign({ userID: user.id, userEmail: user.email }, process.env.JWT_SECRET as string);

      user.password = undefined;
      res.send({ token, user });
    } catch (err) {
      res.status(400).send({
        message: err,
      });
    }
  };

  registrate = async (req: Request, res: Response) => {
    const schema = Joi.object({
      email: Joi.string().email().max(255).required(),
      name: Joi.string().min(1).max(255).required(),
      password: Joi.string().min(1).max(255).required(),
      repeat_password: Joi.ref("password"),
    });
    const validated = schema.validate(req.body);
    const existUser = await prisma.user.findFirst({ where: { email: `${req.body?.email}` } });
    let error: string | undefined;

    if (existUser) {
      error = "This email already registered.";
    }
    error = error || validated.error?.details[0].message;

    if (error) {
      return res.status(400).send(error);
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      },
    });

    const token = jwt.sign({ userID: user?.id, userEmail: user?.email }, process.env.JWT_SECRET as string);

    user.password = undefined;
    res.json({ user, token });
  };

  fetch = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        lastLoginAt: true,
        regesteredAt: true,
        status: true,
      },
    });
    res.json(users);
  };

  block = async (req: Request, res: Response) => {
    await prisma.user.updateMany({
      where: {
        id: {
          in: req.body.ids,
        },
      },
      data: {
        status: "BLOCKED",
      },
    });

    res.send("success");
  };

  unblock = async (req: Request, res: Response) => {
    const users = await prisma.user.updateMany({
      where: {
        id: {
          in: req.body.ids,
        },
      },
      data: {
        status: "ACTIVE",
      },
    });

    res.json("success");
  };

  remove = async (req: Request, res: Response) => {
    const ids = req.query.ids;

    if (ids && typeof ids === "string") {
      await prisma.user.deleteMany({
        where: {
          id: {
            in: JSON.parse(ids),
          },
        },
      });

      return res.json(req.query.ids);
    }

    res.status(422);
    res.send("no ids passed");
  };
}

export default new UserController();
