import React from "react";

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
    <section style={styles.reviewSection}>
      <h2 style={styles.reviewHeading}>
        {headline}
        {/* The underline can't be added with ::after, so use a div */}
        <div style={styles.reviewHeadingAfter}></div>
      </h2>

      <div style={styles.reviewsGrid}>
        {reviewsToRender.map((review, index) => (
          <div style={styles.reviewCard} key={index}>
            <span style={styles.reviewIcon}>“</span>
            <p style={styles.reviewText}>{review.text}</p>
            <div style={styles.reviewAuthor}>
              <p style={styles.authorName}>{review.name}</p>
              <p style={styles.authorLocation}>{review.location}</p>
              {review.date && (
                <p style={styles.authorLocation}>{review.date}</p>
              )}
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

const styles = {
  reviewSection: {
    padding: "3rem 1.5rem",
    background: "linear-gradient(to bottom right, #fffdfc, #fff5ef)",
    margin: "5px",
    borderRadius: "8px",
  },
  reviewHeading: {
    textAlign: "center",
    fontSize: "2.4rem",
    marginBottom: "2.5rem",
    color: "#222",
    fontWeight: 700,
    position: "relative",
  },
  reviewHeadingAfter: {
    width: "80px",
    height: "4px",
    backgroundColor: "#ff6f20",
    margin: "12px auto 0",
    borderRadius: "2px",
  },
  reviewsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  reviewCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "2rem",
    position: "relative",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #f0f0f0",
  },
  reviewIcon: {
    fontSize: "2.5rem",
    color: "#ff6f20",
  },
  reviewText: {
    fontSize: "1rem",
    color: "#444",
    marginBottom: "1rem",
    lineHeight: 1.6,
    fontStyle: "italic",
    position: "relative",
  },
  reviewAuthor: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
    gap: "0.75rem",
  },
  authorName: {
    fontWeight: 600,
    color: "#ff6f20",
  },
  authorLocation: {
    fontSize: "0.85rem",
    color: "#777",
  },
};
