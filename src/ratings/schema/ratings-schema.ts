import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
export interface ratings {

  sourceId: string;

  transactionId: string;

  transactionType: string;

  sourceType: string;

  overAllRating: number;

  scale: number;

  overAllDescription: string;

  status: string;

  reviewedBy: string;

  createdAt: any;

  updatedAt: any;

  createdBy: string;

  updatedBy: string;
}
export interface ratingsAggregated {

  sourceId: string;

  sourceType: string;

  finalAverageRating: Number;

  averageOverallRating: Number;

  scale: Number;

  totalReviewNumber: Number;
}
export const ratingSchema = new mongoose.Schema<any>({
  sourceId: {
    type: String
  },

  sourceType: {
    type: String,
  },
  transactionId: {
    type: String
  },

  transactionType: {
    type: String
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  }
}
  ,
  {
    collection: "ratings",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  });
export const ratingAggregatedSchema = new mongoose.Schema<any>({
  sourceId: {
    type: String
  },

  sourceType: {
    type: String,
  },

  scale: {
    type: Number,
  },

  finalAverageRating: {
    type: Number
  },
  averageOverallRating: {
    type: Number,
  },

  totalReviewNumber: {
    type: Number,
  },


});