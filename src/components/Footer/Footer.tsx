import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300  mt-14">
      <div className="max-w-7xl mx-auto px-4 py-12 clear-both">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 " dir="rtl">
          {/* Company Info */}

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  עמוד הבית
                </a>
              </li>

              <li>
                <a href="/track" className="hover:text-white transition-colors">
                  מעקב משלוחים
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  צור קשר
                </a>
              </li>
              <li>
                <a
                  href="/system/login"
                  className="hover:text-white transition-colors"
                >
                  כניסת מערכת
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">צור קשר</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>03-1234567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>העופרים 38, גדרה</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">עקבו אחרינו</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Yarin Hershko. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
