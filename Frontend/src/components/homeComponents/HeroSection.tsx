import React from "react";
import styles from "./hero.module.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate('/signup')}
          className={styles.mainbtn}
        >
          Get Started <ArrowForwardIosIcon className={styles.mainicon} />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
