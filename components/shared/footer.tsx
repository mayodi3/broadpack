import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="bg-primary p-6 mb-6">
              <h2 className="text-3xl font-bold text-black mb-4">BROADPARK</h2>
              <p className="text-black text-sm leading-relaxed">
                At BROADPARK, we blend comfort, elegance, and personalized
                hospitality to create memorable stays for every guest.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-primary text-lg font-semibold mb-6 relative">
              CONTACT
              <span className="absolute left-0 bottom-[-8px] w-12 h-0.5 bg-primary"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">Mbale Town, Vihiga County</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">0719 651 708 / 0788 555 9990</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">info@broadparkhotels.co.ke</span>
              </div>
            </div>

            <div className="flex items-end space-x-3 mt-6">
              <Link href="#">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                />
              </Link>
              <Link href="#">
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                />
              </Link>

              <Link href="#">
                <Image
                  src="/google-business.png"
                  alt="Google Business"
                  width={32}
                  height={32}
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                />
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-primary text-lg font-semibold mb-6 relative">
              COMPANY
              <span className="absolute left-0 bottom-[-8px] w-12 h-0.5 bg-primary"></span>
            </h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">About Us</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Contact Us</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Privacy Policy</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Terms & Condition</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Support</span>
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-primary text-lg font-semibold mb-6 relative">
              SERVICES
              <span className="absolute left-0 bottom-[-8px] w-12 h-0.5 bg-primary"></span>
            </h3>
            <div className="space-y-3">
              <Link
                href="/menu"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Food & Restaurant</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Spa & Fitness</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Sports & Gaming</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">Event & Party</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="text-primary">{">"}</span>
                <span className="text-sm">GYM & Yoga</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © <span className="text-primary">BROADPARK HOTELS</span>, All
              Right Reserved. Designed By
              <Link
                className="text-primary"
                href="https://starbornlabkenya.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                starbornlabkenya
              </Link>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/"
                className="cursor-pointer hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="cursor-pointer hover:text-primary transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/faq"
                className="cursor-pointer hover:text-primary transition-colors"
              >
                Help
              </Link>
              <Link
                href="/faq"
                className="cursor-pointer hover:text-primary transition-colors"
              >
                FQAs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
