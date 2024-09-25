"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandSourceSchema = void 0;
const mongoose = require("mongoose");
const command_source_enum_1 = require("../enum/command-source.enum");
exports.CommandSourceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    resourceUri: {
        type: String,
    },
    aggregateType: {
        type: String,
        required: false,
    },
    aggregateId: {
        type: String,
        required: false,
    },
    action: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        default: command_source_enum_1.ECommandType.Rest,
    },
    commandData: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    isCompositeIndex: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: command_source_enum_1.ECommandProcessingStatus,
        default: null,
    },
}, {
    collection: "commandSource",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
//# sourceMappingURL=command-source.schema.js.map