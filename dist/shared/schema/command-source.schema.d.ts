import * as mongoose from "mongoose";
import { ECommandProcessingStatus, ECommandType } from "../enum/command-source.enum";
export interface ICommandSourceModel extends mongoose.Document {
    userId?: string;
    resourceUri?: string;
    aggregateType?: string;
    aggregateId?: string;
    action?: string;
    type: ECommandType;
    commandData: any;
    isCompositeIndex: boolean;
    status: ECommandProcessingStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare const CommandSourceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    [x: string]: unknown;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    [x: string]: unknown;
}>> & mongoose.FlatRecord<{
    [x: string]: unknown;
}> & Required<{
    _id: unknown;
}>>;
