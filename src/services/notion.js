import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Notion } from "@neurosity/notion";
import axios from "axios";

export const notion = new Notion({
  autoSelectDevice: false,
  emulator: true // @TODO: remove before going to prod
});

export const NotionContext = createContext();

export const useNotion = () => {
  return useContext(NotionContext);
};

const initialState = {
  loading: true,
  user: null,
  oAuthError: null,
  devices: []
};

export function ProvideNotion({ children }) {
  const notionProvider = useProvideNotion();

  return (
    <NotionContext.Provider value={notionProvider}>
      {children}
    </NotionContext.Provider>
  );
}

function useProvideNotion() {
  const [state, setState] = useState(initialState);
  const oAuthResult = useOAuthResult();
  const { customToken, error: oAuthError } = oAuthResult;

  useEffect(() => {
    const subscription = notion.onAuthStateChanged().subscribe(async (user) => {
      console.log("user", user);

      if (user) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          user
        }));
      } else {
        // Comment this out to to get existing custom tokens by user id
        // axios
        //   .get(`/.netlify/functions/get-neurosity-custom-token`, {
        //     params: { userId: "kE3QLxDB1dYTLlNzO1WwOKvGy7iG" }
        //   })
        //   .then(({ data }) =>
        //     notion
        //       .login({
        //         customToken: data.data.token
        //       })
        //       .catch(() => null)
        //   )
        //   .then(() => {
        //     setState((prevState) => ({
        //       ...prevState,
        //       loading: false,
        //       user
        //     }));
        //   })
        //   .catch((error) => {
        //     setState((prevState) => ({
        //       ...prevState,
        //       loading: false
        //       // oAuthError: error?.message
        //     }));
        //   });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = notion.onUserClaimsChange().subscribe((claims) => {
      console.log("claims", claims);
      setState((prevState) => ({
        ...prevState,
        claims
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = notion.onUserDevicesChange().subscribe((devices) => {
      setState((prevState) => ({
        ...prevState,
        devices
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check for prescence of customToken and trigger login
  useEffect(() => {
    if (!customToken) {
      return;
    }

    notion.login({ customToken }).catch((error) => {
      setState((prevState) => ({
        ...prevState,
        oAuthError: error?.message
      }));
    });
  }, [customToken]);

  useEffect(() => {
    if (oAuthError) {
      setState((prevState) => ({
        ...prevState,
        oAuthError
      }));

      // Remove location hash so it doesn't pass it to subsecuent routes
      window.history.replaceState(null, null, " ");
    }
  }, [oAuthError]);

  return state;
}

function useOAuthResult() {
  const location = useLocation();
  const paramsString = location.hash.replace("#", "");
  const searchParams = new URLSearchParams(paramsString);

  return {
    state: searchParams.get("state"),
    error: searchParams.get("error"),
    customToken: searchParams.get("access_token")
  };
}
