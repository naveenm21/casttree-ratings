import * as mongoose from "mongoose";
export interface IDateFormatModel extends mongoose.Document {
    display_name: string;
    db_format_key?: string;
    web_format_key?: string;
}
export declare const DateFormatSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    display_name: string;
    db_format_key?: string;
    web_format_key?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    display_name: string;
    db_format_key?: string;
    web_format_key?: string;
}>> & mongoose.FlatRecord<{} & {
    display_name: string;
    db_format_key?: string;
    web_format_key?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
