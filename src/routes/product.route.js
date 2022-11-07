import express from "express";

const router = express.Router();

const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
];

router.get("/products", (req, res) => {
    res.json(products);
});

// api chi tiet san pham
router.get("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const product = products.find((item) => {
            return item.id == id;
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Product not found",
        });
    }
});

router.post("/products", (req, res) => {
    try {
        const product = req.body;
        products.push(product);
        res.json(product);
    } catch (error) {
        res.status(400).json({
            messsage: "Không thêm được sản phẩm",
        });
    }
});
router.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = req.body;

    // Tìm sản phẩm trong mảng, và cập nhật ( nếu cùng ID ngược lại thì bỏ qua)
    const newProducts = products.map((item) => (item.id == id ? product : item));

    // Tìm sản phẩm trong mảng mới, và trả về
    const currentProduct = newProducts.find((item) => item.id == id);
    res.json(currentProduct);
});
router.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    // trả về 1 mảng mới, không bao gồm sản phẩm có id gửi lên
    res.json(products.filter((item) => item.id != id));
});

export default router;
