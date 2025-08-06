"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  Award,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoSection = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Experience highlights
  const highlights = [
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized for excellence in hospitality",
    },
    {
      icon: Users,
      title: "Family-Friendly",
      description: "Perfect for families and business travelers",
    },
    {
      icon: Star,
      title: "Premium Amenities",
      description: "Modern facilities and comfort",
    },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([contentRef.current, videoContainerRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        x: -30,
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
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          videoContainerRef.current,
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
            x: 0,
            duration: 0.6,
            stagger: 0.1,
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
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            {/* Section Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-12 bg-primary rounded-full"></div>
                <span className="text-primary font-bold text-sm tracking-wider">
                  EXPERIENCE BROADPARK
                </span>
                <div className="h-[3px] w-12 bg-primary rounded-full"></div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Comfort, Elegance &
                <span className="text-primary block sm:inline">
                  {" "}
                  Kenyan Charm
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">
                From our spacious rooms with scenic balcony views to our
                well-stocked bar and restaurant serving signature lamb and pork
                chops, experience the perfect blend of convenience and class in
                Mbale, Vihiga County.
              </p>
            </div>

            {/* Experience Highlights */}
            <div ref={statsRef} className="space-y-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/rooms")}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Explore Our Rooms
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => router.push("/booking")}
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Your Stay
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div ref={videoContainerRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <video
                ref={videoRef}
                className="w-full h-[400px] lg:h-[500px] object-cover"
                src="/BROADPARK.mp4"
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleVideo}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-1" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                  >
                    <Volume2
                      className={`w-4 h-4 text-white ${
                        isMuted ? "opacity-50" : "opacity-100"
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">
                    Hotel Tour
                  </span>
                </div>
              </div>

              {/* Play Button Overlay for Paused State */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    onClick={toggleVideo}
                    className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-2xl"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
