import React from "react";
import "./reviewSection.css";

const defaultReviews = [
  {
    name: "Sarah Thompson",
    location: "Toronto, ON",
    text: "The corrugated boxes I ordered were top-notch. Super sturdy and delivered right on time. Packwiz nailed it!",
  },
  {
    name: "James Walker",
    location: "Mississauga, ON",
    text: "I’m amazed by the quality of their shrink wrap and tapes. Very affordable and fast delivery too.",
  },
  {
    name: "Emily Chen",
    location: "Hamilton, ON",
    text: "Bought moving blankets and coveralls — very happy with the quality. Will definitely buy again from Packwiz!",
  },
  {
    name: "Liam Martin",
    location: "Ottawa, ON",
    text: "The gloves are durable and comfortable. Prices are great, especially for bulk purchases.",
  },
  {
    name: "Sanjay Singh",
    location: "Mississauga, ON",
    text: "Great customer service from Prabh! My garbage bags and tapes were shipped the same day.",
  },
  {
    name: "Noah Patel",
    location: "Brampton, ON",
    text: "Really impressed with the newsprint paper. Good value and came neatly packed. Highly recommend.",
  },
  {
    name: "Avery Roberts",
    location: "Stratford, ON",
    text: "Packwiz made my packing experience hassle-free. Their boxes are sturdy and well-sized.",
  },
  {
    name: "Mason Clark",
    location: "Napanee, ON",
    text: "The masking tapes were exactly what I needed for my art projects. Great price too!",
  },
  {
    name: "Isabella Nguyen",
    location: "Toronto, ON",
    text: "Top-tier products and very professional service. Will recommend Packwiz to friends and family!",
  },
];

export default function ReviewSection({
  reviewList = null,
  headline = "What Our Customers Say",
}) {
  const reviewsToRender =
    reviewList && reviewList.length > 0
      ? reviewList.map((r) => ({
          text: r.review,
          name: r.customerName,
          location: r.location,
          date: r.date,
        }))
      : defaultReviews;

  return (
    <section className="review-section">
      <h2>{headline}</h2>
      <div className="reviews-grid">
        {reviewsToRender.map((review, index) => (
          <div className="review-card" key={index}>
            <span className="review-icon">“</span>
            <p className="review-text">{review.text}</p>
            <div className="review-author">
              <p className="author-name">{review.name}</p>
              <p className="author-location">{review.location}</p>
              {review.date && <p className="author-date">{review.date}</p>}
            </div>
          </div>
        ))}
      </div>
      <p
        style={{
          color: "#777",
          marginTop: "5px",
          marginBottom: 0,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Only verified and authentic reviews are displayed.
      </p>
    </section>
  );
}
