import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useEsse3LoginForm } from "../hooks/esse3/useEsse3LoginForm";

export default function AboutWithLoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    showPassword,
    togglePassword,
    onSubmit,
  } = useEsse3LoginForm();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6">Accedi</Typography>

        {/* Email */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              type="username"
              error={!!errors.username}
              helperText={errors.username?.message}
              required
              fullWidth
              autoComplete="username"
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              required
              fullWidth
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Nascondi password" : "Mostra password"
                      }
                      onClick={togglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Remember me */}
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Ricordami"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ alignSelf: "flex-start" }}
        >
          {isSubmitting ? "Accesso..." : "Accedi"}
        </Button>
      </Box>
    </Container>
  );
}
