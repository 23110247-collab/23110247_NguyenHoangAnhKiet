import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "TÌM KIẾM SẢN PHẨM...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-24 border-2 border-black bg-white focus:outline-none focus:shadow-brutal transition-all font-bold text-sm uppercase tracking-widest placeholder:text-gray-300"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="bg-black text-white p-3 hover:bg-primary transition-colors border-2 border-black"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
