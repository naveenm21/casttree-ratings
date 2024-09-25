import * as mongoose from "mongoose";
import { ICountryModel } from "./country.schema";
export interface IStateModel extends mongoose.Document {
    country: string | ICountryModel;
    country_id: string;
    state_id: string;
    state_name: string;
}
export declare const StateSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    country_id?: string;
    country?: mongoose.Types.ObjectId;
    state_id?: string;
    state_name?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    country_id?: string;
    country?: mongoose.Types.ObjectId;
    state_id?: string;
    state_name?: string;
}>> & mongoose.FlatRecord<{} & {
    country_id?: string;
    country?: mongoose.Types.ObjectId;
    state_id?: string;
    state_name?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
