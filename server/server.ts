import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

import * as generatorController from "./routes/generator.controller";
import * as homeController from "./routes/home.controller";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", homeController.index);
app.get("/generator/:fileId", generatorController.generate);

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"),
    app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
