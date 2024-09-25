"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateSchema = void 0;
const mongoose = require("mongoose");
exports.StateSchema = new mongoose.Schema({
    country: { type: mongoose.Schema.Types.ObjectId, ref: "country" },
    country_id: { type: String },
    state_id: { type: String },
    state_name: { type: String },
}, {
    collection: "state",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=state.schema.js.map