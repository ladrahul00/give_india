import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/user";
import { Account, AccountType } from "./entity/account";

// create express app
const app = express();
app.use(bodyParser.json());

// setup express app here
// ...

// start express server
const server = app.listen(3000);

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

createConnection().then(async connection => {

    // insert new users for test
    // const user1 = await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // const user2 = await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));
    // await connection.manager.save(connection.manager.create(Account, {
    //     user: user1,
    //     balanceAmount: 100,
    //     accountType: AccountType.SAVINGS
    // }));
    // await connection.manager.save(connection.manager.create(Account, {
    //     user: user1,
    //     balanceAmount: 500,
    //     accountType: AccountType.CURRENT
    // }));
    // await connection.manager.save(connection.manager.create(Account, {
    //     user: user2,
    //     balanceAmount: 50000,
    //     accountType: AccountType.BASIC_SAVINGS
    // }));


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => {
    console.log(error)
    server.close();
});
