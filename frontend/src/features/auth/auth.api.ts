import axiosInstance from "@/lib/axiosInstance";
import { AUTH_ENDPOINTS } from "@/constants/api.contants";
import { RegisterInput, AuthResponse } from "./auth.types";
import { LoginInput } from "./auth.types";

export const registerApi = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, data);
  return response.data;
};

export const loginApi = async (data: LoginInput) => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
  return response.data; // Trả về { message, data: { token, user } }
};