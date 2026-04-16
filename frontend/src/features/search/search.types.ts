import { IProduct } from "@/features/product/product.types";

export interface IVisualSearchResponse extends IProduct {
    score: number; // Điểm tương đồng AI
}