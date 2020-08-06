import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Account, AccountType} from "../../entity/account";
import { sprintf } from "sprintf";

export class AccountController {
    public static readonly BASIC_SAVINGS_MAX_BALANCE_AMOUNT = 50000;

    public static readonly BASIC_SAVINGS_BALANCE_AMOUNT_EXCEEDED = 
        "Balance amount for basic savings account cannot be greater than %(balanceAmount)s";

    private accountRepository = getRepository(Account);

    public async all(request: Request, response: Response, next: NextFunction) {
        return this.accountRepository.find();
    }

    public async one(request: Request, response: Response, next: NextFunction) {
        return this.accountRepository.findOne(request.params.id);
    }

    public async save(request: Request, response: Response, next: NextFunction) {
        const accountDetails = request.body as Account;
        if (
            accountDetails.accountType === AccountType.BASIC_SAVINGS && 
            accountDetails.balanceAmount > AccountController.BASIC_SAVINGS_MAX_BALANCE_AMOUNT) {
            return response.status({ status: 500 }).json({ 
                message: sprintf(AccountController.BASIC_SAVINGS_BALANCE_AMOUNT_EXCEEDED, {
                        balanceAmount: AccountController.BASIC_SAVINGS_MAX_BALANCE_AMOUNT
                    })
                });
        }
        return this.accountRepository.save(request.body);
    }

    public async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.accountRepository.findOne(request.params.id);
        await this.accountRepository.remove(userToRemove);
    }

}