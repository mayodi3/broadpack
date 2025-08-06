"use client";

import { gsap } from "gsap";
import {
  Calendar,
  Car,
  ChevronDown,
  Coffee,
  Dumbbell,
  MapPin,
  Phone,
  Star,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const heroSlides = [
    {
      image: "/Building 6.webp", // Changed from /image1.JPG
      badge: "Luxury Stay",
      title: "Ultimate",
      highlight: "COMFORT",
      subtitle: "Premium rooms with modern amenities and stunning views.",
      mobileSubtitle: "Luxury rooms & amenities",
      features: [
        { icon: Star, text: "5-Star" },
        { icon: Wifi, text: "Free WiFi" },
        { icon: Car, text: "Parking" },
      ],
    },
    {
      image: "/Meals.webp", // Changed from /image2.JPG
      badge: "Fine Dining",
      title: "Exquisite",
      highlight: "CUISINE",
      subtitle:
        "Authentic Kenyan flavors and international dishes by expert chefs.",
      mobileSubtitle: "Authentic flavors & fine dining",
      features: [
        { icon: Utensils, text: "Restaurant" },
        { icon: Coffee, text: "Room Service" },
        { icon: Users, text: "Events" },
      ],
    },
    {
      image: "/Conference.webp", // Changed from /image3.JPG
      badge: "Business Hub",
      title: "Perfect",
      highlight: "MEETINGS",
      subtitle:
        "State-of-the-art facilities for conferences and corporate events.",
      mobileSubtitle: "Conference & event facilities",
      features: [
        { icon: Users, text: "Meetings" },
        { icon: Wifi, text: "AV Tech" },
        { icon: Phone, text: "Support" },
      ],
    },
    {
      image: "/Hero 1.webp", // Changed from /gallery-1.jpg
      badge: "Wellness",
      title: "Rejuvenate",
      highlight: "BODY & SOUL",
      subtitle: "Modern gym, spa treatments, and recreational facilities.",
      mobileSubtitle: "Gym, spa & recreation",
      features: [
        { icon: Dumbbell, text: "Fitness" },
        { icon: Star, text: "Spa" },
        { icon: Users, text: "Recreation" },
      ],
    },
    {
      image: "/Gate.webp", // Changed from /gallery-2.jpg
      badge: "Prime Location",
      title: "Beautiful",
      highlight: "VIHIGA",
      subtitle: "Rich culture, stunning landscapes, and warm hospitality.",
      mobileSubtitle: "Culture & natural beauty",
      features: [
        { icon: MapPin, text: "Central" },
        { icon: Car, text: "Access" },
        { icon: Users, text: "Tours" },
      ],
    },
  ];

  const handleBookNow = () => {
    router.push("/contact");
  };

  const handleExploreRooms = () => {
    router.push("/rooms");
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector("#about-section");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // GSAP Animations for slide transitions
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content when slide changes
      const animateSlideContent = () => {
        // Set initial states
        gsap.set(
          [
            badgeRef.current,
            headingRef.current,
            subheadingRef.current,
            featuresRef.current,
            buttonsRef.current,
            contactRef.current,
          ],
          {
            opacity: 0,
            y: 50,
          }
        );

        // Create entrance timeline
        const tl = gsap.timeline();

        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "bounce",
        })
          .to(
            headingRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            subheadingRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .to(
            featuresRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            buttonsRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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
      };

      // Initial animation
      setTimeout(animateSlideContent, 500);

      // Animate on slide change
      animateSlideContent();

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Button hover animations
      const buttons = buttonsRef.current?.querySelectorAll("button");
      buttons?.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, heroContentRef);

    return () => ctx.revert();
  }, [currentSlide]);

  const currentSlideData = heroSlides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative">
      {/* Background Images */}
      <div className="relative h-[90vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className={`absolute inset-0 transition-opacity duration-4000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={`Hero slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 rotate-90" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 -rotate-90" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Main Hero Content */}
          <div
            ref={heroContentRef}
            className="max-w-4xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6"
          >
            {/* Dynamic Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-primary/90 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              <span>{currentSlideData.badge}</span>
            </div>

            {/* Dynamic Heading */}
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              <span className="block sm:inline">{currentSlideData.title}</span>
              <span className="block text-primary">
                {currentSlideData.highlight}
              </span>
            </h1>

            {/* Dynamic Subheading */}
            <p
              ref={subheadingRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              <span className="hidden sm:inline">
                {currentSlideData.subtitle}
              </span>
              <span className="sm:hidden">
                {currentSlideData.mobileSubtitle}
              </span>
            </p>

            {/* Dynamic Features */}
            <div
              ref={featuresRef}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm md:text-base"
            >
              {currentSlideData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4"
            >
              <Button
                onClick={handleBookNow}
                className="bg-primary hover:bg-primary/90 text-black px-6 py-3 sm:px-8 sm:py-6 text-sm sm:text-base lg:text-lg font-bold rounded-none shadow-lg w-full sm:w-[250px]"
                size="lg"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                BOOK NOW
              </Button>

              <Button
                onClick={handleExploreRooms}
                variant="outline"
                className="border-2 border-white text-primary hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-6 text-sm sm:text-base lg:text-lg font-bold rounded-none shadow-lg w-full sm:w-[250px]"
                size="lg"
              >
                EXPLORE ROOMS
              </Button>
            </div>

            {/* Contact Info */}
            <div
              ref={contactRef}
              className="pt-3 sm:pt-6 text-xs sm:text-sm md:text-base text-gray-300"
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>0719 651 708</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-center sm:text-left">
                    Mbale, Vihiga County
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToNext}
          className="text-white hover:text-primary transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
