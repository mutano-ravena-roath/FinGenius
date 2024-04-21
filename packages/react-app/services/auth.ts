import cookie from "react-cookies";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authService = {
  signUp: async (body: {
    wallet: string;
  }): Promise<{ access_token: string; newUser: boolean }> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/signup`, body);

      const pastToken = cookie.load("token");

      if (pastToken) {
        cookie.remove("token");
      }

      cookie.save("token", response.data.access_token, {});

      return response.data;
    } catch (error: any) {
      return error;
    }
  },
};

export default authService;
