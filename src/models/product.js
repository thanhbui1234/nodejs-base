import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
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

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

export default Product;

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
