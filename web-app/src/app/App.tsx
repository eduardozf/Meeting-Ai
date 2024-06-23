// App.tsx
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import CookieService from "@/service/storage/CookieService";

// TODO remover
function MyApp({ Component, pageProps }: AppProps) {
  const [cookieService, setCookieService] = useState<CookieService | null>(
    null
  );

  useEffect(() => {
    // Obter cookies do servidor ou do cliente
    const cookies = document.cookie || pageProps.cookies; // Usando pageProps.cookies para cookies no servidor

    // Inicializar o serviço de cookies
    const service = new CookieService(cookies);
    setCookieService(service);
  }, [pageProps.cookies]); // Adicionando pageProps.cookies como dependência

  return (
    <>
      {cookieService && (
        <Component {...pageProps} cookieService={cookieService} />
      )}
    </>
  );
}

export default MyApp;
