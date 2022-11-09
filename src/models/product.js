import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
    },
    price: {
        type: Number,
    },
});

export default mongoose.model("Product", productSchema);
