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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const signIn = async (provider, credentials) => {
    const formData = Object.fromEntries(credentials.entries());
    const username = formData.username;
    const password = formData.password;

    try {
      setIsLoading(true);
      const payload = { username, password };

      const response = await axios.post("http://localhost:5000/api/auth/login", payload);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      onSignIn();
      navigate("/dashboard");

      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      setError("Invalid credentials. Please try again.");
      // return Promise.reject(new Error("Invalid credentials. Please try again."));
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
          emailField: { name: "username", label: "Username", type: "text", error: error},
          passwordField: { name: "password", helperText: error, error: error},
          submitButton: {
            loading: isLoading,
          },
        }}
      />
    </AppProvider>
  );
}