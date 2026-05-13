import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface ProductImage {
  id: number;
  image_url: string;
  alt_text?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const displayImages = images && images.length > 0 ? images : [
    { id: 1, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop" }
  ];

  return (
    <div className="space-y-6">
      {/* Main Image Slider */}
      <div className="relative group bg-white border-[3px] border-black shadow-brutal overflow-hidden">
        <Swiper
          modules={[Navigation, Thumbs, Pagination, Autoplay]}
          spaceBetween={0}
          navigation={displayImages.length > 1}
          pagination={{ 
            type: "fraction",
            renderFraction: function (currentClass, totalClass) {
              return '<span class="bg-black text-white px-4 py-2 border-2 border-white font-black text-[10px] uppercase tracking-widest ' + currentClass + '"></span>' +
                     ' <span class="text-black font-black mx-1">/</span> ' +
                     '<span class="bg-white text-black px-4 py-2 border-2 border-black font-black text-[10px] uppercase tracking-widest ' + totalClass + '"></span>';
            }
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="aspect-square"
        >
          {displayImages.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                src={image.image_url}
                alt={image.alt_text || productName}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails Slider */}
      {displayImages.length > 1 && (
        <div className="mt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={16}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="thumbs-swiper"
          >
            {displayImages.map((image) => (
              <SwiperSlide key={image.id} className="cursor-pointer">
                <div className="border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all overflow-hidden aspect-square opacity-60 [.swiper-slide-thumb-active_&]:opacity-100 [.swiper-slide-thumb-active_&]:border-primary [.swiper-slide-thumb-active_&]:shadow-brutal">
                  <img
                    src={image.image_url}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Custom styles for Swiper Brutalist theme */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: white;
          width: 50px;
          height: 50px;
          border: 2px solid black;
          color: black;
          box-shadow: 4px 4px 0px black;
          transition: all 0.2s;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px;
          font-weight: 900;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: black;
          color: white;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px black;
        }
        .swiper-button-next:active, .swiper-button-prev:active {
          transform: translate(2px, 2px);
          box-shadow: 0px 0px 0px black;
        }
        .swiper-pagination-fraction {
          bottom: 20px !important;
          right: 20px !important;
          left: auto !important;
          width: auto !important;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default ProductImageGallery;
