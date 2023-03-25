import Category from "../models/product";

export const get = async (req, res) => {
    const categoryId = req.params.id;
    const options = {
        page: req.query._page || 1,
        limit: req.query._limit || 10,
        sort: { [req.query._sort || "createdAt"]: req.query._order === "desc" ? -1 : 1 },
    };
    const populateOptions = req.query._embed ? [{ path: "categoryId", select: "name" }] : [];

    try {
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        const result = await Product.paginate(
            { categoryId },
            { ...options, populate: populateOptions }
        );

        if (result.docs.length === 0) {
            return res.status(404).json({
                message: "No products found in this category",
            });
        }
        if (req.query._embed) {
            return res.status(200).json({
                data: {
                    category,
                    products: result.docs,
                },
                pagination: {
                    currentPage: result.page,
                    totalPages: result.totalPages,
                    totalItems: result.totalDocs,
                },
            });
        } else {
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
