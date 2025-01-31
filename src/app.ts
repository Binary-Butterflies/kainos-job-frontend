import dotenv from "dotenv";
dotenv.config();

import { getJobRole, getJobRoles, getJobRoleApply, postJobRoleApply, getJobRoleSuccess, getJobRoleApplicants } from "./controllers/JobRoleController";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { dateFilter } from "./filter/DateFilter";
import { getLogger } from "./LogConfig";
import {
  getLoginForm,
  getRegistrationForm,
  getUnauthorised,
  postLoginForm,
  postLogout,
  postRegistrationForm,
} from "./controllers/AuthController";
import { allowRoles } from "./middleware/AuthMiddleware";
import { UserRole } from "./models/UserRole";
import * as path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { jwtDecode } from "jwt-decode";
import { JwtToken } from "./models/JwtToken";

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

app.use(express.static(path.join(__dirname + '/../resources')));
app.use(express.static(path.join(__dirname + '/../node_modules/bootstrap/dist')));
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

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.isLoggedIn = req.session?.token != undefined;
  if (res.locals.isLoggedIn) {
    try {
      const decodedToken: JwtToken = jwtDecode(req.session.token);
      res.locals.isAdmin = decodedToken.Role == UserRole.Admin;
    } catch { /* empty */ }
  }
  
  next();
})

app.listen(3000, () => {
  appLogger.info("Server started on port 3000");
});


const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const uploadDoc = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, callBack) {
      callBack(null, { fieldName: file.fieldname });
    },
    key: function (req, file, callBack) {
      callBack(null, path.basename(`${Date.now()}-${file.originalname}`))
    }
  }),
  fileFilter: (req, file, callBack) => {
    if (file.mimetype == "application/pdf") { callBack(null, true); }
    if (file.mimetype == "application/msword") { callBack(null, true); }
    if (file.mimetype == "application/vnd.oasis.opendocument.text") { callBack(null, true); }
    if (file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") { callBack(null, true); }

    callBack(null, false);
  }
})

app.get("/jobRoles", allowRoles([UserRole.Admin, UserRole.User]), getJobRoles);
app.get('/jobRole/success', allowRoles([UserRole.Admin, UserRole.User]), getJobRoleSuccess);
app.get('/jobRole/:id', allowRoles([UserRole.Admin, UserRole.User]), getJobRole);
app.get('/jobRole/:id/apply', allowRoles([UserRole.Admin, UserRole.User]), getJobRoleApply);
app.get('/jobRole/:id/applicants', allowRoles([UserRole.Admin]), getJobRoleApplicants);
app.post('/jobRole/:id/apply', allowRoles([UserRole.Admin, UserRole.User]), uploadDoc.single('file'), postJobRoleApply);

app.get("/login", getLoginForm);
app.post("/login", postLoginForm);
app.post("/logout", postLogout);
app.get("/unauthorised", getUnauthorised);
app.get("/register", getRegistrationForm);
app.post("/register", postRegistrationForm);

app.get("/", (req: express.Request, res: express.Response) => {
  res.render('index.njk');
});

app.get("*", (req: express.Request, res: express.Response) => {
  res.render("notFound.njk");
});
