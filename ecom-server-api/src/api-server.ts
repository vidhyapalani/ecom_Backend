import { createServer, Server } from 'http';
import * as express from 'express';
import * as cors from 'cors';

import * as bodyParser from 'body-parser';
import { Db } from 'mongodb';

import {DatabaseAdapter} from './database-adapter';
import {APIRouter} from './api-router';


export class APIServer {

    public static readonly PORT:number = 9500;
    private app: express.Application;
    private server: Server;
    private port: string | number;
    private db:Db;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.enbaleBodyParser();
        this.initCORS();
        this.connectDb().then (result=>{ 
            this.initCORS();
            this.initRouter();
            this.listen();
        })
    }



    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private enbaleBodyParser(): void {
        this.app.use(bodyParser.json());
    }

    private config(): void {
        this.port = process.env.PORT || APIServer.PORT;
    }

    private async connectDb(){
        const database = new DatabaseAdapter()
        this.db =  await database.connect();
    }

    private initRouter(){
        new APIRouter(this.app, this.db);
     }

     private initCORS (){ 

        // this.app.options('*', cors());
        this.app.use(cors());

     }

    private listen(): void {

        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

    }

    public getApp(): express.Application {
        return this.app;
    }
}
