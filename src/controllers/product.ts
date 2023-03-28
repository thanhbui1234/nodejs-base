
import { Request, Response } from "express";
import Product from "../models/product";
import { productSchema } from "../schemas/product";
interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
}

interface IProductResponse {
    data: IProduct[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}
export const get = async (req: Request, res: Response) => {
    const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc", _expand } = req.query;

    const options = {
        page: _page,
        limit: _limit,
        sort: { [_sort as string]: _order === "desc" ? -1 : 1 },
    };

    const populateOptions = _expand ? [{ path: "categoryId", select: "name" }] : [];

    try {
        if (req.params.id) {
            const product = await Product.findById(req.params.id);
            if (!product) throw new Error("Product not found");
            return res.status(200).json({ data: product });
        }

        const result = await Product.paginate({}, { ...options, populate: populateOptions }) as {
            docs: IProduct[];
            page: number;
            totalPages: number;
            totalDocs: number;
        };

        if (result.docs.length === 0) throw new Error("No products found");

        const response: IProductResponse = {
            data: result.docs,
            pagination: {
                currentPage: result.page,
                totalPages: result.totalPages,
                totalItems: result.totalDocs,
            },
        };

        // if (_expand) {
        //     const products = result.docs;
        //     const categories = Array.from(new Set(products.map((p) => p.categoryId)));
        //     response.categories = categories;
        // }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const add = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        // Kiểm tra dữ liệu
        const { error } = productSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const product = await Product.create(body);
        return res.status(200).json({
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const body = req.body;

        // Kiểm tra dữ liệu
        const { error } = productSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
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
        res.status(400).json({
            messsage: error,
        });
    }
};
export const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { isHardDelete } = req.body;

        // Kiểm tra dữ liệu
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }

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
        res.status(400).json({
            message: error,
        });
    }
};
export const restore = async (req: Request, res: Response) => {
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
