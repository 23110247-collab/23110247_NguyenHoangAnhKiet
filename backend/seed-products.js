import db from "./src/models/index.js";

const { Product, ProductCategory, ProductImage } = db;

const seedProducts = async () => {
  try {
    // Create categories
    const categories = await ProductCategory.bulkCreate(
      [
        {
          name: "Điện thoại",
          description: "Điện thoại di động thông minh",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Laptop",
          description: "Máy tính xách tay",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tai nghe",
          description: "Tai nghe không dây và có dây",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Máy tính bảng",
          description: "Tablet và iPad",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Categories seeded:", categories.length);

    // Sample products data
    const productsData = [
      // Smartphones
      {
        name: "iPhone 15 Pro Max",
        description: "Điện thoại flagship mới nhất từ Apple với chip A17 Pro, camera 48MP và màn hình Super Retina XDR.",
        price: 29990000,
        discount_price: 26990000,
        discount_percent: 10,
        stock_quantity: 50,
        sold_count: 245,
        rating: 4.8,
        category_id: 1,
        is_new: true,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description: "Điện thoại flagship Android với AI features, camera 200MP, pin 5000mAh.",
        price: 24990000,
        discount_price: 22990000,
        discount_percent: 8,
        stock_quantity: 45,
        sold_count: 328,
        rating: 4.7,
        category_id: 1,
        is_new: true,
        is_featured: true,
        is_promotional: false,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Xiaomi 14 Ultra",
        description: "Smartphone cao cấp với camera Leica, chip Snapdragon 8 Gen 3 Leading.",
        price: 15990000,
        discount_price: 13990000,
        discount_percent: 12,
        stock_quantity: 60,
        sold_count: 456,
        rating: 4.6,
        category_id: 1,
        is_new: false,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "OnePlus 12",
        description: "Điện thoại gaming với màn hình 120Hz, RAM 12GB, chip Snapdragon 8 Gen 3.",
        price: 12990000,
        discount_price: 11490000,
        discount_percent: 11,
        stock_quantity: 70,
        sold_count: 512,
        rating: 4.5,
        category_id: 1,
        is_new: false,
        is_featured: false,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Oppo Find X7 Ultra",
        description: "Smartphone với thiết kế cao cấp, camera 50MP f/1.6, sạc nhanh 100W.",
        price: 13990000,
        discount_price: 12490000,
        discount_percent: 11,
        stock_quantity: 55,
        sold_count: 389,
        rating: 4.6,
        category_id: 1,
        is_new: true,
        is_featured: true,
        is_promotional: false,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Laptops
      {
        name: "MacBook Pro 16 M3 Max",
        description: "Laptop cao cấp từ Apple với chip M3 Max, RAM 36GB, SSD 1TB, GPU 40 core.",
        price: 48990000,
        discount_price: 44990000,
        discount_percent: 8,
        stock_quantity: 20,
        sold_count: 95,
        rating: 4.9,
        category_id: 2,
        is_new: true,
        is_featured: true,
        is_promotional: false,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Dell XPS 15 Plus",
        description: "Laptop gaming/design cao cấp với RTX 4070, chip Intel Core i9, màn hình OLED.",
        price: 35990000,
        discount_price: 32990000,
        discount_percent: 8,
        stock_quantity: 25,
        sold_count: 167,
        rating: 4.7,
        category_id: 2,
        is_new: false,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "ASUS VivoBook 15",
        description: "Laptop mỏng nhẹ đa năng với chip Ryzen 7, RAM 16GB, SSD 512GB.",
        price: 12990000,
        discount_price: 10990000,
        discount_percent: 15,
        stock_quantity: 40,
        sold_count: 298,
        rating: 4.4,
        category_id: 2,
        is_new: false,
        is_featured: false,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Laptop doanh nhân bền bỉ với chip Intel Core i7, pin 60+ giờ.",
        price: 32990000,
        discount_price: 29990000,
        discount_percent: 9,
        stock_quantity: 30,
        sold_count: 213,
        rating: 4.6,
        category_id: 2,
        is_new: true,
        is_featured: true,
        is_promotional: false,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Headphones
      {
        name: "AirPods Pro 2",
        description: "Tai nghe không dây với ANC chủ động, spatial audio, chip H2.",
        price: 7490000,
        discount_price: 6490000,
        discount_percent: 13,
        stock_quantity: 80,
        sold_count: 1245,
        rating: 4.8,
        category_id: 3,
        is_new: false,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sony WH-1000XM5",
        description: "Tai nghe over-ear cao cấp với ANC tốt nhất, pin 30 giờ.",
        price: 8990000,
        discount_price: 7890000,
        discount_percent: 12,
        stock_quantity: 50,
        sold_count: 876,
        rating: 4.9,
        category_id: 3,
        is_new: false,
        is_featured: true,
        is_promotional: false,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bose QuietComfort Ultra",
        description: "Tai nghe cao cấp với công nghệ Immersion, fit thoải mái.",
        price: 7990000,
        discount_price: 6990000,
        discount_percent: 12,
        stock_quantity: 45,
        sold_count: 654,
        rating: 4.7,
        category_id: 3,
        is_new: true,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Samsung Galaxy Buds2 Pro",
        description: "Tai nghe không dây với ANC, design nhỏ gọn, sạc nhanh.",
        price: 4490000,
        discount_price: 3490000,
        discount_percent: 22,
        stock_quantity: 100,
        sold_count: 1876,
        rating: 4.5,
        category_id: 3,
        is_new: false,
        is_featured: false,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Tablets
      {
        name: "iPad Pro 12.9 M2",
        description: "Máy tính bảng cao cấp với chip M2, màn hình 120Hz, hỗ trợ Apple Pencil.",
        price: 26990000,
        discount_price: 24990000,
        discount_percent: 7,
        stock_quantity: 25,
        sold_count: 145,
        rating: 4.8,
        category_id: 4,
        is_new: false,
        is_featured: true,
        is_promotional: false,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Samsung Galaxy Tab S9 Ultra",
        description: "Tablet premium với AMOLED 120Hz, chip Snapdragon 8 Gen 2, bút S Pen.",
        price: 21990000,
        discount_price: 19990000,
        discount_percent: 9,
        stock_quantity: 30,
        sold_count: 198,
        rating: 4.7,
        category_id: 4,
        is_new: false,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "iPad Air 6 (2024)",
        description: "Tablet mạnh mẽ với chip M2, PIN từ 256GB, WiFi + Cellular.",
        price: 18990000,
        discount_price: 16990000,
        discount_percent: 10,
        stock_quantity: 35,
        sold_count: 267,
        rating: 4.6,
        category_id: 4,
        is_new: true,
        is_featured: true,
        is_promotional: true,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Create products
    const products = await Product.bulkCreate(productsData, {
      ignoreDuplicates: true,
    });

    console.log("Products seeded:", products.length);

    // Create product images
    const imagesData = [
      // iPhone 15 Pro Max - 2 images
      {
        product_id: 1,
        image_url: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop",
        alt_text: "iPhone 15 Pro Max - Front view",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 1,
        image_url: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop",
        alt_text: "iPhone 15 Pro Max - Back view",
        is_thumbnail: false,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Samsung Galaxy S24 Ultra
      {
        product_id: 2,
        image_url: "https://images.unsplash.com/photo-1511454612769-005cc4b27444?w=500&h=500&fit=crop",
        alt_text: "Samsung Galaxy S24 Ultra",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Xiaomi 14 Ultra
      {
        product_id: 3,
        image_url: "https://images.unsplash.com/photo-1515706688717-fa886益809c?w=500&h=500&fit=crop",
        alt_text: "Xiaomi 14 Ultra",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // OnePlus 12
      {
        product_id: 4,
        image_url: "https://images.unsplash.com/photo-1520275335684-36ca6489cb3d?w=500&h=500&fit=crop",
        alt_text: "OnePlus 12",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Oppo Find X7 Ultra
      {
        product_id: 5,
        image_url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
        alt_text: "Oppo Find X7 Ultra",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // MacBook Pro 16 M3 Max
      {
        product_id: 6,
        image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
        alt_text: "MacBook Pro 16",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Dell XPS 15 Plus
      {
        product_id: 7,
        image_url: "https://images.unsplash.com/photo-1588872657840-790ff3ec4ef0?w=500&h=500&fit=crop",
        alt_text: "Dell XPS 15 Plus",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ASUS VivoBook 15
      {
        product_id: 8,
        image_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
        alt_text: "ASUS VivoBook 15",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Lenovo ThinkPad X1 Carbon
      {
        product_id: 9,
        image_url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop",
        alt_text: "Lenovo ThinkPad X1 Carbon",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // AirPods Pro 2
      {
        product_id: 10,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        alt_text: "AirPods Pro 2",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Sony WH-1000XM5
      {
        product_id: 11,
        image_url: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop",
        alt_text: "Sony WH-1000XM5",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Bose QuietComfort Ultra
      {
        product_id: 12,
        image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
        alt_text: "Bose QuietComfort Ultra",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Samsung Galaxy Buds2 Pro
      {
        product_id: 13,
        image_url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop",
        alt_text: "Samsung Galaxy Buds2 Pro",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // iPad Pro 12.9 M2
      {
        product_id: 14,
        image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        alt_text: "iPad Pro 12.9",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Samsung Galaxy Tab S9 Ultra
      {
        product_id: 15,
        image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
        alt_text: "Samsung Galaxy Tab S9 Ultra",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // iPad Air 6 (2024)
      {
        product_id: 16,
        image_url: "https://images.unsplash.com/photo-1542716278-ca282fc2d38d?w=500&h=500&fit=crop",
        alt_text: "iPad Air 6 (2024)",
        is_thumbnail: true,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await ProductImage.bulkCreate(imagesData, {
      ignoreDuplicates: true,
    });

    console.log("Product images seeded:", imagesData.length);
    console.log("✅ Products and categories seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};

seedProducts();
