import express, { Express, Request, Response } from "express";
import path from "path";
import router from "./router";

const app: Express = express();

app.use(
  express.urlencoded({
    extended: false,
    limit: 10000,
  })
);
app.use(express.json());

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
