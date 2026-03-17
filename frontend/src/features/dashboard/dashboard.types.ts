// Định nghĩa cấu trúc cho từng mục
export interface RevenueChartData {
    date: string;
    revenue: number;
}

export interface CategoryChartData {
    name: string;
    value: number;
}

export interface BestSeller {
    _id?: string;
    name?: string;
    productName?: string; // Tùy theo API của bạn trả về key nào
    revenue?: number;
    totalSales?: number;
    price?: number;
}

// Định nghĩa cấu trúc tổng cho API Stats
export interface AdminStats {
    revenue: number;
    products: number;
    customers: number;
    orders: number;
    revenueChart: RevenueChartData[];
    categoryChart: CategoryChartData[];
    bestSellers: BestSeller[];
}