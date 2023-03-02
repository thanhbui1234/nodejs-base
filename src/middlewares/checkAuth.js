import jwt from "jsonwebtoken";

export const checkPermission = async (req, res, next) => {
    try {
        // kiểm tra xem user có đăng nhập không
        if (!req.headers.authorization) {
            throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
        }

        // lấy jwt token từ header
        const token = req.headers.authorization.split(" ")[1];

        // xác thực jwt token
        const decodedToken = jwt.verify(token, "mysecretkey");

        // lấy thông tin user từ database
        const user = await User.findById(decodedToken.userId);

        // kiểm tra xem user có đủ quyền để thực hiện hành động đó không
        if (!user.isAdmin) {
            throw new Error("Bạn không có quyền để thực hiện hành động này");
        }

        // lưu thông tin user vào request để sử dụng trong các middleware khác
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
