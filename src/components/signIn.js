import React, { useState, useEffect } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const providers = [{ id: "credentials", name: "LDAP Authentication" }];

// Branding
const BRANDING = {
  logo: (
    <img
      src="https://försäkring.se/images/company-logos/folksam-forsakring-logotyp.png"
      alt="Folksam Logo"
      style={{ height: 100 }}
    />
  ),
  title: "IDIT Test Suite",
};

export default function BrandingSignInPage({ onSignIn }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Auto-check authentication status
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("🛠️ Debug: Checking authentication status. User:", user);
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Sign-in function
  const signIn = async (provider, credentials) => {
    const formData = Object.fromEntries(credentials.entries());
    console.log("🛠️ Debug: Received form data:", formData);

    const username = formData.username;
    const password = formData.password;

    if (!username || !password) {
      console.error("❌ Missing username or password!");
      setError("Username and password are required.");
      return Promise.reject(new Error("Username and password are required."));
    }

    try {
      setIsLoading(true);
      const payload = { username, password };
      console.log("🛠️ Debug: Sending LDAP payload:", payload);

      const response = await axios.post("http://localhost:5000/api/auth/login", payload);

      console.log("✅ Login successful:", response.data);

      // ✅ Store user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("🛠️ Debug: User stored in localStorage");

      // ✅ Navigate to dashboard
      onSignIn();
      navigate("/dashboard");

      return Promise.resolve();
    } catch (error) {
      console.error("❌ Sign-in failed:", error.response?.data || error.message);
      setError("Invalid credentials. Please try again.");
      return Promise.reject(new Error("Invalid credentials. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { name: "username", label: "Username", type: "text" },
          passwordField: { name: "password" },
        }}
      />
      {isLoading && <p>🔄 Logging in...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </AppProvider>
  );
}