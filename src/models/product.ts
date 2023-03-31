import mongoose from "mongoose"; { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

interface IProduct {
    name: string;
    price: number;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    deleted?: boolean;
}

const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, versionKey: false });

plugins.forEach((plugin) => {
    productSchema.plugin(plugin);
});

export default mongoose.model<IProduct>("Product", productSchema);
