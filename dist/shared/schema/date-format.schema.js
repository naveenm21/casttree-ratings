"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFormatSchema = void 0;
const mongoose = require("mongoose");
exports.DateFormatSchema = new mongoose.Schema({
    display_name: { type: String, required: true },
    db_format_key: { type: String },
    web_format_key: { type: String },
}, {
    collection: "dateFormat",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=date-format.schema.js.map