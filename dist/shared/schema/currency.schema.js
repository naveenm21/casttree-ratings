"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencySchema = void 0;
const mongoose = require("mongoose");
exports.CurrencySchema = new mongoose.Schema({
    currency_name: { type: String },
    currency_name_plural: { type: String },
    currency_code: { type: String },
    currency_symbol: { type: String },
    currency_symbol_native: { type: String },
    decimal_digits: { type: Number },
    base_conversion_factor: { type: Number },
    rounding: { type: Number },
    is_default: { type: Boolean },
}, {
    collection: "currency",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=currency.schema.js.map