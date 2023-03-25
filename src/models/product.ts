import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

interface IProduct {
    name: string;
    price: number;
    description?: string;
    categoryId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    deleted?: boolean;
}

const productSchema = new Schema<IProduct>({
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
    // categoryId: {
    //     type: Types.ObjectId,
    //     ref: "categories",
    //     required: true,
    // },
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
});

plugins.forEach((plugin) => {
    productSchema.plugin(plugin);
});

const Product = model<IProduct>("Product", productSchema);
export default Product;