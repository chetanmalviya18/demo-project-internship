import { createUser } from "../services/user.service.js";
import db from "../models/index.cjs";

describe("User Service", () => {
  // Clean up test data after each test
  afterEach(async () => {
    await db.Profile.destroy({ where: {}, truncate: true, cascade: true });
    await db.User.destroy({ where: {}, truncate: true, cascade: true });
  });

  it("should create a user and profile", async () => {
    const userData = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "password123",
    };

    const user = await createUser(userData);

    expect(user).toHaveProperty("id");
    expect(user.firstName).toBe(userData.firstName);
    expect(user.lastName).toBe(userData.lastName);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBeUndefined();

    // Check that profile was created
    const profile = await db.Profile.findOne({ where: { userId: user.id } });
    expect(profile).not.toBeNull();
    expect(profile.bio).toContain("Test User");
  });

  it("should throw error if email already exists", async () => {
    const userData = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "password123",
    };

    await createUser(userData);

    await expect(createUser(userData)).rejects.toThrow(
      "Could not create user."
    );
  });
});
