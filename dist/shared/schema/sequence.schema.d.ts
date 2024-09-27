import * as mongoose from "mongoose";
export interface ISequence extends mongoose.Document {
    user_id: any;
    transaction_series_id: any;
    prefix: string;
    length: number;
    tenant: number;
    name: string;
    value: number;
    created_by: any;
    updated_by: any;
}
export declare const SequenceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    collection: string;
}, {} & {
    value: number;
    length?: number;
    name?: string;
    user_id?: mongoose.Types.ObjectId;
    tenant?: number;
    transaction_series_id?: mongoose.Types.ObjectId;
    prefix?: string;
    created_by?: mongoose.Types.ObjectId;
    updated_by?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    value: number;
    length?: number;
    name?: string;
    user_id?: mongoose.Types.ObjectId;
    tenant?: number;
    transaction_series_id?: mongoose.Types.ObjectId;
    prefix?: string;
    created_by?: mongoose.Types.ObjectId;
    updated_by?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{} & {
    value: number;
    length?: number;
    name?: string;
    user_id?: mongoose.Types.ObjectId;
    tenant?: number;
    transaction_series_id?: mongoose.Types.ObjectId;
    prefix?: string;
    created_by?: mongoose.Types.ObjectId;
    updated_by?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
