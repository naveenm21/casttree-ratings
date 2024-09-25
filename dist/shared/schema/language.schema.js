"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSchema = exports.LanguageMediaSchema = void 0;
const mongoose = require("mongoose");
exports.LanguageMediaSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "media",
    },
});
exports.LanguageSchema = new mongoose.Schema({
    language_id: { type: String },
    language_code: { type: String },
    language_name: { type: String },
    language_native_name: { type: String },
    media: [exports.LanguageMediaSchema],
}, {
    collection: "language",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
//# sourceMappingURL=language.schema.js.map