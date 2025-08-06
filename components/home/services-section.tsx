"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  Utensils,
  Leaf,
  Gamepad2,
  PartyPopper,
  Dumbbell,
  ArrowRight,
  Star,
  Clock,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: Building,
    title: "Luxury Accommodations",
    description:
      "Spacious rooms and suites with modern amenities, scenic balcony views, and premium comfort for all guests.",
    features: ["Premium rooms", "Balcony views", "Modern amenities"],
    availability: "24/7",
    popular: true,
  },
  {
    icon: Utensils,
    title: "Fine Dining & Bar",
    description:
      "Signature lamb and pork chops, local and international cuisine, plus a well-stocked bar with premium beverages.",
    features: ["Signature dishes", "Local cuisine", "Premium bar"],
    availability: "6 AM - 11 PM",
    popular: true,
  },
  {
    icon: Leaf,
    title: "Spa & Wellness",
    description:
      "Rejuvenating spa treatments, wellness therapies, and relaxation services to refresh your mind and body.",
    features: ["Massage therapy", "Wellness treatments", "Relaxation"],
    availability: "9 AM - 9 PM",
    popular: false,
  },
  {
    icon: Gamepad2,
    title: "Recreation & Gaming",
    description:
      "Entertainment facilities including game rooms, recreational activities, and family-friendly gaming options.",
    features: ["Game room", "Family activities", "Entertainment"],
    availability: "10 AM - 10 PM",
    popular: false,
  },
  {
    icon: PartyPopper,
    title: "Events & Conferences",
    description:
      "Professional event hosting, conference facilities, wedding venues, and celebration spaces for all occasions.",
    features: ["Conference rooms", "Wedding venues", "Event planning"],
    availability: "On request",
    popular: true,
  },
  {
    icon: Dumbbell,
    title: "Fitness & Yoga",
    description:
      "Modern gym equipment, yoga sessions, fitness classes, and personal training services for health enthusiasts.",
    features: ["Modern gym", "Yoga classes", "Personal training"],
    availability: "5 AM - 11 PM",
    popular: false,
  },
];

const ServiceSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(servicesGridRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9,
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
          servicesGridRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
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
              OUR SERVICES
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Explore Our <span className="text-primary">Premium Services</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From luxury accommodations to fine dining and wellness facilities,
            we offer comprehensive services to make your stay exceptional.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={servicesGridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border-0"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  Popular
                </div>
              )}

              <CardContent className="p-8 text-center">
                {/* Service Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Available: {service.availability}</span>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <Star className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Experience{" "}
              <span className="text-primary">World-Class Service</span>
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Our dedicated team is committed to providing exceptional service
              and ensuring every moment of your stay exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/booking")}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Book Your Stay
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => router.push("/rooms")}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Explore Facilities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
