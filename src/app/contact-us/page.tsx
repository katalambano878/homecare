"use client";

import { useState } from "react";
import Link from "next/link";
import { Newsletter } from "@/components/marketing/Newsletter";
import { FloatingGetStarted } from "@/components/layout/FloatingGetStarted";
import { brand } from "@/config/brand";

export default function ContactUsPage() {
    const [interest, setInterest] = useState<"home-care" | "employment">("home-care");
    const [isCellPhone, setIsCellPhone] = useState<boolean | null>(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name, email, phone,
                    care_type: interest === "home-care" ? "Home Care Services" : "Employment Opportunities",
                    is_cell_phone: isCellPhone,
                }),
            });
            if (res.ok) { setSubmitted(true); setName(""); setPhone(""); setEmail(""); }
        } catch { /* silent */ }
        setSubmitting(false);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header Banner */}
            <div className="w-full bg-[#f0f9fb] py-10 sm:py-14 md:py-24 relative overflow-hidden text-center flex flex-col items-center">
                {/* Wavy Background Pattern */}
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 20 Q 25 0, 50 20 T 100 20\' fill=\'none\' stroke=\'%233b7ea1\' stroke-width=\'2\'/%3E%3C/svg%3E")', backgroundSize: '100px 40px' }}></div>
                
                <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-3xl">
                    <h1 className="text-[28px] sm:text-[36px] md:text-[46px] font-bold text-[#043b67] font-sans tracking-tight mb-4 sm:mb-6">
                        Contact Us
                    </h1>
                    <p className="text-[16.5px] text-[#333333] mb-4 leading-relaxed">
                        If you have a general question or want to provide helpful feedback regarding your
                        local MidAid, please email <a href="mailto:info.help@midaid.com" className="text-[#3b7ea1] hover:text-[#043b67] hover:underline">info.help@midaid.com</a>{" "}
                        or call{" "}
                        <a href={`tel:${brand.contact.phone}`} className="text-[#3b7ea1] hover:text-[#043b67] hover:underline">{brand.contact.phoneDisplay}</a>
                        {" "}or{" "}
                        <a href={`tel:${brand.contact.phoneAlt}`} className="text-[#3b7ea1] hover:text-[#043b67] hover:underline">{brand.contact.phoneAltDisplay}</a>.
                    </p>
                    <p className="text-[16.5px] text-[#333333] leading-relaxed">
                        For Franchise Opportunities, <a href="#" className="text-[#3b7ea1] hover:text-[#043b67] hover:underline">click here.</a>
                    </p>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] -mt-8 relative z-20 mb-12 sm:mb-16 md:mb-24">
                <div className="bg-white rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
                    
                    {/* Dark Blue Header */}
                    <div className="bg-[#043b67] py-8 px-6 text-center">
                        <h2 className="text-[26px] md:text-[30px] font-bold text-white font-sans tracking-tight mb-8">
                            What Are You Interested In?
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                            <button 
                                onClick={() => setInterest("home-care")}
                                className={`flex items-center justify-center py-3.5 px-6 rounded-[4px] font-bold text-[15px] transition-colors w-full sm:w-1/2
                                    ${interest === "home-care" 
                                        ? "bg-[#dca626] text-[#043b67]" 
                                        : "bg-[#032a4a] text-white hover:bg-[#022038]"}`}
                            >
                                <span className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${interest === "home-care" ? "border-[#043b67]" : "border-white"}`}>
                                    {interest === "home-care" && <span className="w-2 h-2 rounded-full bg-[#043b67]"></span>}
                                </span>
                                Home Care Services
                            </button>
                            <button 
                                onClick={() => setInterest("employment")}
                                className={`flex items-center justify-center py-3.5 px-6 rounded-[4px] font-bold text-[15px] transition-colors w-full sm:w-1/2
                                    ${interest === "employment" 
                                        ? "bg-[#dca626] text-[#043b67]" 
                                        : "bg-[#032a4a] text-white hover:bg-[#022038]"}`}
                            >
                                <span className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${interest === "employment" ? "border-[#043b67]" : "border-white"}`}>
                                    {interest === "employment" && <span className="w-2 h-2 rounded-full bg-[#043b67]"></span>}
                                </span>
                                Employment Opportunities
                            </button>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-5 sm:p-8 md:p-12">
                        <p className="text-[14px] text-[#666666] mb-8">
                            Items marked with <span className="text-red-500">*</span> are required.
                        </p>

                        <form className="space-y-6" onSubmit={handleContactSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[15px] text-[#333333]">
                                        Your Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 outline-none focus:border-[#3b7ea1] text-[15px]" 
                                    />
                                </div>
                                
                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-[15px] text-[#333333]">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="tel" 
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 outline-none focus:border-[#3b7ea1] text-[15px]" 
                                    />
                                    <div className="flex items-center gap-4 mt-2 pt-1 text-[14.5px] text-[#333333]">
                                        <span>Is this a cell phone?</span>
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="cell_phone" 
                                                className="mr-2 w-3.5 h-3.5" 
                                                onChange={() => setIsCellPhone(true)}
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="cell_phone" 
                                                className="mr-2 w-3.5 h-3.5" 
                                                onChange={() => setIsCellPhone(false)}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-[15px] text-[#333333]">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 outline-none focus:border-[#3b7ea1] text-[15px]" 
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center pt-8">
                                <button type="submit" disabled={submitting} className="bg-[#dca626] hover:bg-[#c99722] text-[#043b67] font-bold text-[16px] px-12 py-3.5 rounded-[4px] transition-colors shadow-sm disabled:opacity-50">
                                    {submitted ? "✓ Submitted!" : submitting ? "Submitting..." : "Next"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <Newsletter />
            <FloatingGetStarted />
        </div>
    );
}
