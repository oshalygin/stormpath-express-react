import express from "express";
import userApi from "./controllers/userController";

let router = express.Router();
let userController = userApi();

// {api/user}
router
    .route("/user")
    .get(userController.get);

export default router;