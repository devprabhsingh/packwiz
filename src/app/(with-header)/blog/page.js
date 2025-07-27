import Link from "next/link";
import styles from "./blogIndex.module.css";

export const metadata = {
  title: "PackWiz Blog – Moving Tips, Packing Guides & Supplies in Canada",
  description:
    "Read moving checklists, packing tips, and guides. Discover the best moving supplies and kits from PackWiz.ca.",
};

export default function BlogIndex() {
  const blogs = [
    {
      title: "🏠 The Ultimate Moving Checklist",
      slug: "/blog/moving-checklist",
      excerpt:
        "A complete guide to essential moving supplies and ready-made moving kits for a stress-free move.",
    },
    // Add more blog entries here as you create new ones
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚 Packwiz Blog</h1>
      <p className={styles.subheading}>
        Moving tips, packing guides, and the best moving supply advice in
        Canada.
      </p>

      <div className={styles.grid}>
        {blogs.map((blog, index) => (
          <Link key={index} href={blog.slug} className={styles.card}>
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
            <span className={styles.readMore}>Read More →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
