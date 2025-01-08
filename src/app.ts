import { getIndex, getJobRoles, getJobRole, getJobRoleForm } from "./controllers/JobRoleController";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { dateFilter } from "./filter/DateFilter";

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
  console.log(`${req.method}-ing endpoint "${req.path}"`);
  next();
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/', getIndex);
app.get('/jobRoles', getJobRoles);
app.get('/jobRoles/:id', getJobRole);
app.get('/insert-jobRole', getJobRoleForm);

