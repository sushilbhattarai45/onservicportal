// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
