"use client";

import React, { useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  Gift,
  Percent,
  Star,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SpecialOffersSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const offersGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Special Offers Data
  const specialOffers = [
    {
      id: 1,
      title: "Weekend Getaway Package",
      subtitle: "Perfect for couples",
      discount: "25% OFF",
      originalPrice: 8000,
      discountedPrice: 6000,
      duration: "2 Days, 1 Night",
      validUntil: "December 31, 2025",
      image: "/Building 3.webp", // Changed from /room-1.jpg
      features: [
        "Luxury room accommodation",
        "Complimentary breakfast",
        "Late checkout (2 PM)",
        "Welcome drink on arrival",
      ],
      badge: "Most Popular",
      badgeColor: "bg-primary",
      isLimited: true,
      spotsLeft: 5,
    },
    {
      id: 2,
      title: "Business Traveler Special",
      subtitle: "For professionals",
      discount: "20% OFF",
      originalPrice: 5000,
      discountedPrice: 4000,
      duration: "Per Night",
      validUntil: "January 15, 2026",
      image: "/KRD03772.webp", // Changed from /room-2.jpg
      features: [
        "Executive room with workspace",
        "Free high-speed WiFi",
        "Business center access",
        "Express laundry service",
      ],
      badge: "Business",
      badgeColor: "bg-blue-600",
      isLimited: false,
    },
    {
      id: 3,
      title: "Family Fun Package",
      subtitle: "Great for families",
      discount: "30% OFF",
      originalPrice: 12000,
      discountedPrice: 8400,
      duration: "3 Days, 2 Nights",
      validUntil: "September 31, 2025",
      image: "/Customers 1.webp", // Changed from /room-3.jpg
      features: ["Family suite accommodation", "Kids eat free (under 12)"],
      badge: "Best Value",
      badgeColor: "bg-green-600",
      isLimited: true,
      spotsLeft: 3,
    },
  ];

  // Seasonal promotions
  const seasonalPromos = [
    {
      icon: Gift,
      title: "Holiday Special",
      description: "Book 3 nights, get 1 night free during festive season",
      color: "text-red-600",
    },
    {
      icon: Sparkles,
      title: "New Year Package",
      description: "Celebrate New Year with exclusive dining and entertainment",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "Group Booking",
      description: "Special rates for groups of 10+ people",
      color: "text-blue-600",
    },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(offersGridRef.current?.children || [], {
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
          offersGridRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
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

  const handleBookOffer = (offerId: number) => {
    router.push(`/booking?offer=${offerId}`);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-yellow-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
            <span className="text-primary font-bold text-sm tracking-wider">
              SPECIAL OFFERS
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Exclusive <span className="text-primary">Deals & Packages</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take advantage of our limited-time offers and seasonal packages
            designed to make your stay at BROADPARK HOTELS even more memorable
            and affordable.
          </p>
        </div>

        {/* Main Offers Grid */}
        <div
          ref={offersGridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {specialOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                index === 0 ? "lg:scale-105 border-2 border-primary/20" : ""
              }`}
            >
              {/* Offer Badge */}
              <div
                className={`absolute top-4 left-4 ${offer.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg`}
              >
                {offer.badge}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                {offer.discount}
              </div>

              {/* Limited Spots Indicator */}
              {offer.isLimited && (
                <div className="absolute top-16 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg animate-pulse">
                  Only {offer.spotsLeft} left!
                </div>
              )}

              {/* Offer Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Offer Content */}
              <div className="p-6">
                {/* Title and Subtitle */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{offer.subtitle}</p>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-primary">
                      Ksh {offer.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      Ksh {offer.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{offer.duration}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {offer.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Validity and CTA */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>

                  <Button
                    onClick={() => handleBookOffer(offer.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Book This Offer
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seasonal Promotions */}
        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            Seasonal <span className="text-primary">Promotions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalPromos.map((promo, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div
                  className={`w-16 h-16 ${promo.color.replace(
                    "text-",
                    "bg-"
                  )}/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <promo.icon className={`w-8 h-8 ${promo.color}`} />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{promo.title}</h4>
                <p className="text-gray-600 text-sm">{promo.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <Percent className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Don't Miss Out on{" "}
              <span className="text-primary">Amazing Deals</span>
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Our special offers are limited and available for a short time
              only. Book now to secure the best rates and enjoy an unforgettable
              stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/booking")}
                className="w-[170px] bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Book Now
                <Calendar className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => router.push("/rooms")}
                variant="outline"
                className=" w-[170px] border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
