import AboutSection from "@/components/home/about-section";
import LatestBlogSection from "@/components/home/blog-section";
import ExperienceHighlightsSection from "@/components/home/experience-highlights-section";
import FAQSection from "@/components/home/faq-section";
import HeroSection from "@/components/home/hero";
import LocationSection from "@/components/home/location-section";
import NewsletterSection from "@/components/home/newsletter-section";
import RoomSection from "@/components/home/rooms-section";
import ServiceSection from "@/components/home/services-section";
import SpecialOffersSection from "@/components/home/special-offers-section";
import TeamSection from "@/components/home/team-section";
import TrustSection from "@/components/home/trust-section";
import VideoSection from "@/components/home/video-section";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-screen">
        <HeroSection />
        <div className="mx-5 space-y-14">
          <AboutSection />
          <TrustSection />
          <LocationSection />
          <SpecialOffersSection />
          <RoomSection />
          <VideoSection />
          <ServiceSection />
          <ExperienceHighlightsSection />
          <TeamSection />
          <LatestBlogSection />
          <NewsletterSection />
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
