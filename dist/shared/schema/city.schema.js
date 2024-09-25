"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitySchema = void 0;
const mongoose = require("mongoose");
exports.CitySchema = new mongoose.Schema({
    country: { type: mongoose.Schema.Types.ObjectId, ref: "country" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "state" },
    country_id: { type: String },
    state_id: { type: String },
    city_id: { type: String },
    city_name: { type: String },
}, {
    collection: "city",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=city.schema.js.map