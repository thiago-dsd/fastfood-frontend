import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "FastFood",
  description: "Uma forma prática de pedir comida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-br">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
