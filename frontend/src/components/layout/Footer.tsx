import { Share2, Globe, MessageCircle, ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t-4 border-black mt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6 group cursor-pointer">
              <div className="bg-black p-1 border-2 border-black">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-3xl font-black italic tracking-tighter">UTEShop</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-4 leading-loose">
              Phong cách Minimalism & Modern Retro <br/> cho giới trẻ hiện đại. Độc bản và cá tính.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-black text-xl mb-8 tracking-tighter italic">
              SUPPORT
            </h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-black">
              <li>
                <a href="#" className="hover:text-primary hover:underline decoration-2 transition-all">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline decoration-2 transition-all">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline decoration-2 transition-all">
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-black text-xl mb-8 tracking-tighter italic">
              COMPANY
            </h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-black">
              <li>
                <a href="#" className="hover:text-primary hover:underline decoration-2 transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline decoration-2 transition-all">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline decoration-2 transition-all">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-black text-xl mb-8 tracking-tighter italic">
              SOCIALS
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1"
              >
                <Share2 size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1"
              >
                <Globe size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-black/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <p>© 2026 UTEShop. All rights reserved.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
