"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  BedDoubleIcon,
  Building,
  Clock,
  Heart,
  MapPin,
  Users,
  UserSquare2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const statCards = [
    { icon: Building, capacity: 50, description: "Modern Rooms", suffix: "+" },
    {
      icon: BedDoubleIcon,
      capacity: 100,
      description: "Bed Capacity",
      suffix: "+",
    },
    { icon: Users, capacity: 3, description: "Conference Rooms", suffix: "" },
    {
      icon: UserSquare2,
      capacity: 1,
      description: "Executive Boardroom",
      suffix: "",
    },
  ];

  const highlights = [
    { icon: Award, text: "Premium Service Excellence" },
    { icon: Clock, text: "24/7 Guest Support" },
    { icon: MapPin, text: "Prime Vihiga Location" },
    { icon: Heart, text: "Authentic Kenyan Hospitality" },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.8,
      });

      gsap.set(imageGridRef.current?.children || [], {
        opacity: 0,
        scale: 0.9,
        y: 20,
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

      // Animate content entrance
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          statsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.5,
            ease: "bounce",
          },
          "-=0.4"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          imageGridRef.current?.children || [],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        );

      // Animate statistics counters
      statCards.forEach((stat, index) => {
        const statElement =
          statsRef.current?.children[index]?.querySelector(".stat-number");
        if (statElement) {
          gsap.fromTo(
            statElement,
            { textContent: 0 },
            {
              textContent: stat.capacity,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                if (statElement) {
                  statElement.textContent =
                    Math.ceil(this.targets()[0].textContent) + stat.suffix;
                }
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [statCards]);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div ref={contentRef} className="lg:basis-3/5 space-y-8">
            {/* Section Header */}
            <div ref={titleRef} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-12 bg-primary rounded-full"></div>
                <span className="text-primary font-bold text-sm tracking-wider">
                  ABOUT US
                </span>
                <div className="h-[3px] w-12 bg-primary rounded-full"></div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to{" "}
                <span className="text-primary block sm:inline">
                  BROADPARK HOTELS
                </span>
              </h2>
            </div>

            {/* Description */}
            <div ref={descriptionRef} className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Nestled in the heart of Mbale, Vihiga County, BROADPARK HOTELS
                stands as your premier destination for comfort, elegance, and
                unforgettable hospitality.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Whether you're visiting for business, leisure, or family
                gatherings, we offer the perfect blend of modern convenience,
                timeless class, and authentic Kenyan charm that makes every stay
                memorable.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                  >
                    <highlight.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">
                      {highlight.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
            >
              {statCards.map((stat, index) => (
                <div
                  key={stat.description}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="stat-number text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {stat.capacity}
                    {stat.suffix}
                  </div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              ref={buttonRef}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              EXPLORE MORE
            </Button>
          </div>

          {/* Image Gallery */}
          <div ref={imageGridRef} className="lg:basis-2/5 w-full">
            <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
              {/* Large Featured Image */}
              <div className="col-span-2 row-span-2 relative overflow-hidden shadow-xl">
                <Image
                  src="/Conference.webp" // Changed from /room-1.jpg
                  alt="Spacious conference room" // Updated alt text
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Small Images Grid */}
              <div className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-lg">
                <Image
                  src="/Customers.webp" // Changed from /gallery-1.jpg
                  alt="Guests enjoying dinner" // Updated alt text
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-lg">
                <Image
                  src="/Reception.webp" // Changed from /gallery-2.jpg
                  alt="Hotel reception area" // Updated alt text
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-lg">
                <Image
                  src="/Building.webp" // Changed from /gallery-3.jpg
                  alt="Hotel Exterior View" // Updated alt text
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-lg">
                <Image
                  src="/Meals.webp" // Changed from /gallery-4.jpg
                  alt="Buffet with various meals" // Updated alt text
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
