import { createTheme } from "@mui/material/styles";

// Define your color palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#00C4CC", // Bright cyan for a modern, techy feel
      contrastText: "#FFFFFF", // White text for better contrast
    },
    secondary: {
      main: "#FFD700", // Golden yellow for highlights and buttons
      contrastText: "#000000", // Dark text on yellow for visibility
    },
    background: {
      default: "#181818", // Dark background to give a "gaming" feel without being overwhelming
      paper: "#222222", // Slightly lighter background for cards/panels
    },
    text: {
      primary: "#E0E0E0", // Light gray text for readability
      secondary: "#B0B0B0", // Lighter secondary text color
    },
    action: {
      active: "#FFD700", // Gold accent for interactive elements
      hover: "#00C4CC", // Cyan hover effect for buttons/links
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Clean, modern font
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#FFD700", // Yellow highlights for headers to make them stand out
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1rem",
      color: "#B0B0B0", // Slightly lighter text for secondary content
    },
    body1: {
      fontSize: "1rem",
      color: "#E0E0E0", // Easy-to-read text for paragraphs
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #00C4CC, #FFD700)",
          color: "#fff",
          fontWeight: 700,
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Default shadow
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",

          "&:hover": {
            outline: "2px solid rgba(255, 215, 0, 1)", // Added golden outline on hover
          },

          "&.Mui-disabled": {
            background:
              "linear-gradient(45deg, rgba(0, 196, 204, 0.2), rgba(255, 215, 0, 0.2))",
            color: "#666",
            boxShadow: "none",
            cursor: "not-allowed",
          },

          // Remove the white outline when focused (clicked)
          "&:focus": {
            outline: "2px solid rgba(255, 215, 0, 1)", // Added golden outline on hover
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Keep normal box shadow after focus
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#222222", // Dark card background to match the general theme
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#222222",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
