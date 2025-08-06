"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Award,
  Users,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const staffMembers = [
  {
    designation: "General Manager",
    description:
      "Leading BROADPARK HOTELS with 15+ years of hospitality excellence and passion for guest satisfaction.",
    image: "/Director 1.webp",
    experience: "15+ Years",
    specialization: "Operations Management",
    achievements: ["Best Manager Award 2023", "Customer Service Excellence"],
  },
  {
    designation: "Head Chef",
    description:
      "Master chef specializing in local Kenyan cuisine and our famous signature lamb and pork chops.",
    image: "/Head Chef.webp",
    experience: "12+ Years",
    specialization: "Culinary Arts",
    achievements: ["Culinary Excellence Award", "Local Cuisine Specialist"],
  },
  {
    designation: "Guest Relations Manager",
    description:
      "Ensuring every guest feels welcome and receives personalized service throughout their stay.",
    image: "/Staff 5.webp",
    experience: "8+ Years",
    specialization: "Guest Experience",
    achievements: ["Guest Satisfaction Champion", "Service Excellence Award"],
  },
  {
    designation: "Events Coordinator",
    description:
      "Creating memorable events and celebrations with attention to detail and creative planning.",
    image: "/Staff 4.webp",
    experience: "10+ Years",
    specialization: "Event Planning",
    achievements: ["Event Planning Expert", "Wedding Specialist"],
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const teamStats = [
    {
      icon: Users,
      number: "25+",
      label: "Team Members",
    },
    {
      icon: Award,
      number: "50+",
      label: "Years Combined Experience",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, statsRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(teamGridRef.current?.children || [], {
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
          teamGridRef.current?.children || [],
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
          statsRef.current,
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
              OUR TEAM
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Meet Our <span className="text-primary">Expert Team</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our dedicated professionals bring years of experience and passion
            for hospitality to ensure your stay at BROADPARK HOTELS is
            exceptional.
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={teamGridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16"
        >
          {staffMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Member Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt="Member Image"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {member.experience}
                </div>
              </div>

              {/* Member Content */}
              <div className="p-6">
                {/* Name and Title */}
                <p className="text-primary font-semibold text-sm mb-3">
                  {member.designation}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {member.description}
                </p>

                {/* Specialization */}
                <div className="mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {member.specialization}
                  </span>
                </div>

                {/* Achievements */}
                <div className="space-y-1">
                  {member.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <Award className="w-3 h-3 text-primary" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Statistics */}
        <div ref={statsRef} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Our <span className="text-primary">Professional Team</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-md mx-auto">
              {teamStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
              Our experienced team is dedicated to providing exceptional service
              and creating memorable experiences for every guest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
