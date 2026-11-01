export function OrganizationJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HomeHealthCareService",
        name: "MidAid",
        alternateName: "MidAid Home Care Services",
        url: "https://midaid.com",
        logo: "https://midaid.com/images/midaid-logo.png",
        image: "https://midaid.com/images/og-image.png",
        description: "MidAid provides compassionate, professional in-home senior care across Australia. Our experienced caregivers help your loved ones thrive at home with dignity and independence.",
        telephone: ["+61489987299", "+61489986778"],
        email: "info.help@midaid.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Suite 17/89-97 Jones Street",
            addressLocality: "Ultimo",
            addressRegion: "NSW",
            postalCode: "2007",
            addressCountry: "AU",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -33.8794,
            longitude: 151.1989,
        },
        areaServed: {
            "@type": "Country",
            name: "Australia",
        },
        serviceType: [
            "Home Care",
            "Senior Care",
            "Companion Care",
            "Dementia Care",
            "Alzheimer's Care",
            "Personal Care",
            "Respite Care",
            "Palliative Care",
            "Live-In Care",
            "24-Hour Care",
        ],
        sameAs: [],
        priceRange: "$$",
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function WebSiteJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "MidAid",
        url: "https://midaid.com",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://midaid.com/articles?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
