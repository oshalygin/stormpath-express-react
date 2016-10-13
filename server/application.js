/* eslint-disable no-console */
import express from "express";

import colors from "colors"; //eslint-disable-line no-unused-vars
import open from "open";
import {
    STORMPATH_APPLICATION_HREF,
    STORMPATH_CLIENT_APIKEY_ID,
    STORMPATH_CLIENT_APIKEY_SECRET
} from "../utilities/configurationKeys";


let application = express();
let stormpath = require("express-stormpath");
let port = process.env.PORT || 3000; //eslint-disable-line no-process-env

application.use(stormpath.init(application, {
    apiKey: {
        id: STORMPATH_CLIENT_APIKEY_ID,
        secret: STORMPATH_CLIENT_APIKEY_SECRET
    },
    application: {
        href: STORMPATH_APPLICATION_HREF
    },
    website: true
}));

application.get("/", stormpath.loginRequired, (request, response) => {
    response.send(`Hey there, ${request.user.givenName}`);
});

application.get("/api", stormpath.loginRequired, (request, response) => {
    request.user.createApiKey((error, apiKey) => {
        if (!!error) {
            return error;
        }
        return response.json({apiId: apiKey.id, apiSecret: apiKey.secret});
    });

});

application.get("/api/test", stormpath.apiAuthenticationRequired, (request, response) => {
    response.json({
        data: "Hello World Data"
    });
});


application.on("stormpath.ready", () => {
    application.listen(port, (error) => {
        if (!!error) {
            console.log(error.bold.red);
        }
        open(`http://localhost:${port}`);
        console.log(`Serving API AT http://localhost:${port}`.blue);
    });
});


export default application;