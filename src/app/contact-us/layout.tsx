import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with MidAid for home care inquiries, employment opportunities, or general questions. Call 0489 987 299 or +61 489 986 778, or fill out our contact form.",
    openGraph: {
        title: "Contact Us | MidAid",
        description: "Get in touch with MidAid for home care inquiries, employment opportunities, or general questions.",
        images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
