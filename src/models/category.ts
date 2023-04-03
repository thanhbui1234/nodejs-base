import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

interface ICategory {
    name: string;
    products: mongoose.Types.ObjectId[];
    deletedAt?: Date | null;
    deleted?: boolean;
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    products: [
        { type: mongoose.Types.ObjectId, ref: "Product" }
    ]
}, { timestamps: true, versionKey: false });

plugins.forEach((plugin) => {
    categorySchema.plugin(plugin);
});

export default mongoose.model<ICategory>("Category", categorySchema);
