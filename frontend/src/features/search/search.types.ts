import { IProduct } from "@/features/product/product.types";

export interface ISearchState {
    keyword: string;
    results: IProduct[];
    totalResults: number;
    isLoading: boolean;
}