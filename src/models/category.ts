import mongoose, { UpdateQuery } from "mongoose"
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

// Trước khi xóa category, cập nhật lại category của các sản phẩm thuộc category này thành uncategory
categorySchema.pre("findOneAndUpdate", async function (next) {
    const filter = this.getFilter(); // Lấy điều kiện tìm kiếm hiện tại của truy vấn
    const update: UpdateQuery<ICategory> = {
        $set: { name: "uncategorized" },
    };
    // Nếu thông tin cập nhật bao gồm trường categoryId
    if (update.categoryId) {
        const { n } = await new this.model("Product").updateMany(
            { categoryId: filter._id }, // Tìm các sản phẩm cùng categoryId
            { categoryId: update.categoryId } // Cập nhật categoryId mới
        );
        console.log(`Updated ${n} products`);
    }

    next();
});

export default mongoose.model<ICategory>("Category", categorySchema);
