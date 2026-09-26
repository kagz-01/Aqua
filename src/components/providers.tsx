import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 8_000, refetchOnWindowFocus: false, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "!bg-paper !text-ink !border-border !shadow-[var(--shadow-lift)] !font-sans",
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
