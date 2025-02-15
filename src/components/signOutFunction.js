import { Stack } from "@mui/material";
import { SignOutButton, ThemeSwitcher } from "@toolpad/core";

export default function ToolbarActionsSignOut() {

  const logout = () => {
    localStorage.clear();
  };

  return (
    <Stack direction="row">
    <SignOutButton onClick={logout}
      sx={{
        mr: 1,
      }}
    />
    <ThemeSwitcher/>
    </Stack>
  );
}