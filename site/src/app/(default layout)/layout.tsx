import { Footer, DefaultHeader } from "@/components";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <DefaultHeader/>
                {children}
            <Footer/>
        </>
    );
  }