"use client";

import React, { useEffect, useRef } from "react";
import {
  Utensils,
  Calendar,
  Briefcase,
  Leaf,
  Music,
  Camera,
  ArrowRight,
  Star,
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

const ExperienceHighlightsSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const highlightsGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Experience highlights data
  const experiences = [
    {
      id: 1,
      icon: Utensils,
      title: "Signature Dining",
      subtitle: "Culinary Excellence",
      description:
        "Savor our famous lamb and pork chops, expertly prepared by our skilled chefs using the finest local ingredients.",
      image: "/gallery-1.jpg",
      features: ["Signature dishes", "Local ingredients", "Expert chefs"],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      icon: Calendar,
      title: "Event Hosting",
      subtitle: "Memorable Celebrations",
      description:
        "From intimate weddings to corporate conferences, we provide exceptional venues and professional event planning services.",
      image: "/gallery-2.jpg",
      features: ["Wedding venues", "Corporate events", "Event planning"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      id: 3,
      icon: Briefcase,
      title: "Business Facilities",
      subtitle: "Professional Excellence",
      description:
        "State-of-the-art conference rooms, high-speed internet, and business center services for the modern professional.",
      image: "/gallery-3.jpg",
      features: ["Conference rooms", "High-speed WiFi", "Business center"],
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      icon: Leaf,
      title: "Wellness & Spa",
      subtitle: "Rejuvenation & Relaxation",
      description:
        "Unwind with our comprehensive wellness services, including spa treatments, massage therapy, and relaxation facilities.",
      image: "/gallery-4.jpg",
      features: ["Spa treatments", "Massage therapy", "Wellness programs"],
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
    },
  ];

  // Additional experiences
  const additionalExperiences = [
    {
      icon: Music,
      title: "Live Entertainment",
      description:
        "Enjoy live music performances and cultural shows that celebrate local Kenyan heritage.",
    },
    {
      icon: Camera,
      title: "Photography Services",
      description:
        "Professional photography for your special moments and events at our scenic locations.",
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

      gsap.set(highlightsGridRef.current?.children || [], {
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
          highlightsGridRef.current?.children || [],
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

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
            <span className="text-primary font-bold text-sm tracking-wider">
              EXPERIENCE HIGHLIGHTS
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Unforgettable <span className="text-primary">Experiences</span>{" "}
            Await
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the exceptional experiences that make BROADPARK HOTELS more
            than just a place to stay. From culinary delights to wellness
            retreats, create memories that last a lifetime.
          </p>
        </div>

        {/* Main Experiences Grid */}
        <div
          ref={highlightsGridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`group relative ${experience.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative p-8 lg:p-10">
                {/* Icon and Title */}
                <div className="flex items-start gap-6 mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${experience.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <experience.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                      {experience.title}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-3">
                      {experience.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {experience.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover Action */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {additionalExperiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <experience.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {experience.title}
                </h4>
              </div>
              <p className="text-gray-600 text-sm">{experience.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <Star className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Create <span className="text-primary">Lasting Memories</span>
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Whether you're here for business, leisure, or celebration, our
              diverse range of experiences ensures every moment at BROADPARK
              Hotel is extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/booking")}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Book Your Experience
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => router.push("/attractions")}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Attractions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceHighlightsSection;
