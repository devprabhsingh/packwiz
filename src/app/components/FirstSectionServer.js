import HomeSlideshow from "./HomeSlideShow";
import HeroIntro from "./Intro";
import styles from "./FirstStyle.module.css";
const FirstSectionServer = () => {
  return (
    <div>
      <div className={styles.maindiv}>
        <HeroIntro />

        <div className={styles.seconddiv}>
          <HomeSlideshow />
        </div>
      </div>
    </div>
  );
};

export default FirstSectionServer;
