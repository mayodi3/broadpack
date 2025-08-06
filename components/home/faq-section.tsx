"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqGridRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What are your check-in and check-out times?",
      answer:
        "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability and additional charges.",
    },
    {
      id: 2,
      question: "Do you offer airport transportation?",
      answer:
        "Yes, we provide airport shuttle services to and from Kisumu Airport (85km away). Please contact us in advance to arrange transportation. Private car hire is also available.",
    },
    {
      id: 3,
      question: "What amenities are included in the room rate?",
      answer:
        "All rooms include free WiFi, air conditioning, flat-screen TV, private bathroom, and daily housekeeping. Premium rooms also include balcony access and complimentary breakfast.",
    },
    {
      id: 4,
      question: "Is parking available at the hotel?",
      answer:
        "Yes, we offer free on-site parking for all guests. Our parking area is secure and monitored 24/7 for your peace of mind.",
    },
    {
      id: 5,
      question: "Can I cancel or modify my reservation?",
      answer:
        "Cancellations and modifications are allowed up to 24 hours before your arrival date without penalty. Please contact us directly or use our online booking system to make changes.",
    },
    {
      id: 6,
      question: "Do you have facilities for events and conferences?",
      answer:
        "Absolutely! We have multiple event spaces suitable for weddings, conferences, and celebrations. Our team provides full event planning services and catering options.",
    },
    {
      id: 7,
      question: "What dining options are available?",
      answer:
        "Our restaurant serves breakfast, lunch, and dinner featuring local and international cuisine. We're famous for our signature lamb and pork chops. Room service is also available.",
    },
    {
      id: 8,
      question: "Are pets allowed at the hotel?",
      answer:
        "We welcome well-behaved pets with prior arrangement. A pet fee may apply, and we ask that pets be kept on leash in public areas and supervised at all times.",
    },
  ];

  // Contact options
  const contactOptions = [
    {
      icon: Phone,
      title: "Call Us",
      description: "+254 XXX XXX XXX",
      action: "tel:+254XXXXXXXXX",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "info@BROADPARKhotel.com",
      action: "mailto:info@BROADPARKhotel.com",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      action: "#",
    },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, contactRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(faqGridRef.current?.children || [], {
        opacity: 0,
        y: 30,
      });

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate entrance
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          faqGridRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          contactRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-white to-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
            <span className="text-primary font-bold text-sm tracking-wider">
              FREQUENTLY ASKED
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Questions & <span className="text-primary">Answers</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to the most common questions about our hotel, services,
            and policies. Can't find what you're looking for? We're here to
            help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ List */}
          <div className="lg:col-span-2">
            <div ref={faqGridRef} className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 group"
                  >
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                      )}
                    </div>
                  </button>

                  {openFAQ === faq.id && (
                    <div className="px-6 pb-5">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Sidebar */}
          <div ref={contactRef} className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-orange-50 rounded-2xl p-6 lg:p-8">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Our friendly team is here to help you 24/7. Get in touch with us
                through any of these channels.
              </p>

              <div className="space-y-4">
                {contactOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.action}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-4">Quick Tips</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Book directly for the best rates and exclusive perks
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Join our newsletter for special offers and updates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Follow us on social media for the latest news</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
