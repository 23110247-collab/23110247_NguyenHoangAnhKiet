import db from "./src/models/index.js";
import bcrypt from "bcryptjs";

const { User, UserProfile } = db;

const seedUser = async () => {
  try {
    const password = "123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email: "nguyenhoanganhkiettg2005@gmail.com",
      phone: "0901234568",
      password: hashedPassword,
      role_id: 2,
      status: "ACTIVE",
    };

    // Create user or update if exists
    const [user, created] = await User.findOrCreate({
      where: { email: userData.email },
      defaults: userData,
    });

    if (!created) {
      await user.update(userData);
      console.log("User already existed, updated instead.");
    } else {
      console.log("User created successfully.");
    }

    // Create a basic profile for the user
    await UserProfile.findOrCreate({
      where: { user_id: user.id },
      defaults: {
        user_id: user.id,
        first_name: "Anh Kiệt",
        last_name: "Nguyễn Hoàng",
        avatar_url: "https://ui-avatars.com/api/?name=Anh+Kiet&background=random",
      },
    });

    console.log("User profile ensured.");
    console.log("✅ Custom user seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding custom user:", err);
    process.exit(1);
  }
};

seedUser();
