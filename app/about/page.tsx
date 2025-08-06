import AboutSection from "@/components/home/about-section";
import React from "react";
import AboutCards from "./about-cards";
import WhyChooseUsSection from "./why-choose-us";
import TeamSection from "@/components/home/team-section";
import Hero from "@/components/shared/hero";

const AboutPage = () => {
  return (
    <div>
      <Hero />
      <div className="mx-5 my-5">
        <AboutSection />
        <AboutCards />
        <WhyChooseUsSection />
        <TeamSection />
      </div>
    </div>
  );
};

export default AboutPage;
