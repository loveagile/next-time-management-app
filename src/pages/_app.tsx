import "@/styles/tailwind.css";
import type { AppProps } from "next/app";
import { SchedulesProvider } from "../provider/SchedulesProvider";
import { EventsProvider } from "../provider/EventsProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SchedulesProvider>
      <EventsProvider>
        <Component {...pageProps} />
      </EventsProvider>
    </SchedulesProvider>
  );
}
