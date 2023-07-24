import { useState } from "react";
import Topbar from "./routes/global/Topbar";
import Sidebar from "./routes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import RouterPage from "./routes";
import NoAuthTheme from "./components/NoAuthTheme";
import { Store } from "./store/states";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  console.log("Store", Store());

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? (
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <RouterPage />
            </main>
          </div>
        ) : (
          <NoAuthTheme />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
