import { Request, RequestHandler, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const apiRouter = Router();

const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

apiRouter.post("/users/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.password !== password) throw Error("Неправильный email или пароль");

    const token = jwt.sign({ userID: user?.id, userEmail: user?.email }, process.env.JWT_SECRET as string);

    res.send({ success: true, token: token });
  } catch (err) {
    res.send(400).send({
      message: err,
    });
  }
});

apiRouter.post("/users/register", async (req: Request, res: Response) => {
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
    return res.status(422).send(error);
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

apiRouter.get("/users", authMiddleware, async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

apiRouter.patch("/users/block", authMiddleware, async (req: Request, res: Response) => {
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

apiRouter.patch("/users/unblock", authMiddleware, async (req: Request, res: Response) => {
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

apiRouter.delete("/users/delete/", authMiddleware, async (req: Request, res: Response) => {
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
