import { AppContext } from "@/context/state";
import "@/styles/globals.css";
import Head from "next/head";
import { ChakraProvider, extendTheme, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import AuthCheck from "@/util/AuthCheck";
import Navbar from "@/components/layout";
import { Lato } from "next/font/google";
import ConfirmationModal from "@/components/ConfirmationModal";
import { removeAuthToken } from "@/util";
import { useRouter } from "next/router";

const lato = Lato({
  weight: ["400"],
  subsets: ["latin"],
});
const theme = extendTheme({
  fonts: {
    body: `${lato.style.fontFamily}, sans-serif`,
    heading: `${lato.style.fontFamily}, sans-serif`,
  },
});

function App({ Component, pageProps }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const authStatus = useMemo(
    () => ({
      authenticated,
      setAuthenticated,
      userId,
      setUserId,
      location,
      setLocation,
    }),
    [authenticated, userId, location]
  );
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();

  return (
    <>
      <ChakraProvider theme={theme}>
        <AppContext.Provider value={authStatus}>
          <AuthCheck>
            {authenticated && <Navbar logout={onLogoutOpen} />}
            <Component {...pageProps} />
            <ConfirmationModal
              isOpen={isLogoutOpen}
              onClose={onLogoutClose}
              onClick={onLogoutClose}
              action={() => {
                removeAuthToken();
                setAuthenticated(false);
                router.push("/login");
              }}
              title={"Logout Confirmation"}
              description={"Are you sure you want to logout ?"}
            />
          </AuthCheck>
        </AppContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
