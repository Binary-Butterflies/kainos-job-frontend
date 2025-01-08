import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";

import { getAllDatabases } from "./controllers/TestController";
import {
  getLoginForm,
  getRegistrationForm,
  postLoginForm,
  postRegistrationForm,
} from "./controllers/AuthController";

dotenv.config();
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: parseInt(process.env.SESSION_EXPIRY) },
  })
);

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method}-ing endpoint "${req.path}"`);
    next();
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.get("/", getAllDatabases);
app.get("/login", getLoginForm);
app.post("/login", postLoginForm);
app.get("/register", getRegistrationForm);
app.post("/register", postRegistrationForm);
