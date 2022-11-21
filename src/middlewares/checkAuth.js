import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
    secret: "123456",
    algorithms: ["HS256"],
});
