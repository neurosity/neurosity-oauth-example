import { useEffect } from "react";
import { Flex } from "reflexbox";
import CircularProgress from "@mui/material/CircularProgress";

import { useLocation, useNavigate } from "react-router-dom";
import { useNotion } from "../services/notion";

const unauthenticatedRoutes = ["/"];

export function AuthManager({ children }) {
  const { loading, user } = useNotion();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // redirect to login page if path requires auth
    if (!loading && !user && !unauthenticatedRoutes.includes(pathname)) {
      navigate("/");
      return;
    }

    // redirect to account if path is home
    if (!loading && user && pathname === "/") {
      navigate("/account");
      return;
    }
  }, [loading, user, pathname, navigate]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Flex>
    );
  }

  return children;
}
