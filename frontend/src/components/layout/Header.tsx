import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, LogIn, Search } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="w-full bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row - Logo and main nav */}
        <div className="h-24 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-black p-1.5 border-2 border-black group-hover:bg-primary transition-colors">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif font-black text-3xl tracking-tighter italic">UTEShop</span>
            </Link>
 
            <nav className="hidden lg:flex space-x-10">
              <Link
                to="/products"
                className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-primary transition-colors"
              >
                Catalog
              </Link>
              <Link
                to="/products?sort=sold_count&order=DESC"
                className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-primary transition-colors"
              >
                Best Sellers
              </Link>
              <Link
                to="/products?is_promotional=true"
                className="text-xs font-black uppercase tracking-[0.2em] text-[#d97736] hover:text-black transition-colors"
              >
                Sale Off
              </Link>
              <Link
                to="/products?is_new=true"
                className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-primary transition-colors"
              >
                New In
              </Link>
            </nav>
          </div>
 
          <div className="flex items-center space-x-8">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH..."
                  className="px-4 py-2 pr-10 border-2 border-black bg-white focus:outline-none focus:shadow-brutal transition-all w-40 font-bold text-xs uppercase tracking-widest"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
 
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <button className="relative group">
                   <div className="bg-white border-2 border-black p-2 group-hover:shadow-brutal transition-all active:translate-x-0.5 active:translate-y-0.5">
                      <ShoppingCart size={20} className="text-black" />
                   </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-[10px] font-black border-2 border-white flex items-center justify-center">
                    0
                  </span>
                </button>
 
                <Link
                  to="/profile"
                  className="w-12 h-12 border-2 border-black overflow-hidden hover:shadow-brutal transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="User Avatar"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                  />
                </Link>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="bg-black text-white px-8 py-3 font-black text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all duration-300 active:translate-x-1 active:translate-y-1"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
 
        {/* Search bar for mobile */}
        <div className="md:hidden pb-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full px-4 py-3 pr-10 border-2 border-black bg-white focus:outline-none focus:shadow-brutal transition-all font-bold text-xs uppercase tracking-widest"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
