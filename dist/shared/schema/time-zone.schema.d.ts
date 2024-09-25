import * as mongoose from "mongoose";
export interface ITimeZoneModel extends mongoose.Document {
    value: string;
    abbr: string;
    offset: number;
    isdst: boolean;
    text: string;
    utc: string[];
    is_default: boolean;
}
export declare const TimeZoneSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    utc: string[];
    text?: string;
    is_default?: boolean;
    value?: string;
    abbr?: string;
    offset?: number;
    isdst?: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    utc: string[];
    text?: string;
    is_default?: boolean;
    value?: string;
    abbr?: string;
    offset?: number;
    isdst?: boolean;
}>> & mongoose.FlatRecord<{} & {
    utc: string[];
    text?: string;
    is_default?: boolean;
    value?: string;
    abbr?: string;
    offset?: number;
    isdst?: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
