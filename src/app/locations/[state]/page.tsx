import { US_STATES } from "@/lib/constants/states";

export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StateSelector } from "@/components/office-locator/StateSelector";
import { Newsletter } from "@/components/marketing/Newsletter";
import { NoOfficesContactForm } from "@/components/locations/NoOfficesContactForm";

export async function generateMetadata({ params }: { params: { state: string } }) {
    const stateCode = params.state.toUpperCase();
    const stateObj = US_STATES.find(s => s.value === stateCode);
    
    if (!stateObj) {
        return {
            title: "Locations | MidAid"
        };
    }

    return {
        title: `Senior Home Care Services in ${stateObj.label} | MidAid`,
        description: `Find compassionate, professional senior home care services in ${stateObj.label}. Locate your nearest MidAid office today.`
    };
}

export default async function StateLocationPage({ params }: { params: { state: string } }) {
    const stateCode = params.state.toUpperCase();
    const stateObj = US_STATES.find(s => s.value === stateCode);

    if (!stateObj) {
        notFound();
    }

    const supabase = await createClient();
    
    // Fetch offices for this state
    const { data: offices } = await supabase
        .from('office_locations')
        .select('*')
        .eq('state', stateCode)
        .eq('published', true)
        .order('city', { ascending: true });

    const hasOffices = offices && offices.length > 0;

    return (
        <div className="w-full bg-[#f9fafa] min-h-screen">
            {/* Header Section */}
            <section className="bg-[#1b3664] pt-8 pb-12 md:pt-12 md:pb-16 text-center px-4 relative z-10">
                <div className="container mx-auto max-w-[800px]">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <span className="text-[#3b7ea1] text-[15px] font-medium bg-[#eaf6f9] px-4 py-1.5 rounded-full">
                            You have selected {stateObj.label}.
                        </span>
                        <StateSelector currentState={stateCode} />
                    </div>
                    
                    <h1 className="text-[32px] md:text-[42px] font-bold text-[#f2b926] mb-6 font-sans">
                        Senior Home Care Services in {stateObj.label}
                    </h1>
                    
                    <p className="text-[16px] md:text-[18px] text-white leading-[1.6] mb-6">
                        At MidAid, we provide dedicated and reliable senior home care services in {stateObj.label}. Our professional caregivers offer personalized assistance that restores hope and enhances quality of life at home.
                    </p>
                    
                    <p className="text-[16px] md:text-[18px] text-white leading-[1.6]">
                        Request a free consultation today by selecting the nearest location below where care is needed.
                    </p>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="w-full h-[300px] md:h-[400px] bg-[#e5e5e5] relative -mt-6 z-0">
                {/* In a real app, this would be a Google Map component */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                    [Map of {stateObj.label} showing office locations]
                </div>
                {/* Decorative bottom curve to match screenshot */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,93.87,104.38,81.3,155,67.66,210.84,52.6,266.19,67.22,321.39,56.44Z" fill="#f9fafa"></path>
                    </svg>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 md:py-20 px-4">
                <div className="container mx-auto max-w-[1200px]">
                    
                    {hasOffices ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                                {offices.map((office: { id: string; name?: string | null; address?: string | null; city?: string | null; state?: string | null; zip?: string | null }) => (
                                    <div key={office.id} className="bg-white border border-gray-200 rounded-[8px] p-8 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                        <h3 className="text-[20px] font-bold text-[#043b67] mb-4">
                                            MidAid Senior Home Care<br/>
                                            {office.name}
                                        </h3>
                                        
                                        <div className="text-[#333333] text-[15px] mb-6 flex-grow">
                                            <p>{office.address}</p>
                                            <p>{office.city}, {office.state} {office.zip}</p>
                                            
                                            <p className="mt-4">
                                                We offer senior home care in {office.city} and Surrounding Areas
                                            </p>
                                        </div>
                                        
                                        <Link 
                                            href={`/office-locator/${office.id}`}
                                            className="inline-block w-full py-3 px-6 bg-[#dca626] hover:bg-[#c59522] text-black font-bold rounded-[4px] transition-colors"
                                        >
                                            Contact {office.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Why Choose Us Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-gray-200">
                                <div>
                                    <h3 className="text-[22px] font-bold text-[#043b67] mb-4">America's Choice in Home Care</h3>
                                    <p className="text-[#333333] text-[15px] leading-[1.7]">
                                        We are a national leader in senior home care, specializing in personalized care that helps aging adults thrive in the comforts of home. With a strong commitment to enhancing quality of life, we offer comprehensive in-home services tailored to each individual's unique needs.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bold text-[#043b67] mb-4">Our Experience</h3>
                                    <p className="text-[#333333] text-[15px] leading-[1.7]">
                                        For over 25 years, we have been one of the nation's most trusted providers of senior home care, delivering dependable in-home support to families across America. Our experience is reflected in our comprehensive care services as well as our dedication, kindness, and warmth.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bold text-[#043b67] mb-4">Our Character</h3>
                                    <p className="text-[#333333] text-[15px] leading-[1.7]">
                                        The character of MidAid is defined by our deep commitment to enriching the lives of seniors at home and restoring hope for the families we serve. Our devoted caregivers are not only experienced and skilled but also empathetic and dedicated to treating each client with dignity.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Bottom Banner */}
                            <div className="mt-16 bg-white border border-gray-200 rounded-[8px] overflow-hidden shadow-sm">
                                <div className="p-8 md:p-10 border-b border-gray-100">
                                    <h3 className="text-[22px] font-bold text-[#043b67] mb-3">Get in Touch With Us</h3>
                                    <p className="text-[#333333] text-[16px]">
                                        If you want to learn more about our senior home care in {stateObj.label}, please contact your nearest MidAid office. We would love to hear from you!
                                    </p>
                                </div>
                                <div className="bg-[#f0f8fa] p-8 md:p-10">
                                    <h3 className="text-[22px] font-bold text-[#043b67] mb-2">MidAid Proudly Serves {stateObj.label}</h3>
                                    <p className="text-[#333333] text-[16px]">
                                        We offer in-home care services across numerous towns and communities in {stateObj.label}. Explore the areas we serve below.
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="max-w-[900px] mx-auto">
                            <h2 className="text-[28px] md:text-[34px] font-bold text-[#043b67] mb-6">
                                No Local MidAid Offices Found
                            </h2>
                            <div className="text-[#333333] text-[16px] md:text-[18px] leading-[1.7] space-y-6 mb-12">
                                <p>Thank you for your interest in our home care services.</p>
                                <p>
                                    Unfortunately, we do not have a MidAid agency within a 35-mile radius of your provided location. We recommend contacting local resources to explore available care services in your area.
                                </p>
                                <p>
                                    Thank you again for considering MidAid. We hope you find the care and support you need.
                                </p>
                            </div>
                            
                            <NoOfficesContactForm stateCode={stateCode} />
                        </div>
                    )}
                    
                </div>
            </section>
            
            {/* Newsletter Section */}
            <Newsletter />
        </div>
    );
}