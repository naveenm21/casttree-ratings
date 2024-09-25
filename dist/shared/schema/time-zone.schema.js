"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZoneSchema = void 0;
const mongoose = require("mongoose");
exports.TimeZoneSchema = new mongoose.Schema({
    value: { type: String },
    abbr: { type: String },
    offset: { type: Number },
    isdst: { type: Boolean },
    text: { type: String },
    utc: [{ type: String }],
    is_default: { type: Boolean },
}, {
    collection: "timeZone",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=time-zone.schema.js.map