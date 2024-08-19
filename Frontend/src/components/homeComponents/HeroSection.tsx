import React from "react";
import styles from "./hero.module.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from "@mui/material";
import { scroller } from "react-scroll/modules";

// Define the type for the page parameter
type ScrollToSection = (page: string) => void;

const Hero: React.FC = () => {
  // Go to section after clicking an item from the menu in the navbar
  const scrollToSection: ScrollToSection = (page) => {
    scroller.scrollTo(page, {
      duration: 500,
      delay: 0,
      offset: -70,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div className={`${styles.container} Home topPage`}>
      <div className={`${styles.vd}`}>
        <video
            src="https://videos.pexels.com/video-files/854533/854533-uhd_3840_2160_25fps.mp4"
            autoPlay={true}
            loop
            muted={true}
        />
      </div>
      <div className={styles.maindiv}>
        <h1 className={styles.maintxt}>Welcome To Our ReadsHub Home Page.</h1>
        <p className={styles.mainp}>
        Discover Your Next Favorite Book: Browse Our Extensive Collection of Curated Reads and Uncover Hidden Gems That Will Captivate Your Imagination and Enrich Your Mind.
        </p>
        <Button
          onClick={() => scrollToSection("Books")}
          className={styles.mainbtn}
        >
          Get Started <ArrowForwardIosIcon className={styles.mainicon} />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
