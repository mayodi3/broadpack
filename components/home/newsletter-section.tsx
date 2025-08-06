"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Send, Gift, Bell, Star, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  // Newsletter benefits
  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Offers",
      description:
        "Get access to special deals and packages before anyone else",
    },
    {
      icon: Bell,
      title: "Event Updates",
      description:
        "Be the first to know about upcoming events and celebrations",
    },
    {
      icon: Star,
      title: "VIP Treatment",
      description: "Enjoy priority booking and personalized recommendations",
    },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([contentRef.current, formRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(benefitsRef.current?.children || [], {
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
          formRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          benefitsRef.current?.children || [],
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-orange-50 to-yellow-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success State */}
          {isSubscribed && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                <CheckCircle className="w-5 h-5" />
                Successfully subscribed! Welcome to our VIP list.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div ref={contentRef} className="space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-[3px] w-12 bg-primary rounded-full"></div>
                  <span className="text-primary font-bold text-sm tracking-wider">
                    STAY CONNECTED
                  </span>
                  <div className="h-[3px] w-12 bg-primary rounded-full"></div>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Join Our <span className="text-primary">VIP Newsletter</span>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Be the first to discover exclusive offers, upcoming events,
                  and insider tips for making the most of your stay at BROADPARK
                  Hotel.
                </p>
              </div>

              {/* Newsletter Form */}
              <div ref={formRef}>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-primary"
                      disabled={isLoading || isSubscribed}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isValidEmail(email) || isLoading || isSubscribed}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Subscribing...
                      </div>
                    ) : isSubscribed ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Subscribed!
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Subscribe Now
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>

            {/* Benefits Side */}
            <div ref={benefitsRef} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">
                What You'll Get:
              </h3>

              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Social Proof */}
              <div className="bg-gradient-to-r from-primary/10 to-orange-100 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-primary fill-current" />
                  <Star className="w-5 h-5 text-primary fill-current" />
                  <Star className="w-5 h-5 text-primary fill-current" />
                  <Star className="w-5 h-5 text-primary fill-current" />
                  <Star className="w-5 h-5 text-primary fill-current" />
                </div>
                <p className="font-semibold text-gray-800 mb-2">
                  Join 2,500+ Happy Subscribers
                </p>
                <p className="text-sm text-gray-600">
                  "The best deals and insider tips for Vihiga County!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
