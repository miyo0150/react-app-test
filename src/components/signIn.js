import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Credentials' }];

// List of test users
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Branding
const BRANDING = {
  logo: (
    <img
      src="https://försäkring.se/images/company-logos/folksam-forsakring-logotyp.png"
      alt="Folksam Logo"
      style={{ height: 100 }}
    />
  ),
  title: 'IDIT Test Suite',
};



// Sign-in function
const signIn = async (provider, { username, password }) => {
console.log('Received credentials:', { username, password });
console.log('Provider:', provider);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        console.log(`Sign in successful for user: ${username}`);
        resolve();
      } else {
        console.log(`Sign in failed for user: ${username}`);
        reject(new Error('Invalid credentials. Please try again.'));
      }
    }, 500);
  });
  return promise;
};

export default function BrandingSignInPage() {
  const theme = useTheme();
  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
            emailField: {
            name: 'username', 
            label: 'Username', 
            type: 'text', 
            },
            passwordField: {
            name: 'password',
            },
        }}
/>
    </AppProvider>
  );
}
