import * as yup from "yup";

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().min(0),
    description: yup.string(),
    categoryId: yup.string().required(),
    createdAt: yup.date().default(() => new Date()),
    updatedAt: yup.date().default(() => new Date()),
    deletedAt: yup.date().default(null),
    deleted: yup.boolean().default(false),
});

export const categoryProductSchema = yup.object().shape({
    name: yup.string().trim().required(),
    description: yup.string().required(),
    products: yup.array().of(
        yup
            .string()
            // regular expression để validate ObjectId.
            //
            .matches(/^[0-9a-fA-F]{24}$/)
            .required()
    ),
});
