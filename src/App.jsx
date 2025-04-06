import { useState } from "react";
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
} from "@mui/material";
import theme from "./theme";
import { MuiFileInput } from "mui-file-input";
import moment from "moment-timezone";

function App() {
  const [agree, setAgree] = useState(false);

  const [dbPassword, setDbPassword] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("");
  const [pteroUsername, setPteroUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pteroPassword, setPteroPassword] = useState("");
  const [cert, setCert] = useState("");
  const [password, setPassword] = useState("");
  const [serverIp, setServerIp] = useState("");

  const timezones = moment.tz.names();

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
                  label="Server IP"
                  fullWidth
                  margin="normal"
                  value={serverIp}
                  onChange={(e) => setServerIp(e.target.value)}
                />
                <MuiFileInput
                  InputProps={{ accept: ".pub, .crt" }}
                  margin="normal"
                  fullWidth
                  value={cert}
                  onChange={(value) => {
                    setPassword("");
                    setCert(value);
                  }}
                  label="Server Certificate"
                />
                <TextField
                  label={cert ? "Certificate Password" : "Server Password"}
                  fullWidth
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  fullWidth
                  margin="normal"
                  value={dbPassword}
                  onChange={(e) => setDbPassword(e.target.value)}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    label="Timezone"
                  >
                    {timezones.map((tz) => (
                      <MenuItem key={tz} value={tz}>
                        {tz}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Pterodactyl Username"
                  fullWidth
                  margin="normal"
                  value={pteroUsername}
                  onChange={(e) => setPteroUsername(e.target.value)}
                />
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Pterodactyl Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={pteroPassword}
                  onChange={(e) => setPteroPassword(e.target.value)}
                />
              </Card>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    color="primary"
                  />
                }
                label="I agree that the provided informations are saved during the installation process."
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
                disabled={!agree}
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
