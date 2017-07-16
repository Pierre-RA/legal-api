import * as express from "express";
import * as dotenv from "dotenv";

import * as generateRoute from "./routes/generate";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.get("/", generateRoute.index);

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"),
    app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
