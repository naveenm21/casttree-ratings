"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingaggregatedSchema = exports.ratingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ratingSchema = new mongoose_1.default.Schema({
    sourceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "serviceitems",
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    sourceType: {
        type: String,
    },
    overAllRating: {
        type: Number,
    },
    scale: {
        type: Number,
    },
    overAllDescription: {
        type: String,
    },
    status: {
        type: String,
    },
    reviewedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    }
}, {
    collection: "Ratingsv1",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.ratingaggregatedSchema = new mongoose_1.default.Schema({
    sourceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    sourceType: {
        type: String,
    },
    scale: {
        type: Number,
    },
    averageOverallRating: {
        type: Number,
    },
    totalReviewNumber: {
        type: Number,
    },
});
//# sourceMappingURL=ratings-schema.js.map