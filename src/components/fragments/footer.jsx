"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const showFooter =
    !pathname.startsWith("/admin") && !pathname.startsWith("/auth");
  return (
    <>
      {showFooter && (
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-400">Medi</span>
                  <span className="text-2xl font-bold text-white">Connect</span>
                </div>
                <p className="mt-4 text-gray-300">
                  Providing quality healthcare services through an innovative
                  digital platform. Connect with us for better health management
                  and medical care.
                </p>
                <div className="mt-6 flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-white"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-gray-300 hover:text-white"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/doctors"
                      className="text-gray-300 hover:text-white"
                    >
                      Doctors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/appointments"
                      className="text-gray-300 hover:text-white"
                    >
                      Janji Temu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/medical-reports"
                      className="text-gray-300 hover:text-white"
                    >
                      Riwayat Medis
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pharmacy"
                      className="text-gray-300 hover:text-white"
                    >
                      Apotek
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-300">
                      Jl. Kesehatan No. 123, Jakarta Selatan, DKI Jakarta, Indonesia
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-300">+62 21 1234 5678</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-300">info@mediconnect.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-8">
              <p className="text-center text-gray-400">
                &copy; {new Date().getFullYear()} MediConnect. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
