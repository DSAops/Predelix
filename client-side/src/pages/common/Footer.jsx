import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const creators = [
  {
    name: 'Anuj Sahu',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/anuj-sahu/',
  },
  {
    name: 'Saksham Gupta',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/saksham-gupta/',
  },
  {
    name: 'Devraj Patil',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/devraj-patil/',
  },
];

const links = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Pricing', href: '/pricing' },
  ],
  resources: [
    { name: 'Demo', href: '/demo' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Knowledge Base', href: '/knowledge-base' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-purple-200 mt-auto w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-600">Predelix</h2>
            <p className="text-zinc-600 text-sm">
              Next-generation Order Replenishment System with AI-powered stock prediction for modern retail.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/DSAops/Predelix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-purple-500 transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@predelix.com"
                className="text-zinc-400 hover:text-purple-300 transition"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-zinc-800 font-semibold uppercase tracking-wider text-sm">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-zinc-600 hover:text-purple-500 text-sm transition flex items-center"
                    >
                      {item.name}
                      {item.href.startsWith('http') && (
                        <ExternalLink className="ml-1 h-3 w-3" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Creators Section */}
        <div className="border-t border-purple-300 pt-8">
          <h3 className="text-zinc-800 font-semibold mb-6">Created By</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <div
                key={creator.name}
                className="flex items-center space-x-3 group"
              >
                <div className="flex-1">
                  <h4 className="text-zinc-800 font-medium">{creator.name}</h4>
                  <p className="text-zinc-600 text-sm">{creator.role}</p>
                </div>              <a
                href={creator.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-purple-300 transition p-2 rounded-full hover:bg-purple-900/20"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600">
          <p>© 2025 Predelix. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/DSAops/Predelix"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition flex items-center"
            >
              <Github className="h-4 w-4 mr-1" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
