import { getIndex, getJobRoles } from "./controllers/JobRoleController";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { dateFilter } from "./filter/DateFilter";
import { getLogger } from "./LogConfig";
import dotenv from "dotenv";
import {
  getLoginForm,
  getRegistrationForm,
  postLoginForm,
  postRegistrationForm,
} from "./controllers/AuthController";

dotenv.config();
const appLogger = getLogger("app");
const app = express();

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app
});

env.addFilter("date", dateFilter);

app.use(express.static("public"));
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  appLogger.info(`${req.method}-ing endpoint "${req.path}"`);
  next();
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: parseInt(process.env.SESSION_EXPIRY) },
  })
);

app.listen(3000, () => {
  appLogger.info("Server started on port 3000");
});

app.get("/", getIndex);
app.get("/jobRoles", getJobRoles);

app.get("/login", getLoginForm);
app.post("/login", postLoginForm);
app.get("/register", getRegistrationForm);
app.post("/register", postRegistrationForm);
