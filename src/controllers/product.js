import Product from "../models/product";
import Category from "../models/product";
import { productSchema } from "../validate/product";

export const get = async (req, res) => {
    const options = {
        page: req.query._page || 1,
        limit: req.query._limit || 10,
        sort: { [req.query._sort || "createdAt"]: req.query._order === "desc" ? -1 : 1 },
    };

    try {
        if (req.params.id) {
            // nếu có id thì trả về sản phẩm duy nhất
            const product = await Product.findOne({ _id: req.params.id });
            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }
            return res.status(200).json({
                data: product,
            });
        } else {
            // nếu không có id thì trả về danh sách sản phẩm
            const result = await Product.paginate({}, options);

            if (result.docs.length === 0) {
                return res.status(404).json({
                    message: "No products found",
                });
            }
            return res.status(200).json({
                data: result.docs,
                pagination: {
                    currentPage: result.page,
                    totalPages: result.totalPages,
                    totalItems: result.totalDocs,
                },
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

/**
 * @swagger
 * /api/products:
 *  post:
 *   tags: [Products]
 *   summary: Tạo sản phẩm mới
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Product'
 *   responses:
 *    200:
 *     description: Tạo sản phẩm thành công
 *    400:
 *     description: Tạo sản phẩm không thành công
 */

export const add = async (req, res) => {
    try {
        const body = req.body;

        // Kiểm tra dữ liệu
        await productSchema.validate(body, { abortEarly: false });

        const product = await Product.create(body);
        return res.status(200).json({
            product,
        });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = error.errors.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }

        return res.status(400).json({
            message: "Không thêm được sản phẩm",
        });
    }
};
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        // Kiểm tra dữ liệu
        await productSchema.validate(body, { abortEarly: false });

        const product = await Product.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = error.inner.map((err) => ({ message: err.message }));
            return res.status(400).json({ errors });
        }

        res.status(400).json({
            messsage: "Không cap nhat được sản phẩm",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const { isHardDelete } = req.query;

        // Kiểm tra dữ liệu
        await productSchema.validate(req.body, { abortEarly: false });

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        // Kiểm tra nếu isHardDelete = true thì xóa vĩnh viễn
        // ngược lại thì xóa mềm
        isHardDelete === "true" ? await product.forceDelete() : await product.delete();

        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = error.inner.map((err) => ({ message: err.message }));
            return res.status(400).json({ errors });
        }

        res.status(400).json({
            message: "Xóa sản phẩm không thành công",
        });
    }
};

export const restore = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        // Kiểm tra quyền hạn của người dùng
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Bạn không có quyền phục hồi sản phẩm",
            });
        }
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        if (!product.deleted) {
            return res.status(400).json({
                message: "Sản phẩm chưa bị xóa mềm",
            });
        }

        product.deleted = false;
        product.deletedAt = null;

        const restoredProduct = await product.save();

        return res.status(200).json({
            message: "Phục hồi sản phẩm thành công",
            data: restoredProduct,
        });
    } catch (error) {
        res.status(400).json({
            message: "Phục hồi sản phẩm không thành công",
        });
    }
};
