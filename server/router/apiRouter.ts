import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const apiRouter = Router();

apiRouter.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

apiRouter.post("/users/create", async (req: Request, res: Response) => {
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
    res.status(422);
    return res.send(error);
  }

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  });

  res.json(user);
});

apiRouter.patch("/users/block", async (req: Request, res: Response) => {
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
});

apiRouter.patch("/users/unblock", async (req: Request, res: Response) => {
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
});

apiRouter.delete("/users/delete/", async (req: Request, res: Response) => {
  const ids = req.query.ids;

  if (ids && typeof ids === "string") {
    const users = await prisma.user.deleteMany({
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
});

export default apiRouter;
