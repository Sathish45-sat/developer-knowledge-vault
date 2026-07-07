import api from "../api/axiosConfig";

const register = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export default { register, login };