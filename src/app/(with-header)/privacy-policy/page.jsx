import styles from "./privacy.module.css";

export const metadata = {
  title: "Privacy Policy - Packwiz",
  description: "Learn how we handle your data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.pageContainer}>
      <h1>Privacy Policy</h1>

      <p>
        At Packwiz, your privacy is important to us. This policy outlines how we
        collect, use, and protect your personal information when you use our
        website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We do not require users to register or provide personal information to
        browse our website. However, we may collect non-identifiable data such
        as:
      </p>
      <ul>
        <li>Cart information stored in your browser (using localStorage)</li>
        <li>Anonymous usage data such as page views and device type</li>
        <li>Your IP address, used only for analytics purposes</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>The information collected is used to:</p>
      <ul>
        <li>Maintain your shopping cart between visits</li>
        <li>Improve our website performance and usability</li>
        <li>Analyze visitor trends using third-party tools</li>
      </ul>

      <h2>3. Use of Cookies and Storage</h2>
      <p>
        We use local browser storage (such as{" "}
        <span className={styles.code}>localStorage</span>) to store your cart
        and other necessary session data. We also use cookies via services like:
      </p>
      <ul>
        <li>
          <strong>Google Tag Manager</strong> – to manage analytics and
          marketing tags
        </li>
        <li>
          <strong>Google Analytics</strong> (via GTM) – to collect anonymous
          usage statistics
        </li>
        <li>
          <strong>Vercel Analytics</strong> – for performance monitoring
        </li>
      </ul>
      <p>
        These services may use cookies to collect anonymized data such as your
        IP address and device/browser type.
      </p>

      <h2>4. Consent</h2>
      <p>
        By using our website, you consent to the use of cookies and local
        storage for the purposes described above. In compliance with Canadian
        privacy laws (PIPEDA), your continued use of the site implies meaningful
        consent for these practices.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        We use trusted third-party services to operate our website and analyze
        usage. These providers are governed by their own privacy policies:
      </p>
      <ul>
        <li>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Privacy Policy
          </a>
        </li>
      </ul>

      <h2>6. Contact Us</h2>
      <p>
        If you have questions about this privacy policy or how your data is
        handled, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> support@packwiz.ca
      </p>

      <p className={styles.smallNote}>Last updated: July 13, 2025</p>
    </main>
  );
}
