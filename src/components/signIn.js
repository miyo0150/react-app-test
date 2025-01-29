import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const providers = [{ id: "credentials", name: "Credentials" }];

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
  // const [isLoading, setState] = useState(false);
  const signIn = async (provider, credentials) => {
    // Convert FormData to a normal JavaScript object
    const formData = Object.fromEntries(credentials.entries());

    console.log("🛠️ Debug: Received form data:", formData); // Now it will show values

    const username = formData.username;
    const password = formData.password;

    if (!username || !password) {
        console.error("❌ Missing username or password!");
        return Promise.reject(new Error("Username and password are required."));
    }

    try {
        const payload = { email: username, password };
        console.log("🛠️ Debug: Sending payload:", payload);

        //genom usestate skapa variabel isLoading, klicka login = isLoading (true)

        const response = await axios.post("http://localhost:5000/api/users/login", payload);

        console.log("✅ Login successful:", response.data);

        localStorage.setItem("user", JSON.stringify(response.data));

        onSignIn();
        navigate("/dashboard");

        return Promise.resolve();
    } catch (error) {
        console.error("❌ Sign-in failed:", error.response?.data || error.message);
        return Promise.reject(new Error("Invalid credentials. Please try again."));
    }
};

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
      signIn={signIn}
      providers={providers}
      slotProps={{
        emailField: {
          name: "username",  // Make sure this maps correctly
          label: "Username",
          type: "text",
        },
        passwordField: {
          name: "password",
        },
      }}
      />
    </AppProvider>
  );
}
