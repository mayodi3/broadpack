"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Wine,
  Coffee,
  Martini,
  Beer,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { barMenu } from "./bar-menu";

// register plugin once
gsap.registerPlugin(ScrollTrigger);

export default function BarPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // scope all GSAP selectors and triggers to this component
    const ctx = gsap.context(() => {
      // Hero section
      gsap.from(".hero-content", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Info cards
      gsap.utils.toArray<HTMLElement>(".info-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.2,
          ease: "back.out(1.2)",
        });
      });

      // Menu title
      gsap.from(".menu-title", {
        scrollTrigger: {
          trigger: ".menu-title",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      // Menu cards
      gsap.utils.toArray<HTMLElement>(".menu-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power2.out",
        });
      });

      // CTA section
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    // ensure ScrollTrigger calculates positions
    ScrollTrigger.refresh();

    // cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/KRD03751.webp"
            alt="Luxury Bar and Lounge Area" // Updated alt text
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
              BROADPARK Bar & Lounge
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Sip, Savor, and Socialize in Style
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="#menu">View Menu</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-black border-white bg-secondary"
              >
                <Link href="/contact">Reserve a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="info-card flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2" />
              <h3 className="text-lg font-semibold mb-1">Opening Hours</h3>
              <p className="text-sm">Daily: 10:00 AM - 11:00 PM</p>
              <p className="text-sm">Happy Hour: 5:00 PM - 7:00 PM</p>
            </div>
            <div className="info-card flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-2" />
              <h3 className="text-lg font-semibold mb-1">Location</h3>
              <p className="text-sm">BROADPARK Hotels</p>
              <p className="text-sm">Mbale, Vihiga County</p>
            </div>
            <div className="info-card flex flex-col items-center">
              <Phone className="h-8 w-8 mb-2" />
              <h3 className="text-lg font-semibold mb-1">Reservations</h3>
              <p className="text-sm">+254 700 000000</p>
              <p className="text-sm">info@broadpackhotels.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div id="menu" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="menu-title text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Bar Menu
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of beverages, from
              signature cocktails to premium spirits and fine wines.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {barMenu.map((category) => (
              <div
                key={category.id}
                className="menu-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <div className="flex items-center mb-2">
                        {category.id === 1 && (
                          <Martini className="h-5 w-5 text-primary mr-2" />
                        )}
                        {category.id === 2 && (
                          <Wine className="h-5 w-5 text-primary mr-2" />
                        )}
                        {category.id === 3 && (
                          <Beer className="h-5 w-5 text-primary mr-2" />
                        )}
                        {category.id === 4 && (
                          <Coffee className="h-5 w-5 text-primary mr-2" />
                        )}
                        <h3 className="text-xl font-bold text-white">
                          {category.title}
                        </h3>
                      </div>
                      <p className="text-gray-200 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b border-gray-100 pb-2"
                      >
                        <span className="text-gray-700">
                          {item.split(" - ")[0]}
                        </span>
                        <span className="font-medium text-primary">
                          {item.split(" - ")[1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Host Your Next Event With Us
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Celebrate your special occasions in our elegant bar and lounge
              area, perfect for private parties and corporate events.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-primary hover:bg-white/10"
            >
              <Link href="/contact">Inquire Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
