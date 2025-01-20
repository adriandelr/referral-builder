import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReferralsProvider } from "../contexts/referralsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReferralsProvider>
      <Component {...pageProps} />
    </ReferralsProvider>
  );
}
