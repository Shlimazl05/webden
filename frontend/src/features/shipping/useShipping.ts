// D:\webden\frontend\src\features\shipping\useShipping.ts
import { useState, useEffect } from 'react';
import { shippingApi } from './shipping.api';

export const useShipping = () => {
    const [rules, setRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRules = async () => {
        setIsLoading(true);
        try {
            const json = await shippingApi.getRules();
            if (json.success) {
                setRules(json.data);
            }
        } catch (err) {
            console.error("Lỗi lấy danh sách phí ship:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const addRule = async (data: any) => {
        try {
            const json = await shippingApi.createRule(data);
            if (json.success) fetchRules();
        } catch (err) {
            console.error("Lỗi thêm phí ship:", err);
        }
    };

    const deleteRule = async (id: string) => {
        try {
            const json = await shippingApi.deleteRule(id);
            if (json.success) fetchRules();
        } catch (err) {
            console.error("Lỗi xóa phí ship:", err);
        }
    };

    return { rules, addRule, deleteRule, isLoading };
};