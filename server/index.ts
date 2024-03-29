import express, { Express, Request, Response } from "express";
import path from "path";
import router from "./router";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const clientDir = path.join(__dirname, "..", "client", "dist");

app.use("/", router);

app.use(express.static(clientDir));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(clientDir, "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
