import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import productApi from "../services/productApi";
import ProductImageGallery from "../components/ui/ProductImageGallery";
import ProductCard from "../components/ui/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  discount_percent?: number;
  stock_quantity: number;
  sold_count: number;
  rating: number;
  category: {
    id: number;
    name: string;
  };
  images: Array<{
    id: number;
    image_url: string;
    alt_text?: string;
  }>;
  is_new?: boolean;
  is_featured?: boolean;
  is_promotional?: boolean;
}

interface SimilarProduct {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
  discount_percent?: number;
  rating: number;
  sold_count: number;
  images?: Array<{
    image_url: string;
    alt_text?: string;
  }>;
}

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);

        const [productRes, similarRes] = await Promise.all([
          productApi.getProductById(parseInt(id)),
          productApi.getSimilarProducts(parseInt(id), 4),
        ]);

        if (productRes.data?.status === 200 && productRes.data?.data) {
          setProduct(productRes.data.data);
        } else {
          setError("Sản phẩm không tìm thấy");
          navigate("/products");
        }

        setSimilarProducts(similarRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Lỗi khi tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  const displayPrice = product.discount_price || product.price;
  const originalPrice = product.price;
  const discount = product.discount_percent || 0;
  const inStock = product.stock_quantity > 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${product.id} to cart`);
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-black hover:underline">
            Home
          </button>
          <span className="text-black">/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-black hover:underline"
          >
            Catalog
          </button>
          <span className="text-black">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white border-[3px] border-black shadow-brutal-lg p-10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <div className="border-r-0 lg:border-r-2 lg:border-black lg:pr-16">
              <ProductImageGallery
                images={product.images || []}
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <div>
              {/* Title and Badges */}
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  {product.is_new && (
                    <span className="bg-black text-white px-3 py-1 border-2 border-white text-[10px] font-black uppercase tracking-widest">
                      New Arrival
                    </span>
                  )}
                  {product.is_promotional && discount > 0 && (
                    <span className="bg-[#d97736] text-white px-3 py-1 border-2 border-black text-[10px] font-black uppercase tracking-widest">
                      -{discount}% Off
                    </span>
                  )}
                </div>
                <h1 className="text-5xl font-bold font-serif text-black mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6 text-sm">
                   <div className="flex items-center gap-1 font-black">
                      <Star size={16} className="fill-black" />
                      {Number(product.rating || 0).toFixed(1)}
                   </div>
                   <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                   <div className="font-bold text-gray-500 uppercase tracking-tighter">
                      Sold: {product.sold_count}
                   </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-10 p-6 bg-[#faf9f6] border-2 border-black shadow-brutal flex items-baseline gap-6">
                  <span className="text-5xl font-black text-black">
                    {formatPrice(displayPrice)}
                  </span>
                  {discount > 0 && (
                    <span className="text-2xl text-gray-400 line-through font-bold italic">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
              </div>

              {/* Stock Info */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-widest">Availability:</span>
                  <span
                    className={`text-xs font-black uppercase tracking-widest ${
                      inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {inStock ? `${product.stock_quantity} In Stock` : "Out of Stock"}
                  </span>
                </div>
                {inStock && (
                  <div className="w-full bg-white border-2 border-black h-4 p-0.5">
                    <div
                      className="bg-black h-full transition-all duration-1000"
                      style={{
                        width: `${Math.min((product.stock_quantity / 100) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Description</h3>
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-10">
                <label className="block text-xs font-black uppercase tracking-widest mb-4">
                  Quantity
                </label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border-2 border-black bg-white">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-black hover:text-white transition-colors disabled:opacity-20"
                    >
                      <Minus size={20} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      min="1"
                      max={product.stock_quantity}
                      className="w-16 text-center border-none focus:outline-none font-black text-xl"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock_quantity}
                      className="p-3 hover:bg-black hover:text-white transition-colors disabled:opacity-20"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-grow bg-black text-white py-5 font-black uppercase tracking-[0.2em] text-sm hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1 disabled:bg-gray-300 disabled:shadow-none flex items-center justify-center gap-4"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-5 border-2 border-black bg-white hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1">
                  <Heart size={24} className="text-black" />
                </button>
                <button className="p-5 border-2 border-black bg-white hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1">
                  <Share2 size={24} className="text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center justify-between mb-10 border-b-4 border-black pb-4">
               <h2 className="text-4xl font-bold font-serif italic">You might also like</h2>
               <Link to="/products" className="text-sm font-black uppercase tracking-widest hover:underline">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
