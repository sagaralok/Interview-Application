import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(email: string, password: string): Promise<any> {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response: AxiosResponse<any>) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          setTimeout(() => {
            localStorage.clear();
          }, remainingMilliseconds);
        }

        return response.data;
      });
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  register(name: string, email: string, password: string): Promise<any> {
    return axios.put(API_URL + "signup", {
      name,
      email,
      password,
    });
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();
