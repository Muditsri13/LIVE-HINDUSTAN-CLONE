import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: 'हमारे बारे में', href: '/about' },
      { name: 'संपर्क करें', href: '/contact' },
      { name: 'विज्ञापन', href: '/advertise' },
      { name: 'करियर', href: '/careers' }
    ],
    legal: [
      { name: 'गोपनीयता नीति', href: '/privacy' },
      { name: 'उपयोग की शर्तें', href: '/terms' },
      { name: 'कुकी नीति', href: '/cookies' },
      { name: 'अस्वीकरण', href: '/disclaimer' }
    ],
    categories: [
      { name: 'राजनीति', href: '/category/politics' },
      { name: 'व्यापार', href: '/category/business' },
      { name: 'खेल', href: '/category/sports' },
      { name: 'मनोरंजन', href: '/category/entertainment' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Live हिंदुस्तान</h3>
            <p className="text-sm mb-4">
              भारत का भरोसेमंद समाचार स्रोत। ताज़ा खबरें, विश्लेषण और विशेष रिपोर्ट्स।
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">त्वरित लिंक</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">श्रेणियाँ</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">न्यूज़लेटर</h4>
            <p className="text-sm mb-4">दैनिक समाचार अपडेट के लिए सब्सक्राइब करें</p>
            <form className="flex">
              <input
                type="email"
                placeholder="आपका ईमेल"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-r-md transition-colors"
                aria-label="Subscribe"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs">
            {footerLinks.legal.map((link, idx) => (
              <span key={link.name} className="flex items-center">
                <Link 
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
                {idx < footerLinks.legal.length - 1 && (
                  <span className="mx-2 text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p>© {currentYear} Live हिंदुस्तान. सर्वाधिकार सुरक्षित।</p>
            <p className="text-xs text-gray-500 mt-2">
              Next.js Assignment Project - Educational Purpose Only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}