/* eslint-disable no-console */
// import path from "path";
import express from "express";
// import bodyParser from "body-parser";
// import webpack from "webpack";
// import configuration from "../webpack.config.dev";
import colors from "colors"; //eslint-disable-line no-unused-vars
import open from "open";
import { STORMPATH_API_KEY } from "../utilities/configurationKeys";

// import router from "./routes";

let application = express();
let stormpath = require("express-stormpath");

application.use(stormpath.init(application, {
    application: {
        href: STORMPATH_API_KEY
    }
}));

let port = process.env.PORT || 3000; //eslint-disable-line no-process-env

// application.use(bodyParser.urlencoded({ extended: true }));
// application.use(bodyParser.json());



// const applicationCompiler = webpack(configuration);
// application.use(require("webpack-dev-middleware")(applicationCompiler, {
//     noInfo: true,
//     publicPath: configuration.output.publicPath
// }));

// application.use(require("webpack-hot-middleware")(applicationCompiler));

// application.use("/api", router);
// application.use("/client", express.static(path.join(__dirname, "../client")));

// application.get("*", (request, response) => {
//     let clientEntryPoint = path.join(__dirname, "../client/index.html");
//     response.sendFile(clientEntryPoint);
// });


application.listen(port, (error) => {
    if (!!error) {
        console.log(error.bold.red);
    }
    open(`http://localhost:${port}`);
    console.log(`Serving API AT http://localhost:${port}`.blue);
});

export default application;