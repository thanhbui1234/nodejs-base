import express from "express";

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
];

app.get("/products", (req, res) => {
    res.json(products);
});
app.get("/products/:id", (req, res) => {
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

app.post("/products", (req, res) => {
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
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = req.body;

    /**
     * id = 1, name = "A update"
     * 1 { name: "A "} //
     * 2 { name: "B"}
     * 3 { name: "C"}
     * 4 { name: "D"}
     *
     * 1 { name: "A update "} //
     * 2 { name: "B"}
     * 3 { name: "C"}
     * 4 { name: "D"}
     */
    // Tìm sản phẩm trong mảng, và cập nhật ( nếu cùng ID ngược lại thì bỏ qua)
    const newProducts = products.map((item) => (item.id == id ? product : item));

    // Tìm sản phẩm trong mảng mới, và trả về
    const currentProduct = newProducts.find((item) => item.id == id);
    res.json(currentProduct);
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    // trả về 1 mảng mới, không bao gồm sản phẩm có id gửi lên
    res.json(products.filter((item) => item.id != id));
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
