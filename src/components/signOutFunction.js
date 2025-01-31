import React from "react";
import { SignOutButton } from '@toolpad/core/Account';
import { Stack, Button } from '@mui/material';
import {
  ThemeSwitcher,
} from '@toolpad/core/DashboardLayout';
import { useNavigate } from "react-router-dom";


export default function ToolbarActionsSignOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

  return (
    <Stack direction="row">
      <div>
        <Button onClick={handleLogout}>
          <SignOutButton
            sx={{
              color: 'black', // Change text color
              backgroundColor: 'lightgrey', // Change background color
              '&:hover': {
                backgroundColor: 'darkblue', // Change background color on hover
              },
              padding: '5px 30px', // Add padding
              borderRadius: '5px', // Add border radius
              textTransform: 'capitalize', // Ensure text transform is applied
              fontWeight: 'normal', // Ensure font weight is applied
              filter: 'opacity(1)', // Ensure filter is applied
              transition: 'filter 0.2s ease-in', // Ensure transition is applied
            }}
          />
          </Button>
      </div>
      <ThemeSwitcher />
    </Stack>
  );
}