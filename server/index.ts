import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();

const buildDir = path.join(__dirname, "..", "client", "dist");

app.use(express.static(buildDir));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(buildDir, "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
