"use client";

import { blogs } from "@/app/blogs/blogs";
import BlogCard from "@/components/shared/blog-card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, Calendar, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LatestBlogSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const blogsGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(blogsGridRef.current?.children || [], {
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
          blogsGridRef.current?.children || [],
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
  }, [blogs]);

  const latestBlogs = blogs.slice(0, 3);
  // Blog statistics
  const blogStats = [
    {
      icon: BookOpen,
      number: blogs?.length,
      label: "Blog Posts",
    },
    {
      icon: TrendingUp,
      number: "10K+",
      label: "Monthly Readers",
    },
  ];

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
              LATEST INSIGHTS
            </span>
            <div className="h-[3px] w-12 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            From Our <span className="text-primary">Blog</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, travel tips, culinary insights,
            and stories from BROADPARK HOTELS and the beautiful Vihiga County.
          </p>
        </div>

        {/* Blog Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto mb-16">
          {blogStats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              Loading latest posts...
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {!isLoading && (
          <div
            ref={blogsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {latestBlogs?.map((blog, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                <BlogCard blog={blog} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!isLoading && (
          <div ref={ctaRef} className="text-center">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Explore More <span className="text-primary">Stories</span>
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                Discover more insights, travel guides, and behind-the-scenes
                stories from BROADPARK HOTELS and the vibrant culture of Vihiga
                County.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/blogs")}
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  View All Posts
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  onClick={() => router.push("/newsletter")}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Subscribe to Updates
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogSection;
