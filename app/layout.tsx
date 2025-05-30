import type {Metadata} from "next";
import {Quicksand} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/sonner";

const quicksand = Quicksand({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Converso",
    description: "Ai LMS SaaS App",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${quicksand.className} antialiased overflow-x-hidden`}>
        <ClerkProvider appearance={{variables: {colorPrimary: "#fe5933"}}}>
            <Navbar/>
            {children}
            <Toaster/>
        </ClerkProvider>
        </body>
        </html>
    );
}
