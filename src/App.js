import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthManager } from "./components/AuthManager";
import { SignInWithNerosity } from "./pages/SignInWithNerosity";
import { Account } from "./pages/Account";
import { ThemeProvider, theme } from "./services/theme";
import { ProvideNotion } from "./services/notion";

export function App() {
  return (
    <BrowserRouter>
      <ProvideNotion>
        <ThemeProvider theme={theme}>
          <AuthManager>
            <Routes>
              <Route path="/" element={<SignInWithNerosity />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </AuthManager>
        </ThemeProvider>
      </ProvideNotion>
    </BrowserRouter>
  );
}
