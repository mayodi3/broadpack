"use client";

import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileDropdown = (dropdown: string) => {
    setActiveMobileDropdown(
      activeMobileDropdown === dropdown ? null : dropdown
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gallery dropdown items
  const galleryItems = [
    { name: "Gallery", href: "/gallery" },
    { name: "Attractions", href: "/attractions" },
  ];

  // Services dropdown items

  const servicesItems = [
    { name: "Rooms", href: "/rooms" },
    { name: "Menu", href: "/menu" },
    { name: "Bar", href: "/bar" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  // Standalone pages (no dropdown)
  const standalonePages = [
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="bg-slate-800 text-white relative z-50">
      {/* Top bar */}
      <div className="hidden md:block bg-slate-700 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>info@broadparkhotels.co.ke</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>0719 651 708 / 0788 555 999</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="#">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="#">
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="#">
              <Image
                src="/google-business.png"
                alt="Google Business"
                width={20}
                height={20}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-slate-800 py-4" ref={dropdownRef}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">
            BROADPARK HOTELS
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary transition-colors">
              HOME
            </Link>

            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              ABOUT
            </Link>

            {/* Gallery dropdown */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer hover:text-primary transition-colors"
                onClick={() => toggleDropdown("GALLERY")}
              >
                <span>GALLERY</span>
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform ${
                    activeDropdown === "GALLERY" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "GALLERY" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 text-primary font-extrabold shadow-lg py-2 z-50">
                  {galleryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-600 hover:text-primary transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services dropdown */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer hover:text-primary transition-colors"
                onClick={() => toggleDropdown("SERVICES")}
              >
                <span>SERVICES</span>
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform ${
                    activeDropdown === "SERVICES" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "SERVICES" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 text-primary font-extrabold shadow-lg py-2 z-50">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-600 hover:text-primary transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Standalone pages */}
            {standalonePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="hover:text-primary transition-colors"
              >
                {page.name.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-2 space-y-4 border-t border-slate-700 mt-4">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block text-white hover:text-primary transition-colors"
            >
              HOME
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block text-white hover:text-primary transition-colors"
            >
              ABOUT
            </Link>

            {/* Gallery mobile dropdown */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                onClick={() => toggleMobileDropdown("GALLERY")}
              >
                <span>GALLERY</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeMobileDropdown === "GALLERY" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeMobileDropdown === "GALLERY" && (
                <div className="mt-2 ml-4 space-y-2">
                  {galleryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block text-sm text-gray-300 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services mobile dropdown */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                onClick={() => toggleMobileDropdown("SERVICES")}
              >
                <span>SERVICES</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeMobileDropdown === "SERVICES" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeMobileDropdown === "SERVICES" && (
                <div className="mt-2 ml-4 space-y-2">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block text-sm text-gray-300 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Standalone pages in mobile */}
            {standalonePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={closeMobileMenu}
                className="block text-white hover:text-primary transition-colors"
              >
                {page.name.toUpperCase()}
              </Link>
            ))}

            {/* Mobile contact & social */}
            <div className="pt-4 space-y-3 border-t border-slate-700">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@broadparkhotels.co.ke</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>0719 651 708 / 0788 555 999</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Link href="#" onClick={closeMobileMenu}>
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="#" onClick={closeMobileMenu}>
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="#" onClick={closeMobileMenu}>
                  <Image
                    src="/google-business.png"
                    alt="Google Business"
                    width={20}
                    height={20}
                    className="hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
