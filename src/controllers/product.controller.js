import Product from "../models/product";

export const list = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
export const read = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        res.status(200).json({
            data: product,
        });

        // const product = products.find((item) => {
        //     return item.id == id;
        // });
        // res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Product not found",
        });
    }
};
export const add = async (req, res) => {
    try {
        const body = req.body;
        const product = await new Product(body).save();
        return res.status(200).json({
            product,
        });
    } catch (error) {
        res.status(400).json({
            messsage: "Không thêm được sản phẩm",
        });
    }
};
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const product = await Product.findOneAndUpdate({ _id: id }, body, { new: true });

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({
            messsage: "Không cap nhat được sản phẩm",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOneAndDelete({ _id: id });
        res.status(200).json({
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            message: "Xoa san pham khong thanh cong",
        });
    }
};
// feat: create product API
// fix: API create product
// style: button global
// refactor: product controller
