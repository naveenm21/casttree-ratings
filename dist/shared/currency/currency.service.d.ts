import { Model } from "mongoose";
import { ICurrencyModel } from "../schema/currency.schema";
export declare class CurrencyService {
    private currency_model;
    constructor(currency_model: Model<ICurrencyModel>);
    getCurrency(search: string, skip: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, ICurrencyModel> & ICurrencyModel & Required<{
            _id: unknown;
        }>)[];
        count: number;
    }>;
    getSingleCurrency(currency_id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, ICurrencyModel> & ICurrencyModel & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, ICurrencyModel> & ICurrencyModel & Required<{
        _id: unknown;
    }>, {}, ICurrencyModel, "findOne", {}>;
    getDefaultCurrency(): Promise<import("mongoose").Document<unknown, {}, ICurrencyModel> & ICurrencyModel & Required<{
        _id: unknown;
    }>>;
}
