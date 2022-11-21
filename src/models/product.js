import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
    },
    price: {
        type: Number,
    },
});

export default mongoose.model("Product", productSchema);

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
