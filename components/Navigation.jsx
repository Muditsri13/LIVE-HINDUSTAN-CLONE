import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Briefcase, TrendingUp, Film, Trophy, Newspaper } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: 'मुख्य समाचार', icon: Newspaper, href: '/' },
    { name: 'राजनीति', icon: Briefcase, href: '/category/politics' },
    { name: 'व्यापार', icon: TrendingUp, href: '/category/business' },
    { name: 'मनोरंजन', icon: Film, href: '/category/entertainment' },
    { name: 'खेल', icon: Trophy, href: '/category/sports' },
    { name: 'अंतर्राष्ट्रीय', icon: Globe, href: '/category/international' },
  ];

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold hover:text-red-100 transition-colors">
              Live हिंदुस्तान
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center space-x-1 hover:text-red-200 transition-colors text-sm font-medium"
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-white text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors">
              ePaper
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-red-600">
          <div className="px-4 py-4 space-y-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center space-x-3 py-2 hover:bg-red-700 rounded-md px-3 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <cat.icon className="w-5 h-5" />
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
            <button className="w-full bg-white text-primary px-4 py-2 rounded-md text-sm font-semibold mt-4">
              ePaper
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}