import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { FC, useState } from "react"
import {User} from "../../types/auth"
import { register} from "../../controllers/Auth"


interface RegisterProps {
  onRegister?: (user: User) => void
}

const Register: FC<RegisterProps> = (props) => {
  const [error, setError] = useState<string>()
    const formik = useFormik({
        initialValues: {
            username: "",
          password: "",
          passwordConfirm: "",
        },
        onSubmit: (values) => {
          const form ={
            username : values.username,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }
          console.log(values);
          register(form).then(({ data }) => props.onRegister?.(data))
          .catch((error) => {
            setError(
              error.response.data.issues?.[0]?.message || error.response.data
            )
          })
        
        },
      });
  return (
    <Box>
          <form onSubmit={formik.handleSubmit}>
      <TextField
        id="password"
        fullWidth
        label="name"
        name="username"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.username}
        sx={{ marginY: 1 }}
      />
      <TextField
        id="password"
        fullWidth
        label="Password"
        type="password"
        name="password"
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        sx={{ marginY: 1 }}
      />
      <TextField
        id="password"
        fullWidth
        label="Password confirm"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.passwordConfirm}
        name="passwordConfirm"
        variant="outlined"
        sx={{ marginY: 1 }}
      />
      <Button fullWidth variant="contained" sx={{ marginY: 1 }}  type="submit">
        Kayıt Ol
      </Button>
      </form>
    </Box>
  );
}

export default Register;
