import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Navbar from "../components/Navbar"

const theme = extendTheme({
  colors: {
    brand: {
      100: "#348ceb",
      900: "#060020",
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
