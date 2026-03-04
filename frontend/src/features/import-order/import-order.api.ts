import axiosInstance from "@/lib/axiosInstance";
import { CreateImportOrderPayload, PaginatedImportOrder } from "../import-order/import-order.types";

export const importOrderApi = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const res = await axiosInstance.get('/import-orders', { params: { page, limit, search } });
    return res.data.data;
  },
  create: async (data: CreateImportOrderPayload) => {
    const res = await axiosInstance.post('/import-orders', data);
    return res.data.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`/import-orders/${id}`);
  }
};