"use client";

import * as React from "react";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { typesOfCareNav, homeCareInfoNav } from "./Header";
import { brand } from "@/config/brand";

export function UtilityBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleLinkClick = () => setIsOpen(false);

    return (
        <div className="text-white py-[6px] relative z-50" style={{ backgroundColor: '#275596' }}>
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-5 md:px-6 max-w-7xl">
                {/* Left: Phone */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <a href={`tel:${brand.contact.phone}`} className="flex items-center text-[16px] sm:text-[15px] font-bold hover:opacity-80 transition-opacity tracking-wide">
                        <span>{brand.contact.phoneDisplay}</span>
                    </a>
                    <span className="text-white/50" aria-hidden="true">|</span>
                    <a href={`tel:${brand.contact.phoneAlt}`} className="flex items-center text-[16px] sm:text-[15px] font-bold hover:opacity-80 transition-opacity tracking-wide">
                        <span>{brand.contact.phoneAltDisplay}</span>
                    </a>
                </div>

                {/* Right: Social Icons (Desktop) & Hamburger (Mobile) */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Social Icons - Hidden on small mobile */}
                    <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
                        <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="sm:hidden flex items-center">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <button className="text-white hover:opacity-80 p-1" aria-label="Toggle menu">
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-white w-[300px] overflow-y-auto text-[#333333]">
                                <div className="flex flex-col space-y-2 mt-8">
                                    <Link href="/office-locator" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#5cb3b1] uppercase text-[#1b3664] py-3">
                                        Find Care
                                    </Link>
                                    <Link href="/about-us" onClick={handleLinkClick} className="text-lg font-medium text-[#5cb3b1] uppercase py-3">
                                        About Us
                                    </Link>
                                    <div className="pt-2 pb-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Types of Care</span>
                                        <div className="flex flex-col mt-2 space-y-1 pl-2 border-l-2 border-gray-100">
                                            {typesOfCareNav.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={handleLinkClick}
                                                    className="text-[15px] font-medium text-[#1b3664] hover:text-[#5cb3b1] py-2 normal-case"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-2 pb-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Home Care Info</span>
                                        <div className="flex flex-col mt-2 space-y-1 pl-2 border-l-2 border-gray-100">
                                            {homeCareInfoNav.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={handleLinkClick}
                                                    className="text-[15px] font-medium text-[#1b3664] hover:text-[#5cb3b1] py-2 normal-case"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <Link href="/articles" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#5cb3b1] uppercase text-[#1b3664] py-3">
                                        Articles
                                    </Link>
                                    <Link href="/workers-roster" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#5cb3b1] uppercase text-[#1b3664] py-3">
                                        Staff Roster
                                    </Link>
                                    <Link href="/employment" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#5cb3b1] uppercase text-[#1b3664] py-3">
                                        Caregiver Jobs
                                    </Link>
                                    <Link href="/contact-us" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#5cb3b1] uppercase text-[#1b3664] py-3">
                                        Contact Us
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
}
