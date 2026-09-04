import api from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "@/lib/data";

export const authApi = {
  async register(data: RegisterPayload) {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  async login(data: LoginPayload) {
    const res = await api.post("/auth/login", data);
    if (res.data.token) {
      document.cookie = `token=${res.data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
    }
    return res.data;
  },

  async getCurrentUser() {
    const res = await api.get("/auth/profile");
    return res.data;
  },

   async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await api.post("/auth/change-password", data);
  },
   
   async forgotPassword(email: string): Promise<void> {
    await api.post("/auth/forgot-password", { email });
  },

   async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post("/auth/reset-password", { token, newPassword });
  },
};
