import {UserController} from "./controller/user/controller";
import { AccountController } from "./controller/account/controller";
import { TransactionController } from "./controller/transaction/controller";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "get",
    route: "/accounts",
    controller: AccountController,
    action: "all"
}, {
    method: "get",
    route: "/accounts/:id",
    controller: AccountController,
    action: "one"
}, {
    method: "post",
    route: "/accounts",
    controller: AccountController,
    action: "save"
}, {
    method: "delete",
    route: "/accounts/:id",
    controller: AccountController,
    action: "remove"
},
{
    method: "get",
    route: "/transaction",
    controller: TransactionController,
    action: "performTransaction"
}];