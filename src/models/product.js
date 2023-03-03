import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];

const categoryProductSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

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

const schemas = {
    Product: model("Product", productSchema),
    CategoryProduct: model("Category", categoryProductSchema),
};
export default schemas;

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      price:
 *        type: number
 *    required:
 *     - name
 *    example:
 *      id: ObjectId(636b05a185ccf3d4efaab935)
 *      name: Product A
 *      price: 200
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API dành cho Product
 */
