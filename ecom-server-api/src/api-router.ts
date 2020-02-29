import { Db } from "mongodb";

import { LoginActions } from "./controller/LoginActions";
import { Application } from "express";


export class APIRouter {

    private app: Application;
    private db: Db;
    private loginActions: LoginActions;

    constructor(app: Application, db: Db) {
        this.app = app;
        this.db = db;
        this.loginActions = new LoginActions(this.app, this.db);


        this.app.get("/", (req, res) => {
            res.json({ status: true, err: null });
        });




        /** ******* Create Account  ************* */

        this.app.post("/user/create", (req, res) => {
            this.loginActions.addUser(req, res);
        });


        /***********Login Actions ************/
        this.app.post("/user/login", (req, res) => {
            this.loginActions.login(req, res);
        });

        /***********Fetch Product ************/

        this.app.get("/fetch/product", (req, res) => {
            this.loginActions.fetchProduct(req, res);
        });


        /** ******* Add Product************* */

        this.app.post("/addProducts", (req, res) => {
            this.loginActions.addProduct(req, res);
        });

        /***********Update Product ************/
        this.app.post("/updateProduct", (req, res) => {
            this.loginActions.updateProduct(req, res);
        });

        /***********Delete Product ************/
        this.app.post("/deleteProduct", (req, res) => {
            this.loginActions.deleteProduct(req, res);
        });



    }
}

