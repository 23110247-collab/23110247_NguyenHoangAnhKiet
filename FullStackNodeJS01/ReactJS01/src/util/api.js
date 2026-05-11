import instance from "./axios.customize";

// ─── Auth APIs ───────────────────────────────────────────────────────────
export const registerAPI = (username, email, password) => {
  return instance.post("/register", { username, email, password });
};

export const loginAPI = (email, password) => {
  return instance.post("/login", { email, password });
};

// ─── User APIs ───────────────────────────────────────────────────────────
export const getAccountAPI = () => {
  return instance.get("/account");
};

export const getAllUsersAPI = () => {
  return instance.get("/users");
};

// ─── Forgot Password APIs ────────────────────────────────────────────────
export const sendOTPAPI = (email) => {
  return instance.post("/forgot-password/send-otp", { email });
};

export const verifyOTPAPI = (email, otp) => {
  return instance.post("/forgot-password/verify-otp", { email, otp });
};

export const resetPasswordAPI = (email, otp, newPassword) => {
  return instance.post("/forgot-password/reset-password", {
    email,
    otp,
    newPassword,
  });
};
