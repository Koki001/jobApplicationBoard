// MUI imports
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const Reviews = () => {
  return (
    <section className="reviews wrapper">
      <div className="reviewsHeading">
        <h2>
          <span>Trusted by leading</span> startups.
        </h2>
        <div className="reviewsCarouselButtons">
          <button><WestIcon /></button>
          <button><EastIcon /></button>
        </div>
      </div>
      <div className="reviewsCarousel">
        <div className="reviewsCard first">
          <div className="reviewsLogo">
            <img src="../assets/header/slack.png" alt="company logo" />
          </div>
          <p className="reviewsText">
            "Seattle opera simplifies performance planning with desk eSignature"
          </p>
          <p className="reviewsAuthor">
            <span>Mark Joge,</span> Marketing Chief
          </p>
          <div className="reviewsRating">
            <p>4.5 Excellent</p>
            <div className="reviewsStars">
              <img src="../assets/reviews/stars.png" alt="" />
            </div>
          </div>
        </div>
        <div className="reviewsCard second">
          <div className="reviewsLogo">
            <img src="../assets/header/shipbob.png" alt="company logo" />
          </div>
          <p className="reviewsText">
            "How DocuSign CLM helps Celonis scale its global business."
          </p>
          <p className="reviewsAuthor">
            <span>Rashed Kabir,</span> Lead Designer
          </p>
          <div className="reviewsRating ">
            <p>4.8 Awesome</p>
            <div className="reviewsStars">
              <img src="../assets/reviews/stars.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
