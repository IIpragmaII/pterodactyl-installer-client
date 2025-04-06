import {
  ThemeProvider,
  CssBaseline,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import theme from "./theme";
import { MuiFileInput } from "mui-file-input";
import moment from "moment-timezone";
import { useMutation } from "@tanstack/react-query";
import { bool, object, string } from "yup";
import { useFormik } from "formik";

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove data: prefix
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const installValidationSchema = object({
  dbPassword: string().required("DB Password is required"),
  email: string().email("Invalid email address").required("Email is required"),
  timezone: string().required("Timezone is required"),
  pteroUsername: string().required("Pterodactyl Username is required"),
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  pteroPassword: string().required("Pterodactyl Password is required"),
  cert: string(),
  password: string().required("Password is required"),
  serverIp: string().required("Server IP is required"),
  agree: bool().oneOf([true], "You must agree to the terms and conditions"),
});

function App() {
  const timezones = moment.tz.names();

  const install = useMutation({
    mutationFn: (newTodo) => {
      return fetch(
        window.location.hostname === "localhost"
          ? "http://localhost:8080/install"
          : "https://pterodactyl-installer-server-619074647413.europe-west1.run.app/install",
        {
          method: "POST",
          body: JSON.stringify(newTodo),
        },
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      dbPassword: "",
      email: "",
      timezone: "",
      pteroUsername: "",
      firstName: "",
      lastName: "",
      pteroPassword: "",
      cert: "",
      password: "",
      agree: false,
      serverIp: "",
    },
    validationSchema: installValidationSchema,
    onSubmit: async (values) =>
      install.mutate({ ...values, cert: await fileToBase64(values.cert) }),
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
        <Typography variant="h1" gutterBottom>
          Pterodactyl Server Installer
        </Typography>
        <Typography variant="body1" paragraph>
          Configure your server settings before installation.
        </Typography>

        <Card style={{ marginTop: "20px", padding: "20px" }}>
          <CardContent>
            <Typography variant="h3" gutterBottom align="center">
              Server Setup
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Server Config Group */}
              <Card
                style={{ width: "100%", marginBottom: "20px", padding: "16px" }}
              >
                <Typography variant="h5" gutterBottom>
                  Server Settings
                </Typography>

                <TextField
                  name={"serverIp"}
                  label="Server IP"
                  fullWidth
                  margin="normal"
                  value={formik.values.serverIp}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.serverIp && Boolean(formik.errors.serverIp)
                  }
                  helperText={formik.touched.serverIp && formik.errors.serverIp}
                />
                <MuiFileInput
                  InputProps={{ accept: ".pub, .crt" }}
                  margin="normal"
                  fullWidth
                  value={formik.values.cert}
                  onChange={(value) => {
                    console.log(value);
                    formik.handleChange({
                      target: { name: "password", value: "" },
                    });
                    formik.handleChange({ target: { name: "cert", value } });
                  }}
                  label="Server Certificate"
                />
                <TextField
                  label={
                    formik.values.cert
                      ? "Certificate Password"
                      : "Server Password"
                  }
                  name={"password"}
                  fullWidth
                  margin="normal"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Card>

              {/* User Info Group */}
              <Card
                style={{ width: "100%", marginBottom: "20px", padding: "16px" }}
              >
                <Typography variant="h5" gutterBottom>
                  Pterodactyl Settings
                </Typography>

                <TextField
                  label="DB Password"
                  name={"dbPassword"}
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formik.values.dbPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dbPassword &&
                    Boolean(formik.errors.dbPassword)
                  }
                  helperText={
                    formik.touched.dbPassword && formik.errors.dbPassword
                  }
                />
                <TextField
                  label="Email"
                  name={"email"}
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.timezone && formik.errors.timezone}
                >
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={formik.values.timezone}
                    onChange={formik.handleChange}
                    label="Timezone"
                    name="timezone"
                  >
                    {timezones.map((tz) => (
                      <MenuItem key={tz} value={tz}>
                        {tz}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.timezone && formik.errors.timezone && (
                    <FormHelperText error>
                      {formik.errors.timezone}
                    </FormHelperText>
                  )}
                </FormControl>
                <TextField
                  label="Pterodactyl Username"
                  name={"pteroUsername"}
                  fullWidth
                  margin="normal"
                  value={formik.values.pteroUsername}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pteroUsername &&
                    Boolean(formik.errors.pteroUsername)
                  }
                  helperText={
                    formik.touched.pteroUsername && formik.errors.pteroUsername
                  }
                />
                <TextField
                  label="First Name"
                  name={"firstName"}
                  fullWidth
                  margin="normal"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  label="Last Name"
                  name={"lastName"}
                  fullWidth
                  margin="normal"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  label="Pterodactyl Password"
                  name={"pteroPassword"}
                  fullWidth
                  margin="normal"
                  type="password"
                  value={formik.values.pteroPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pteroPassword &&
                    Boolean(formik.errors.pteroPassword)
                  }
                  helperText={
                    formik.touched.pteroPassword && formik.errors.pteroPassword
                  }
                />
              </Card>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.agree}
                    name="agree"
                    onChange={formik.handleChange}
                    color="primary"
                  />
                }
                label="I agree that the provided information is saved during the installation process."
              />

              <Button
                loadingPosition="start"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
                disabled={!formik.values.agree || install.isPending}
                loading={install.isPending}
                onClick={formik.handleSubmit}
              >
                Install Server
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
