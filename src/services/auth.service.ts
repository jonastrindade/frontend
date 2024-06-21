import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

export const register = (full_name: string, email: string, password: string) => {
  return axios.post("http://localhost:3000/api/v1/users", 
    {
      user:
        {
          full_name,
          email,
          password,
        }
    }
  );
};

export const login = (email: string, password: string) => {
  return axios
    .post("http://localhost:3000/api/v1/authentications/login", 
    {
      user:
        {
          email,
          password,
        }
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
