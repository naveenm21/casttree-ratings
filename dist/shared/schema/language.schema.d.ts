import * as mongoose from "mongoose";
export declare const LanguageMediaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string;
    mediaId?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name?: string;
    mediaId?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    name?: string;
    mediaId?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface ILanguageMedia {
    name: string;
    mediaId: string;
}
export interface ILanguage extends mongoose.Document {
    language_id: string;
    language_code: string;
    language_name: string;
    language_native_name: string;
    media: ILanguageMedia[];
}
export declare const LanguageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    media: mongoose.Types.DocumentArray<{
        name?: string;
        mediaId?: mongoose.Types.ObjectId;
    }>;
    language_id?: string;
    language_code?: string;
    language_name?: string;
    language_native_name?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{} & {
    media: mongoose.Types.DocumentArray<{
        name?: string;
        mediaId?: mongoose.Types.ObjectId;
    }>;
    language_id?: string;
    language_code?: string;
    language_name?: string;
    language_native_name?: string;
}>> & mongoose.FlatRecord<{} & {
    media: mongoose.Types.DocumentArray<{
        name?: string;
        mediaId?: mongoose.Types.ObjectId;
    }>;
    language_id?: string;
    language_code?: string;
    language_name?: string;
    language_native_name?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
