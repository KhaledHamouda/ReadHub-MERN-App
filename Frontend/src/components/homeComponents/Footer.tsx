import React, { useEffect } from "react";
import { Facebook, LinkedIn, GitHub } from "@mui/icons-material";
import styles from "./Footer.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { scroller } from "react-scroll";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface RootState {
  DataReducer: {
    mode: "dark" | "light";
  };
}

const Footer: React.FC = () => {
  const { mode } = useSelector((state: RootState) => state.DataReducer);
  const navigate = useNavigate();

  const scrollToSection = (page: string) => {
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "Books":
        navigate("/books");
        break;
      case "Categories":
        navigate("/categories");
        break;
      case "Authors":
        navigate("/authors");
        break;
      default:
        scroller.scrollTo(page, {
          duration: 500,
          delay: 0,
          offset: -70,
          smooth: "easeInOutQuart",
        });
        break;
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--background-color",
      mode === "dark" ? "rgba(38, 40, 51, 1)" : "rgba(241, 237, 248, 1)"
    );
    root?.style.setProperty("--text-color", mode === "dark" ? "#fff" : "dark");
  }, [mode]);

  const location = useLocation();
  const currentLocation =
    location.pathname === "/login"
      ? "/login"
      : location.pathname === "/register"
      ? "/register"
      : "/";

  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Typography variant="h6" className={styles.desc}>
            Reading is a gateway to endless learning and imagination. It
            sharpens the mind, enhances empathy, and provides a refreshing
            escape from daily routines. By exploring different genres and
            perspectives, you can grow intellectually and emotionally, making
            every book a valuable addition to your life.
          </Typography>
          <div className={styles.socailContainer}>
            <a
              href="https://www.facebook.com/"
              className={styles.socailIcon}
              style={{ backgroundColor: "#3B5999" }}
            >
              <Facebook />
            </a>
            <a
              href="https://www.linkedin.com/"
              className={styles.socailIcon}
              style={{ backgroundColor: "#0077B7" }}
            >
              <LinkedIn />
            </a>
            <a
              href="https://github.com/mhmadrashd/Good-Reads-Application"
              target="_blank"
              className={styles.socailIcon}
              style={{ backgroundColor: "#000" }}
              rel="noreferrer"
            >
              <GitHub />
            </a>
          </div>
        </div>
        <div className={styles.center}>
          <Typography variant="h6" className={styles.title}>
            Useful Links
          </Typography>
          <ul className={styles.List}>
            <li
              className={styles.listItem}
              onClick={() => scrollToSection("Home")}
            >
              Home
            </li>
            <li
              className={styles.listItem}
              onClick={() => scrollToSection("Books")}
            >
              Book
            </li>
            <li
              className={styles.listItem}
              onClick={() => scrollToSection("Categories")}
            >
              Categories
            </li>
            <li
              className={styles.listItem}
              onClick={() => scrollToSection("Authors")}
            >
              Authors
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <Typography variant="h6" className={styles.title}>
            Contacts
          </Typography>
          <div className={styles.ContactItem}>
            <a
              href="https://www.linkedin.com/in/khaled-hamouda-9461ab224/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon style={{ marginRight: "5px", color: "#2196f3" }} />
              Khaled Hamouda
            </a>
          </div>
          <div className={styles.ContactItem}>
            <a
              href="https://www.linkedin.com/in/ahmed-fadl98/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon style={{ marginRight: "5px", color: "#2196f3" }} />{" "}
              Ahmed Fadl
            </a>
          </div>
          <div className={styles.ContactItem}>
            <a
              href="https://www.linkedin.com/in/khalidhamdii/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon style={{ marginRight: "5px", color: "#2196f3" }} />{" "}
              Khaled Hamdy
            </a>
          </div>
          <div className={styles.ContactItem}>
            <a
              href="https://www.linkedin.com/in/moatazsobhy21/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon style={{ marginRight: "5px", color: "#2196f3" }} />{" "}
              Motaz Sobhy
            </a>
          </div>
        </div>
      </div>
      <div className={styles.lowerFotter}>
        <div className={styles.left}>
          <Link to={currentLocation}>ReadHub </Link> - Project implemented using
          Reactjs Nodejs Express MongoDB
        </div>
      </div>
    </div>
  );
};

export default Footer;
