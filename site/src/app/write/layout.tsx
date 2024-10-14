import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};


export default function WritePageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        {children}
      </>
          
    );
}