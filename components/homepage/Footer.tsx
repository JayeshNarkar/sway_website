import { Instagram, Mail } from "lucide-react";
import FooterClientAnimated from "./FooterClientAnimated";

function Footer() {
  return (
    <footer className="border-t-2 border-gray-500 w-full bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between mb-6">
          <FooterClientAnimated />

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://www.instagram.com/sway.cult"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="mailto:swayy.infoo@gmail.com"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about-us"
                  className="text-gray-600 hover:text-gray-900"
                >
                  About Us
                </a>
              </li>
              {/* <li>
                <a href="/shop" className="text-gray-600 hover:text-gray-900">
                  Shop
                </a>
              </li> */}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: swayy.infoo@gmail.com</li>
              {/* <li className="text-gray-600">Phone: +91 12345 67890</li> */}
              <li className="text-gray-600">Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Sway. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
