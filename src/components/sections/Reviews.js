const Reviews = () => {
  return (
    <section className="reviews wrapper">
      <div className="reviewsHeading">
        <h2>Trusted by leading startups.</h2>
        <div className="reviewsCarouselButtons">
          <button>left</button>
          <button>right</button>
        </div>
      </div>
      <div className="reviewsCarousel">
        <div className="reviewsCard">
          <p>logo</p>
          <p>review text</p>
          <p>review</p>
          <div className="reviewsRating">
            <p>number rating</p>
            <p>stars rating</p>
          </div>
        </div>
        <div className="reviewsCard">
          <p>logo</p>
          <p>review text</p>
          <p>review</p>
          <div className="reviewsRating">
            <p>number rating</p>
            <p>stars rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews
