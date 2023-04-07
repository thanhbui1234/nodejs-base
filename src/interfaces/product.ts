export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
}
export interface IProductResponse {
    data: IProduct[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}