// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <ThemeProvider>
      <Router />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
