import { Alert, Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import  { FC, useState } from "react";
import { User } from "../../types/auth";
import { login } from "../../controllers/Auth";

interface LoginProps {
  onLogin?: (user: User) => void;
}

const Login: FC<LoginProps> = (props) => {
  const [error, setError] = useState<string>();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const form = {
        username: values.username,
        password: values.password,
      };
      console.log(values);
      login(form)
        .then(({ data }) => props.onLogin?.(data))
        .catch((error) => {
          setError(
            error.response.data.issues?.[0]?.message || error.response.data
          );
        });
    },
  });
  return (
    <Box>
      {error && (
        <Alert
          onClose={() => setError("")}
          sx={{ marginBottom: 2 }}
          severity="error"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="username"
          fullWidth
          label="Username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          variant="outlined"
          sx={{ marginY: 1 }}
        />
        <TextField
          id="password"
          fullWidth
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          variant="outlined"
          sx={{ marginY: 1 }}
        />
        <Button fullWidth variant="contained" sx={{ marginY: 1 }} type="submit">
          Giriş Yap
        </Button>
      </form>
    </Box>
  );
};

export default Login;
