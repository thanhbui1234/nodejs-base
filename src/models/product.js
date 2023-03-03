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
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

plugins.forEach((plugin) => {
    productSchema.plugin(plugin);
});

export default model("Product", productSchema);

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
