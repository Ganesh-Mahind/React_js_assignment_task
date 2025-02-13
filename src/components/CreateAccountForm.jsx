// src/components/CreateAccountForm.jsx
import React from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "../features/tableSlice";

export default function CreateAccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log("New Account Data:", data);
    alert("Account created successfully!");
    dispatch(addRow({ id: Date.now().toString(), ...data })); // Use a unique id based on timestamp
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Create New Account
      </Typography>
      <TextField
        label="Account Name"
        fullWidth
        margin="normal"
        {...register("AccountName", { required: "Account Name is required" })}
        error={Boolean(errors.accountName)}
        helperText={errors.accountName?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Invalid email address",
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <TextField
        label="Phone No"
        fullWidth
        margin="normal"
        {...register("phone", {
          required: "Phone number is required",
          pattern: { value: /^[0-9]+$/, message: "Phone number must contain only numbers" },
        })}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
      />
      <TextField
        label="Website"
        fullWidth
        margin="normal"
        {...register("website", {
          required: "Website is required",
          pattern: {
            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: "Invalid website URL",
          },
        })}
        error={Boolean(errors.website)}
        helperText={errors.website?.message}
      />
      <TextField
        label="Industry"
        fullWidth
        margin="normal"
        {...register("industry", { required: "Industry is required" })}
        error={Boolean(errors.industry)}
        helperText={errors.industry?.message}
      />
      <TextField
        label="Account Status"
        fullWidth
        margin="normal"
        select
        {...register("accountStatus", { required: "Account Status is required" })}
        error={Boolean(errors.accountStatus)}
        helperText={errors.accountStatus?.message}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
      <TextField
        label="Remark"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        {...register("remark")}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
