import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];
const productSchema = Schema({
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
        type: Schema.Types.ObjectId,
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
});

plugins.forEach((plugin) => {
    productSchema.plugin(plugin);
});
export default model("Product", productSchema);
