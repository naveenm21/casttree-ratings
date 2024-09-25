"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountrySchema = void 0;
const mongoose = require("mongoose");
exports.CountrySchema = new mongoose.Schema({
    country_id: { type: String },
    country_code: { type: String },
    country_name: { type: String },
    phonecode: { type: String },
    is_default: { type: Boolean },
}, {
    collection: "country",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=country.schema.js.map