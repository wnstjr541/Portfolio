import logo from "./logo.svg";
import "./App.css";
import Main from "./pages";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Main></Main>
    </ChakraProvider>
  );
}

export default App;
