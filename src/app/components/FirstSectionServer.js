import Image from "next/image";
import Link from "next/link";
import HomeSlideshow from "./HomeSlideShow";
import HeroIntro from "./Intro";
const FirstSectionServer = () => {
  return (
    <div>
      <div className="first-section" style={styles.maindiv}>
        <HeroIntro />

        <div className="second-div" style={styles.seconddiv}>
          <HomeSlideshow />
        </div>
      </div>
    </div>
  );
};

const styles = {
  maindiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
};
export default FirstSectionServer;
