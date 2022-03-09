import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Navbar from "../components/Navbar"
import Fab from "../components/Fab"
import "@fontsource/prompt/400.css"

const theme = extendTheme({
  fonts: {
    body: "Prompt",
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Fab />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
