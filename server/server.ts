import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

import * as generateRoute from "./routes/generate";
import * as homeRoute from "./routes/home";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", homeRoute.index);
app.get("/generate", generateRoute.generate);

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"),
    app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
