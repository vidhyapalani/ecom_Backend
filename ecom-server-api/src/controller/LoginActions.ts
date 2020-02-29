import { Request, Response, Application } from 'express';
import { Db } from 'mongodb';
import req = require('request');
var { ObjectId } = require('mongodb');


export class LoginActions {

    private app: Application;
    private db: Db;

    constructor(app: Application, db: Db) {
        this.app = app;
        this.db = db;
    }


    //Create User Account
    async addUser(request: Request, response: Response) {

        let userData = {

            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,

        };
        console.log(userData);

        let result = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            status: false,
            err: null,
            _id: null

        };

        let userExists = await this.db.collection('user').findOne({ email: request.body.email });
        if (userExists != null) {
            console.log("User already exists");
            result.err = "ALREADY_EXISTS"

            result.status = true;
        }
        else {

            let userDetails = await this.db.collection('user').insert(userData)
            console.log(userDetails);
            result.status = true;
            result._id = userDetails.ops.length > 0 ? (userDetails.ops[0] ? userDetails.ops[0]._id : null) : null
        }

        response.json(result);

    }


    //Get Product
    async fetchProduct(request: Request, response: Response) {

        let result = {
            status: false,
            err: null,
            fetchDetails: null
        };

        let fetchDetails;

        let getProduct = await this.db.collection('product').find();

        if (getProduct) {
            result.status = true;
            result.err = "PRODUCTS_FETCHED";
            // result.fetchDetails = await getProduct.toArray();
            fetchDetails = await getProduct.toArray();
        }
        else {
            result.status = false;
            result.err = "FAILED_TO_FETCH";
            console.log(result.status);
        }

        response.json(fetchDetails), (result ? getProduct : null);

    }


    //Login
    async login(request: Request, response: Response) {

        let loginData = {
            email: request.body.email,
            password: request.body.password,
        }
        let result = {
            status: false,
        };


        let loginserve = await this.db.collection('user').findOne({ email: request.body.email, password: loginData.password });
        console.log(result);
        if (loginserve != null) {
            result.status = true;
        }
        else {
            result.status = false;
        }

        response.json(result)

    }

    //add Product
    async addProduct(request: Request, response: Response) {

        let productData = {

            name: request.body.name,
            price: request.body.price,
            image: request.body.image

        };
        console.log(productData);

        let result = {
            name: request.body.name,
            price: request.body.price,
            image: request.body.image,
            status: false,
            err: null,
            _id: null

        };

        let addproduct = await this.db.collection('product').insert(productData)
        console.log(addproduct);
        result.status = true;
        result._id = addproduct.ops.length > 0 ? (addproduct.ops[0] ? addproduct.ops[0]._id : null) : null

        response.json(result);

    }


    //update Product

    async updateProduct(request: Request, response: Response) {

        let productData = {
            id: request.body._id,
            name: request.body.name,
            price: request.body.price,
            image: request.body.image

        };
        console.log(productData);

        let result = {
            name: request.body.name,
            price: request.body.price,
            image: request.body.image,
            status: false,
            err: null,
            _id: null

        };

        let updateQuery = {
            _id: ObjectId(request.body._id)
        }

        let addproduct = await this.db.collection('product').updateOne(updateQuery, {
            $set: {
                name: request.body.name,
                price: request.body.price,
                image: request.body.image
            }
        })

        console.log(addproduct);
        result.status = true;
        response.json(result);

    }

    //delete Product

    async deleteProduct(request: Request, response: Response) {

        let productData = {
            _id: request.body._id,
        };
        console.log(productData);

        let result = {
            status: false,
        };

        let updateQuery = {
            _id: ObjectId(request.body._id)
        }

        let product = await this.db.collection('product').deleteOne(updateQuery)
        console.log(product);
        result.status = true;

        response.json(result);

    }

}

  





    

