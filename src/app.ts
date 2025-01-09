import { getIndex, getJobRoles } from "./controllers/JobRoleController";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { dateFilter } from "./filter/DateFilter";
import {getLogger} from "../src/LogConfig";

const logApp = getLogger("service");

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

const env = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

env.addFilter('date', dateFilter);

app.use(express.static('public'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  logApp.info(`${req.method}-ing endpoint "${req.path}"`);
  next();
})

app.listen(3000, () => {
  logApp.info('Server started on port 3000');
});

app.get('/', getIndex);
app.get('/jobRoles', getJobRoles);

