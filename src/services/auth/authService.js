import { firebaseService } from "@/lib/firebase/service";
import { compare } from "bcryptjs";

export const authService = {
  async authenticateUser(email, password) {
    if (!email || !password) {
      throw new Error("Please enter both email and password");
    }

    try {
      const querySnapshot = await firebaseService.queryDocument(
        "users",
        "email",
        email
      );

      if (querySnapshot.length === 0) {
        throw new Error("Invalid email or password");
      }

      const userDoc = querySnapshot[0];
      const user = userDoc;

      if (!user.password) {
        throw new Error("Invalid email or password");
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      return user;
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error(error.message || "Authentication failed");
    }
  },
};
