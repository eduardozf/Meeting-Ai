export type localStorageProps = "user" | "token" | "refreshToken";

class LocalStorageService {
  private parseStorageProp = (name: string) => {
    const storagePrefix = "@MeetAi:";
    const fullPrefix = `${storagePrefix}${name}`;
    return fullPrefix;
  };

  getItem(prop: localStorageProps): string;
  getItem(props: localStorageProps[]): string[];

  getItem(
    propOrProps: localStorageProps | localStorageProps[]
  ): string | string[] {
    if (Array.isArray(propOrProps)) {
      const items = propOrProps.map((prop) => this.getItem(prop));
      return items;
    } else {
      const item = localStorage.getItem(this.parseStorageProp(propOrProps));
      return item ?? "";
    }
  }

  setItem = (prop: localStorageProps, value: string): void => {
    const item = localStorage.setItem(this.parseStorageProp(prop), value);
    return item;
  };

  delItem = (prop: localStorageProps): void => {
    const item = localStorage.removeItem(this.parseStorageProp(prop));
    return item;
  };
}

export default LocalStorageService;
