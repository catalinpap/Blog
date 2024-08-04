import type { Metadata } from "next";
import { Inter, Raleway, Yellowtail } from "next/font/google";
import "../globals.css";
import { Footer, Header } from "../components";


const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({subsets: ["latin"]});
const yellowtail = Yellowtail({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}