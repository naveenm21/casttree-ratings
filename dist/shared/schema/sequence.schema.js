"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceSchema = void 0;
const mongoose = require("mongoose");
exports.SequenceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    tenant: {
        type: "Number",
        description: "The client id",
        example: 100,
    },
    transaction_series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactionSeries",
    },
    name: {
        type: "String",
        description: "Name of the sequence",
        example: "SEQ_BID",
    },
    prefix: {
        type: String,
    },
    length: {
        type: Number,
    },
    value: {
        type: "Number",
        description: "Current number",
        default: 0,
        example: 12,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "sequence",
});
//# sourceMappingURL=sequence.schema.js.map