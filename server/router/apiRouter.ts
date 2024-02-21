import { Router } from "express";
import userController from "../controllers/userController";

const apiRouter = Router();

apiRouter.post("/users/login", userController.login);

apiRouter.post("/users/registrate", userController.registrate);

apiRouter.get("/users", userController.authMiddleware, userController.fetch);

apiRouter.patch("/users/block", userController.authMiddleware, userController.block);

apiRouter.patch("/users/unblock", userController.authMiddleware, userController.unblock);

apiRouter.delete("/users/delete/", userController.authMiddleware, userController.remove);

export default apiRouter;
