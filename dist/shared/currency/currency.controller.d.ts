import { CurrencyService } from "./currency.service";
import { Response } from "express";
import { SharedService } from "../shared.service";
export declare class CurrencyController {
    private currency_service;
    private shared_service;
    constructor(currency_service: CurrencyService, shared_service: SharedService);
    getCurrency(search: string, skip: number, limit: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
