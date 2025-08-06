"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Calendar,
  MapPin,
  Quote,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  // Trust Statistics
  const trustStats = [
    { icon: Users, number: "5000+", label: "Happy Guests", suffix: "" },
    { icon: Calendar, number: "15", label: "Years Experience", suffix: "+" },
    { icon: Star, number: "4.8", label: "Average Rating", suffix: "/5" },
    { icon: Award, number: "25", label: "Awards Won", suffix: "+" },
  ];

  // Customer Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Miriam A",
      location: "Nairobi, Kenya",
      rating: 5,
      text: "Broadpark felt like home. The rooms were spacious, the food was amazing, and the service was top-notch!",
      image: "/testimonial-1.jpg",
      date: "December 2024",
    },
    {
      id: 2,
      name: "Rev. David",
      location: "Kisumu, Kenya",
      rating: 5,
      text: "Perfect venue for our church retreat. The team went above and beyond",
      image: "/testimonial-2.jpg",
      date: "November 2024",
    },
    {
      id: 3,
      name: "Emily M",
      location: "Vihiga, Kenya",
      rating: 5,
      text: "A hidden gem in Vihiga County! The combination of modern amenities and local culture was perfect. The food was amazing and the views were breathtaking.",
      image: "/testimonial-3.jpg",
      date: "October 2024",
    },
  ];

  // Awards and Recognition
  const awards = [
    {
      name: "Best Hotel Vihiga County",
      year: "2024",
      organization: "Kenya Tourism Board",
    },
    {
      name: "Excellence in Service",
      year: "2023",
      organization: "Hospitality Awards Kenya",
    },
    {
      name: "Eco-Friendly Hotel",
      year: "2023",
      organization: "Green Tourism Kenya",
    },
    {
      name: "Business Hotel of the Year",
      year: "2022",
      organization: "Business Travel Awards",
    },
  ];

  // Certifications and Partnerships
  const certifications = [
    { name: "Kenya Tourism Board", logo: "/cert-ktb.png", verified: true },
    { name: "ISO 9001 Quality", logo: "/cert-iso.png", verified: true },
    { name: "Green Key Certified", logo: "/cert-green.png", verified: true },
    { name: "Safe Travels", logo: "/cert-safe.png", verified: true },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.8,
      });

      gsap.set(testimonialsRef.current?.children || [], {
        opacity: 0,
        x: -50,
      });

      gsap.set(awardsRef.current?.children || [], {
        opacity: 0,
        y: 20,
      });

      gsap.set(certificationsRef.current?.children || [], {
        opacity: 0,
        scale: 0.8,
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
          statsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          testimonialsRef.current?.children || [],
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          awardsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          certificationsRef.current?.children || [],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

      // Animate trust statistics counters
      trustStats.forEach((stat, index) => {
        const statElement =
          statsRef.current?.children[index]?.querySelector(".trust-number");
        if (statElement && !isNaN(parseFloat(stat.number))) {
          gsap.fromTo(
            statElement,
            { textContent: 0 },
            {
              textContent: parseFloat(stat.number),
              duration: 2,
              ease: "power2.out",
              snap: { textContent: stat.number.includes(".") ? 0.1 : 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                if (statElement) {
                  const value = this.targets()[0].textContent;
                  statElement.textContent =
                    (stat.number.includes(".")
                      ? parseFloat(value).toFixed(1)
                      : Math.ceil(value)) + stat.suffix;
                }
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [trustStats]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
            <span className="text-primary font-bold text-sm tracking-wider">
              TRUST & CREDIBILITY
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Trusted by <span className="text-primary">Thousands</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied guests who have experienced our
            exceptional hospitality, award-winning service, and commitment to
            excellence.
          </p>
        </div>

        {/* Trust Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {trustStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="trust-number text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {stat.number}
                {stat.suffix}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">
            What Our <span className="text-primary">Guests Say</span>
          </h3>

          <div
            ref={testimonialsRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-3xl rounded-bl-none shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative"
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Guest Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-gray-400">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards and Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Awards */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              <Award className="w-6 h-6 text-primary inline mr-2" />
              Awards & Recognition
            </h3>

            <div ref={awardsRef} className="space-y-4">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {award.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {award.organization} • {award.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              <Shield className="w-6 h-6 text-primary inline mr-2" />
              Certifications & Partners
            </h3>

            <div ref={certificationsRef} className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-center group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <Shield className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h4 className="font-medium text-gray-800 text-sm mb-1">
                    {cert.name}
                  </h4>
                  {cert.verified && (
                    <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                      <Shield className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Your Satisfaction is{" "}
              <span className="text-primary">Guaranteed</span>
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              We stand behind our service with a 100% satisfaction guarantee. If
              you're not completely satisfied with your stay, we'll make it
              right.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                Secure Booking
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                Quality Assured
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-500" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
