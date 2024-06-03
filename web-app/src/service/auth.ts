import { api, setApiToken } from "@/service/api";
import { AxiosResponse } from "axios";
import { errorHandler } from "@/service/errorHandler";
import CookieService from "./storage/CookieService";
import LocalStorageService from "./storage/LocalStorageService";

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

class Auth {
  private static _instance: Auth | null = null;
  private storage: LocalStorageService;
  private _user: IUser | null;
  private _token: string | null;
  private _refreshToken: string | null;
  private _isAuthenticated: boolean;

  private constructor() {
    this.storage = new LocalStorageService();
    this._user = null;
    this._token = null;
    this._refreshToken = null;
    this._isAuthenticated = false;

    // this.getUserLoginFromStorage();
  }

  public static getAuth(): Auth {
    if (!this._instance) this._instance = new Auth();

    return this._instance;
  }

  public get user() {
    return this._user;
  }

  public set user(body: IUser | string | null) {
    if (typeof body === "string") body = JSON.parse(body);
    this._user = body as typeof this._user;
  }

  public get token() {
    return this._token;
  }

  public set token(body: string | null) {
    this._token = body;
  }

  public get refreshToken() {
    return this._refreshToken;
  }

  public set refreshToken(body: string | null) {
    this._refreshToken = body;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  private resetVariables = () => {
    this.user = null;
    this.token = null;
    this.refreshToken = null;
    this.isAuthenticated = false;
  };

  private getUserLoginFromStorage(): boolean {
    const user = this.storage.getItem("user");
    const token = this.storage.getItem("token");

    if (!user || !token) return false;

    // Set api header Authorization
    setApiToken(token);

    // Set class values
    this.user = user;
    this.token = token;
    this.isAuthenticated = true;

    return true;
  }

  private getUserFromApi = async (
    body: ILoginCredentials | ILoginWithRefreshToken
  ): Promise<ILoginResponse> => {
    let endpoint = "/session/login";

    // Change endpoint if using refreshToken
    if (body.hasOwnProperty("refreshToken")) endpoint = "/session/refresh";

    // Get session token
    const response = (await api.post(
      endpoint,
      body
    )) as AxiosResponse<ILoginResponse>;

    // Check response status
    if (response.status !== 200) throw new Error("Server failed to login");
    return response.data;
  };

  public login = async (body: ILoginCredentials | ILoginWithRefreshToken) => {
    try {
      const { user, token, refreshToken } = await this.getUserFromApi(body);

      //Set axios default header
      setApiToken(`Bearer ${token}`);

      // TODO colocar COOKIES dentro de um serviço
      //Save data on browser
      // this.storage.setItem("user", JSON.stringify(user));
      // this.storage.setItem("token", `Bearer ${token}`);
      // this.storage.setItem("refreshToken", refreshToken);

      //Set States
      this.user = user;
      this.token = token;
      this.refreshToken = refreshToken;
      this.isAuthenticated = true;

      console.log(this);

      return { user, token, isAuthenticated: true };
    } catch (error) {
      console.log(error);
      errorHandler(error, "Failed to login. Try Agane.");
    }
  };

  public logout = async () => {
    try {
      localStorage.delItem("user");
      localStorage.delItem("token");
      localStorage.delItem("refreshToken");

      this.resetVariables();
      setApiToken("");

      return Response.redirect(new URL("/"));
    } catch (error) {
      errorHandler(error, "Failed to logout. Try Agane.");
    }
  };
}

export { Auth };
