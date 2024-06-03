import {
  RequestCookies,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";

export type CookieFieldsType =
  | "user"
  | "token"
  | "refreshToken"
  | "isAuthenticated";

class CookieService {
  private cookie: ResponseCookies;

  constructor(cookie: ResponseCookies) {
    this.cookie = cookie;
  }

  private parseStorageProp = (name: string) => {
    const storagePrefix = "@MeetAiCookie:";
    const fullPrefix = `${storagePrefix}${name}`;
    return fullPrefix;
  };

  getItem(field: CookieFieldsType) {
    const content = this.cookie.get(this.parseStorageProp(field));
    return content?.value;
  }

  setItem = (field: CookieFieldsType, value: any) => {
    const item = this.cookie.set({ name: this.parseStorageProp(field), value });
    return item;
  };

  delItem = (field: CookieFieldsType): ResponseCookies => {
    const item = this.cookie.delete(this.parseStorageProp(field));
    return item;
  };
}

export default CookieService;
