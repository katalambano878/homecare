"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/config/brand";

export function Footer() {
    const pathname = usePathname();
    
    // Format the pathname for the breadcrumb
    const getBreadcrumbName = () => {
        if (pathname === "/") return "Compassionate In-Home Senior Care";
        if (pathname === "/alzheimers-care") return "Alzheimer's Care";
        if (pathname === "/24-hour-home-care") return "24-Hour Care";
        if (pathname === "/elderly-companion-care") return "Companion Care";
        if (pathname === "/dementia-care") return "Dementia Care";
        if (pathname === "/end-of-life-care") return "End of Life Care";
        if (pathname === "/live-in-care") return "Live-In Care";
        if (pathname === "/palliative-care") return "Palliative Care";
        if (pathname === "/parkinsons-care") return "Parkinson's Care";
        if (pathname === "/personal-care") return "Personal Care";
        if (pathname === "/respite-care") return "Respite Care";
        if (pathname === "/transition-home-care") return "Transition to Home Care";
        if (pathname === "/veterans-care") return "Veterans In-Home Care";
        if (pathname === "/how-to-get-started") return "How to Get Started with Home Care";
        if (pathname === "/caregivers") return "Caregivers";
        if (pathname === "/fall-prevention") return "Fall Prevention for Seniors";
        if (pathname === "/give-us-a-review") return "Give Us A Review";
        if (pathname === "/guide-model-program") return "GUIDE Model Program";
        if (pathname === "/home-care-costs") return "Home Care Costs";
        if (pathname === "/home-care-faqs") return "Home Care FAQs";
        if (pathname === "/how-we-assist") return "How We Assist";
        if (pathname === "/long-distance-care-giving") return "Long Distance Care Giving";
        if (pathname === "/our-reviews") return "Our Reviews";
        if (pathname === "/veterans-benefits") return "Veterans Benefits";
        if (pathname === "/articles") return "Articles";
        if (pathname === "/employment") return "Caregiver Jobs";
        if (pathname === "/contact-us") return "Contact Us";
        
        // Remove leading slash and split by slash
        const parts = pathname.substring(1).split('/');
        const lastPart = parts[parts.length - 1];
        
        // Format the string: replace dashes with spaces and capitalize words
        return lastPart
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <footer className="w-full mt-auto text-white" style={{ backgroundColor: '#043b67' }}>
            <div className="container mx-auto px-5 sm:px-6 lg:px-6 xl:px-8 max-w-[1440px] pt-8 md:pt-12 pb-8 md:pb-12">
                <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-8 lg:gap-0">
                    
                    {/* Left Side: Brand, Address, Phone, Links */}
                    <div className="lg:w-2/3">
                        <div className="flex items-center text-[13px] md:text-[14px] text-white mb-6 font-sans tracking-wide">
                            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-3"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
                            </Link>
                            <span className="mr-3 text-[12px] opacity-100 font-bold">&gt;</span>
                            {getBreadcrumbName()}
                        </div>

                        <div className="mb-6 font-sans">
                            <h3 className="font-bold text-[18px] md:text-[20px] mb-[2px]">MidAid</h3>
                            <p className="text-[14.5px] md:text-[15.5px] text-white">
                                Suite 17/89-97 Jones Street, Ultimo, NSW 2007 Australia
                            </p>
                            <p className="text-[14.5px] md:text-[15.5px] text-white">{brand.contact.address.abn}</p>
                            <a href="mailto:info.help@midaid.com" className="text-[14px] text-white/80 hover:text-white transition-colors">info.help@midaid.com</a>
                        </div>

                        <div className="mb-6 md:mb-8 flex flex-col items-start gap-1">
                            <a href={`tel:${brand.contact.phone}`} className="text-[22px] sm:text-[26px] md:text-[32px] font-bold tracking-tight hover:opacity-90 transition-opacity font-sans" style={{ color: '#dca626' }}>
                                {brand.contact.phoneDisplay}
                            </a>
                            <a href={`tel:${brand.contact.phoneAlt}`} className="text-[18px] sm:text-[20px] md:text-[24px] font-bold tracking-tight hover:opacity-90 transition-opacity font-sans" style={{ color: '#dca626' }}>
                                {brand.contact.phoneAltDisplay}
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] md:text-[15.5px] font-medium tracking-wide mt-2">
                            <Link href="#" className="underline decoration-1 underline-offset-[3px] hover:text-white/80 transition-colors font-semibold">MidAid UK</Link>
                            <span className="hidden md:inline text-white/40">|</span>
                            <Link href="#" className="underline decoration-1 underline-offset-[3px] hover:text-white/80 transition-colors font-semibold">Germany</Link>
                            <span className="hidden md:inline text-white/40">|</span>
                            <Link href="#" className="underline decoration-1 underline-offset-[3px] hover:text-white/80 transition-colors font-semibold">Canada</Link>
                            <span className="hidden md:inline text-white/40">|</span>
                            <Link href="#" className="underline decoration-1 underline-offset-[3px] hover:text-white/80 transition-colors font-semibold">New Zealand</Link>
                            <span className="hidden md:inline text-white/40">|</span>
                            <Link href="#" className="underline decoration-1 underline-offset-[3px] hover:opacity-80 transition-colors font-semibold" style={{ color: '#dca626' }}>Senior Home Care By MidAid Australia</Link>
                        </div>
                    </div>

                    {/* Right Side: Social Icons, Buttons */}
                    <div className="lg:w-1/3 flex flex-col items-start lg:items-end">
                        <div className="w-full max-w-[240px] lg:max-w-[210px] flex flex-col gap-6">
                            {/* Social Icons */}
                            <div className="flex items-center space-x-4 h-[22px]">
                                <a href="#" className="hover:opacity-80 transition-opacity flex items-center" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity flex items-center" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity flex items-center" aria-label="X (Twitter)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity flex items-center" aria-label="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="-ml-[2px] mt-[1px]"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#043b67"/></svg>
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity flex items-center mt-[1px]" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.225 0H1.77C.792 0 0 .774 0 1.73v20.536C0 23.23.792 24 1.77 24h20.451C23.2 24 24 23.23 24 22.266V1.73C24 .774 23.2 0 22.222 0h.003zM7.12 20.452H3.558V9H7.12v11.452zM5.34 7.434a2.064 2.064 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zm15.112 13.018h-3.558v-5.57c0-1.326-.024-3.037-1.848-3.037-1.85 0-2.133 1.448-2.133 2.944v5.663H9.356V9h3.414v1.566h.048c.476-.9 1.637-1.85 3.37-1.85 3.606 0 4.267 2.372 4.267 5.455v6.28z"/></svg>
                            </a>
                        </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-[14px] w-full mt-2 mb-2">
                                <Link 
                                    href="#"
                                    className="block w-full text-center transition-opacity hover:opacity-90 rounded-[4px] py-[13px] font-bold text-[14.5px]"
                                    style={{ backgroundColor: '#dca626', color: '#000000' }}
                                >
                                    Our Foundation
                                </Link>
                                <Link 
                                    href="#"
                                    className="block w-full text-center transition-opacity hover:opacity-90 rounded-[4px] py-[13px] font-bold text-[14.5px]"
                                    style={{ backgroundColor: '#dca626', color: '#000000' }}
                                >
                                    Start A Franchise
                                </Link>
                                <Link 
                                    href="/workers-roster"
                                    className="block w-full text-center transition-opacity hover:opacity-90 rounded-[4px] py-[13px] font-bold text-[14.5px] border-2 border-white/30 text-white hover:bg-white/10"
                                >
                                    Workers Roster
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Legal / Disclaimer on White Background */}
            <div className="w-full bg-white text-black pt-8 md:pt-12 pb-10 md:pb-16 px-4 lg:px-6 xl:px-8 relative z-20">
                <div className="text-center font-sans text-[11px] sm:text-[12.5px] text-[#333333] leading-[1.8] max-w-[1000px] mx-auto space-y-3 md:space-y-4">
                    <p className="italic">
                        Not all services are available at all locations. Please check with your <Link href="#" className="underline text-[#3b7ea1] hover:text-[#043b67] transition-colors">local agency</Link>.
                    </p>
                    <p>
                        Each MidAid agency is a franchise that is independently owned and operated.
                        <br />
                        The Franchisor, Living Assistance Services Inc., does not control or manage the day to day business operations of any MidAid franchised agency.
                    </p>
                    <p>
                        &copy;{new Date().getFullYear()} MidAid is a registered trademark of Living Assistance Services, Inc.
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-2 text-[#3b7ea1] font-medium pt-2">
                        <Link href="#" className="underline decoration-1 underline-offset-2 hover:text-[#043b67] transition-colors">Privacy Policy</Link>
                        <span className="text-[#333333]">|</span>
                        <Link href="#" className="underline decoration-1 underline-offset-2 hover:text-[#043b67] transition-colors">Terms and Conditions</Link>
                        <span className="text-[#333333]">|</span>
                        <Link href="#" className="underline decoration-1 underline-offset-2 hover:text-[#043b67] transition-colors">Web Accessibility Statement</Link>
                        <span className="text-[#333333]">|</span>
                        <Link href="#" className="underline decoration-1 underline-offset-2 hover:text-[#043b67] transition-colors">Portal</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
