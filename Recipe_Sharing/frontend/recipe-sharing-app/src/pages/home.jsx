import React from "react";
import pizza from "../assets/pizza.jpg";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import RecipeItems from "../components/RecipeItems";

export default function Home() {
  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Food Recipe</h1>
          <h5>
            In today's interconnected world, the joy of culinary exploration is
            often shared through fleeting social media posts or complex,
            ad-heavy websites. This fragmentation, however, often hinders
            genuine engagement and the seamless exchange of authentic,
            home-cooked wisdom. Our vision is to establish a dedicated recipe
            sharing platform that transcends these limitations, creating a
            vibrant digital kitchen where food enthusiasts can effortlessly
            discover, share, and preserve culinary traditions. Imagine a space
            where a grandmother's secret pastry recipe, a student's
            budget-friendly meal prep, or a seasoned chef's innovative dish can
            all find a cherished home, complete with clear instructions,
            beautiful visuals, and a supportive community eager to learn and
            experiment. This platform will not only simplify the process of
            finding and following recipes but also foster a deeper connection
            among food lovers, empowering them to celebrate diverse cuisines and
            pass on their passion for cooking to a global audience, making the
            art of homemade food more accessible and enjoyable for everyone.
          </h5>
          <button>Share your recipe</button>
        </div>
        <div className="right">
          <img
            src={pizza}
            width="320px"
            height="300px"
            alt="A delicious pizza"
          />
        </div>
      </section>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0C4234"
            fillOpacity="1"
            d="M0,192L30,197.3C60,203,120,213,180,202.7C240,192,300,160,360,160C420,160,480,192,540,213.3C600,235,660,245,720,240C780,235,840,213,900,202.7C960,192,1020,192,1080,170.7C1140,149,1200,107,1260,106.7C1320,107,1380,149,1410,170.7L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="recipe">
        <RecipeItems />
      </div>
    </>
  );
}
