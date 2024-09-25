import * as mongoose from "mongoose";
import { ICountryModel } from "./country.schema";
import { IStateModel } from "./state.schema";
export interface ICityModel extends mongoose.Document {
    country: string | ICountryModel;
    state: string | IStateModel;
    country_id: string;
    state_id: string;
    city_id: string;
    city_name: string;
}
export declare const CitySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    country?: mongoose.Types.ObjectId;
    country_id?: string;
    state?: mongoose.Types.ObjectId;
    state_id?: string;
    city_id?: string;
    city_name?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    country?: mongoose.Types.ObjectId;
    country_id?: string;
    state?: mongoose.Types.ObjectId;
    state_id?: string;
    city_id?: string;
    city_name?: string;
}>> & mongoose.FlatRecord<{} & {
    country?: mongoose.Types.ObjectId;
    country_id?: string;
    state?: mongoose.Types.ObjectId;
    state_id?: string;
    city_id?: string;
    city_name?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
