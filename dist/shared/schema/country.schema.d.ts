import * as mongoose from "mongoose";
export interface ICountryModel extends mongoose.Document {
    country_id: string;
    country_code: string;
    country_name: string;
    phonecode: string;
    is_default: boolean;
}
export declare const CountrySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    is_default?: boolean;
    country_id?: string;
    country_code?: string;
    country_name?: string;
    phonecode?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    is_default?: boolean;
    country_id?: string;
    country_code?: string;
    country_name?: string;
    phonecode?: string;
}>> & mongoose.FlatRecord<{} & {
    is_default?: boolean;
    country_id?: string;
    country_code?: string;
    country_name?: string;
    phonecode?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
