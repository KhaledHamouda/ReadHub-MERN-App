import "./Home.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/homeComponents/Navbar"
import Footer from "../components/homeComponents/Footer";
import CategoriesSlider from "../components/homeComponents/CategorySlider";
import Hero from "../components/homeComponents/HeroSection";

function Home() {
  const { mode } = useSelector((state: any) => state.DataReducer);
  const { loginState } = useSelector((state: any) => state.DataReducer);
  const theme = createTheme({
    palette: {
      mode: mode || "light",
    },
  });

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Navbar />
      {!loginState ? <Hero /> : ""}

      {/* 3aiz lsa zwdhom yarab nl72 */}
      {/* <BooksSlider />
      <AuthorsSlider /> */}
      <CategoriesSlider />
      <Footer />
    </ThemeProvider>
  );
}

export default Home;