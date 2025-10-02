// Footer.tsx
import { Link } from "react-router-dom";
import starImg from "@/assets/star.avif";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { UIConfig } from "@/shared/config/uiConfig"; // adjust path as needed
import { Marquee } from "@/shared/components/ui/marquee";

const socialIcons: Record<string, React.ReactElement> = {
  facebook: (
    <Facebook className="h-5 w-5 text-muted-foreground hover:text-[#DD2D65] cursor-pointer transition-colors" />
  ),
  twitter: (
    <Twitter className="h-5 w-5 text-muted-foreground hover:text-[#DD2D65] cursor-pointer transition-colors" />
  ),
  instagram: (
    <Instagram className="h-5 w-5 text-muted-foreground hover:text-[#DD2D65] cursor-pointer transition-colors" />
  ),
};

export default function Footer() {
  const { footer } = UIConfig;

  return (
    <>
      <section className="bg-[#0B0B0B] w-full p-5">
        <Marquee className="text-[#ffffff]">
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-2xl">Free Delivery</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-2xl">Get In Touch</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-2xl">Fashion</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-2xl">Sale</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-2xl">Exciting offers</h5>
          </div>
        </Marquee>
      </section>
      <footer className="border-t bg-[#0B0B0B] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src={footer.company.logo.src}
                  alt={footer.company.name}
                  width={footer.company.logo.width}
                  height={footer.company.logo.height}
                  className="object-contain "
                />
              </div>
              <p className="text-muted-foreground color-[#666666]">
                {footer.company.description}
              </p>
              <div className="flex space-x-4">
                {footer.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialIcons[link.type]}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                {footer.quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-[#DD2D65] transition-colors color-[#666666]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Customer Service
              </h3>
              <ul className="space-y-2">
                {footer.customerService.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-[#DD2D65] transition-colors color-[#666666]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {footer.contactInfo.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {footer.contactInfo.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {footer.contactInfo.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">{footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footer.bottomLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.href}
                  className="text-muted-foreground hover:text-[#DD2D65] text-sm transition-colors color-[#666666]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
