import * as mongoose from "mongoose";
export interface ICurrencyModel extends mongoose.Document {
    currency_name: string;
    currency_name_plural: string;
    currency_code: string;
    currency_symbol: string;
    currency_symbol_native: string;
    decimal_digits: number;
    base_conversion_factor: number;
    rounding: number;
    is_default: boolean;
}
export declare const CurrencySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    currency_name?: string;
    currency_name_plural?: string;
    currency_code?: string;
    currency_symbol?: string;
    currency_symbol_native?: string;
    decimal_digits?: number;
    base_conversion_factor?: number;
    rounding?: number;
    is_default?: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    currency_name?: string;
    currency_name_plural?: string;
    currency_code?: string;
    currency_symbol?: string;
    currency_symbol_native?: string;
    decimal_digits?: number;
    base_conversion_factor?: number;
    rounding?: number;
    is_default?: boolean;
}>> & mongoose.FlatRecord<{} & {
    currency_name?: string;
    currency_name_plural?: string;
    currency_code?: string;
    currency_symbol?: string;
    currency_symbol_native?: string;
    decimal_digits?: number;
    base_conversion_factor?: number;
    rounding?: number;
    is_default?: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
