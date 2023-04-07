import mongoose, { UpdateQuery } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
import { IProduct } from "../interfaces/product";

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

// Trước khi xóa category, cập nhật lại category của các sản phẩm thuộc category này thành uncategory
categorySchema.pre("findOneAndDelete", async function (next) {
    try {
        const filter = this.getFilter(); // Lấy điều kiện tìm kiếm hiện tại của truy vấn
        const categoryId = this.getQuery().$set?.categoryId; // Lấy giá trị mới của trường categoryId nếu có
        const update: UpdateQuery<IProduct> = {
            categoryId: categoryId ?? "uncategorized", // Cập nhật categoryId mới hoặc "uncategorized" nếu không có giá trị mới
        };
        const { n } = await new this.model("Product").updateMany(
            { categoryId: filter._id }, // Tìm các sản phẩm cùng categoryId
            update // Cập nhật categoryId mới
        );
        console.log(`Updated ${n} products`);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model<ICategory>("Category", categorySchema);
