import type { Metadata } from "next";
import NavBar from "./_components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedEval",
  description: "Embrace the Chaos",
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}

export default RootLayout