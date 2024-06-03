import LocalStorageService, {
  localStorageProps,
} from "@/service/LocalStorageService";
import { api } from "@/service/api";
import React, { createContext, useState, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { errorHandler } from "@/service/errorHandler";

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser;
  Login(credentials: ILoginCredentials): Promise<void>;
  Logout(): Promise<void>;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

interface ILoginWithRefreshToken {
  refreshToken: string;
}

interface ILoginResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}

interface IAuthState {
  user: IUser;
  token: string;
  isAuthenticated: boolean;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
}

interface AuthProvider {
  children: React.ReactElement;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: AuthProvider) => {
  const localStorage = new LocalStorageService();
  const router = useRouter();

  const [authState, setAuthState] = useState(() => {
    const items: localStorageProps[] = ["user", "token"];
    const localItems = localStorage.getItem(items);

    if (localItems?.length === items.length) {
      const [user, token] = items;

      api.defaults.headers.common["Authorization"] = token;
      return { user: JSON.parse(user), token, isAuthenticated: true };
    }
    return {} as IAuthState;
  });

  const getUserFromApi = useCallback(
    async (
      body: ILoginCredentials | ILoginWithRefreshToken
    ): Promise<ILoginResponse> => {
      let endpoint = "/session/login";

      if (body.hasOwnProperty("refreshToken")) endpoint = "/session/refresh";

      // Get session token
      const response = (await api.post(
        endpoint,
        body
      )) as AxiosResponse<ILoginResponse>;

      // Check response status
      if (response.status !== 200) throw new Error("Server failed to login");
      return response.data;
    },
    []
  );

  const Login = useCallback(
    async (body: ILoginCredentials | ILoginWithRefreshToken) => {
      try {
        const { user, token, refreshToken } = await getUserFromApi(body);

        //Set axios default header
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        //Save data on browser local storage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", `Bearer ${token}`);
        localStorage.setItem("refreshToken", refreshToken);

        //Set States
        setAuthState({
          token,
          user,
          isAuthenticated: true,
        });

        router.push("/");
      } catch (error) {
        errorHandler(error, "Failed to login. Try agane.");
      }
    },
    []
  );

  const Logout = useCallback(async () => {
    try {
      localStorage.delItem("user");
      localStorage.delItem("token");
      localStorage.delItem("refreshToken");
      setAuthState({} as IAuthState);
      api.defaults.headers.common["Authorization"] = "";
      router.push("/login");
    } catch (error) {
      errorHandler(error, "Failed to logout. Try agane.");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Não foi possível utilizar o contexto pois não foi inserido um AuthProvider anteriormente!"
    );
  }
  return context;
}

export default useAuth;
