// app/not-found.js
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <div className={styles.links}>
        <Link href="/" className={styles.button}>
          Go to Home
        </Link>
        <Link href="/products" className={styles.buttonSecondary}>
          Browse Products
        </Link>
      </div>
    </div>
  );
}
