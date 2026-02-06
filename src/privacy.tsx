import React, { useState, useEffect } from 'react';

// Icon Components (matching the landing page style)
const Icons = {
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Lock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
};

// Header Component (simplified for privacy page)
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: '16px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <img src="..//assets/Logo_full_4k.png" alt="Cirqle Logo" style={{ width: '90px', height: '60px', borderRadius: '12px' }} />
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            letterSpacing: '-0.5px'
          }}>
            Cirqle
          </span>
        </div>

        {/* Back to Home Button */}
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'white',
            color: '#1f787c',
            padding: '12px 20px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            border: '2px solid #e5f3f0',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0fdf4';
            e.currentTarget.style.borderColor = '#1f787c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#e5f3f0';
          }}
        >
          <Icons.ArrowLeft />
          Back to Home
        </a>
      </div>
    </header>
  );
};

// Privacy Content Component
const PrivacyContent: React.FC = () => {
  const currentDate = '4th October 2025';

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px',
      color: '#1a2038',
      lineHeight: '1.7'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        paddingTop: '120px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(31, 120, 124, 0.1)',
          padding: '8px 16px',
          borderRadius: '24px',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#1f787c'
        }}>
          <Icons.Shield />
          LEGAL DOCUMENT
        </div>

        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '16px',
          letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #1f787c 0%, #10b981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Privacy Policy
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          marginBottom: '8px'
        }}>
          Last updated: {currentDate}
        </p>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>
      </div>

      {/* Privacy Sections */}
      <div style={{
        fontSize: '16px',
        color: '#374151'
      }}>
        {/* Section 1 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            1. Introduction
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Techdean IT Services Pvt. Ltd. ("we", "us", or "our") operates the Cirqle mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
          </p>
          <p>
            By using Cirqle, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use the App.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            2. Information We Collect
          </h2>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2038',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            2.1 Personal Information
          </h3>
          <p style={{ marginBottom: '16px' }}>
            When you register for and use Cirqle, we may collect:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Name and email address</li>
            <li style={{ marginBottom: '8px' }}>Phone number (optional)</li>
            <li style={{ marginBottom: '8px' }}>Profile picture (optional)</li>
            <li style={{ marginBottom: '8px' }}>Account credentials (encrypted)</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2038',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            2.2 Asset and Property Data
          </h3>
          <p style={{ marginBottom: '16px' }}>
            To provide our asset management services, we collect:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Property information (name, address, type)</li>
            <li style={{ marginBottom: '8px' }}>Room details within properties</li>
            <li style={{ marginBottom: '8px' }}>Asset details (name, category, purchase date, price, brand, model)</li>
            <li style={{ marginBottom: '8px' }}>Financial information (EMI details, warranty dates, insurance information)</li>
            <li style={{ marginBottom: '8px' }}>Uploaded documents (invoices, receipts, warranty cards, insurance policies)</li>
            <li style={{ marginBottom: '8px' }}>Photos of assets and documents</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2038',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            2.3 Community Data
          </h3>
          <p style={{ marginBottom: '16px' }}>
            When you participate in community features:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Community posts and comments</li>
            <li style={{ marginBottom: '8px' }}>Likes, reactions, and interactions</li>
            <li style={{ marginBottom: '8px' }}>Reviews and ratings</li>
            <li style={{ marginBottom: '8px' }}>Messages and mentions within the community</li>
            <li style={{ marginBottom: '8px' }}>Community member connections</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2038',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            2.4 Location Data
          </h3>
          <p style={{ marginBottom: '16px' }}>
            With your permission, we collect location data to:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Show nearby properties and assets</li>
            <li style={{ marginBottom: '8px' }}>Provide location-based services and recommendations</li>
            <li style={{ marginBottom: '8px' }}>Connect you with local community members</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2038',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            2.5 Usage and Device Information
          </h3>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Device type, operating system, and version</li>
            <li style={{ marginBottom: '8px' }}>App usage patterns and feature interactions</li>
            <li style={{ marginBottom: '8px' }}>IP address and network information</li>
            <li style={{ marginBottom: '8px' }}>Crash reports and performance data</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            3. How We Use Your Information
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We use the collected information for:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Providing and maintaining the Cirqle App and its features</li>
            <li style={{ marginBottom: '8px' }}>Managing your properties, rooms, and assets</li>
            <li style={{ marginBottom: '8px' }}>Processing and storing your documents and photos</li>
            <li style={{ marginBottom: '8px' }}>Sending reminders for EMI, warranty, and insurance expiration dates</li>
            <li style={{ marginBottom: '8px' }}>Enabling community features and facilitating connections</li>
            <li style={{ marginBottom: '8px' }}>Calculating financial analytics and depreciation</li>
            <li style={{ marginBottom: '8px' }}>Improving App functionality and user experience</li>
            <li style={{ marginBottom: '8px' }}>Providing customer support and responding to inquiries</li>
            <li style={{ marginBottom: '8px' }}>Sending important notifications and updates</li>
            <li style={{ marginBottom: '8px' }}>Detecting and preventing fraud or security issues</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            4. Data Storage and Security
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We take your data security seriously and implement industry-standard measures:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>All data is stored on secure cloud servers with encryption at rest</li>
            <li style={{ marginBottom: '8px' }}>Data transmission is encrypted using SSL/TLS protocols</li>
            <li style={{ marginBottom: '8px' }}>Passwords are hashed and salted using industry-standard algorithms</li>
            <li style={{ marginBottom: '8px' }}>Access to user data is restricted to authorized personnel only</li>
            <li style={{ marginBottom: '8px' }}>Regular security audits and vulnerability assessments</li>
            <li style={{ marginBottom: '8px' }}>Uploaded documents and photos are stored securely with controlled access</li>
          </ul>
          <p>
            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            5. Data Sharing and Disclosure
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We do not sell or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}><strong>Community Features:</strong> Information you choose to share publicly in the community (posts, comments, reviews) will be visible to other users</li>
            <li style={{ marginBottom: '8px' }}><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our App (cloud storage, analytics, customer support)</li>
            <li style={{ marginBottom: '8px' }}><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
            <li style={{ marginBottom: '8px' }}><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of all or part of our company</li>
            <li style={{ marginBottom: '8px' }}><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            6. Your Rights and Choices
          </h2>
          <p style={{ marginBottom: '16px' }}>
            You have the following rights regarding your personal information:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li style={{ marginBottom: '8px' }}><strong>Correction:</strong> Update or correct inaccurate information through the App settings</li>
            <li style={{ marginBottom: '8px' }}><strong>Deletion:</strong> Request deletion of your account and all associated data via the in-app "Delete Account" feature or by contacting support</li>
            <li style={{ marginBottom: '8px' }}><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
            <li style={{ marginBottom: '8px' }}><strong>Opt-Out:</strong> Disable location services, push notifications, or marketing communications at any time</li>
            <li style={{ marginBottom: '8px' }}><strong>Restrict Processing:</strong> Request limitation on how we use your data</li>
          </ul>
          <p>
            To exercise these rights, please contact us at contact@cirqlelife.com or use the in-app settings.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            7. Data Retention
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We retain your personal information for as long as necessary to:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Provide you with our services</li>
            <li style={{ marginBottom: '8px' }}>Comply with legal obligations</li>
            <li style={{ marginBottom: '8px' }}>Resolve disputes and enforce our agreements</li>
          </ul>
          <p>
            When you delete your account, we will permanently delete your personal data within 30 days, except where we are required by law to retain certain information.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            8. Children's Privacy
          </h2>
          <p>
            Cirqle is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that we have collected information from a child under 13, we will delete it immediately. If you believe we might have information from or about a child under 13, please contact us.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            9. Third-Party Services
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Our App may contain links to third-party websites or services (such as payment processors or cloud storage providers). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            10. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction. By using Cirqle, you consent to such transfers and processing in accordance with this Privacy Policy.
          </p>
        </section>

        {/* Section 11 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            11. Updates to This Policy
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Posting the new Privacy Policy in the App</li>
            <li style={{ marginBottom: '8px' }}>Sending you an email notification</li>
            <li style={{ marginBottom: '8px' }}>Displaying a prominent notice in the App</li>
          </ul>
          <p>
            Your continued use of Cirqle after any changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </section>

        {/* Section 12 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            12. Cookies and Tracking Technologies
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Cirqle may use cookies and similar tracking technologies to:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Remember your preferences and settings</li>
            <li style={{ marginBottom: '8px' }}>Analyze app usage and performance</li>
            <li style={{ marginBottom: '8px' }}>Provide personalized content and features</li>
          </ul>
          <p>
            You can manage cookie preferences through your device settings, though this may affect certain app functionality.
          </p>
        </section>

        {/* Contact Section */}
        <section style={{
          backgroundColor: '#f8fffe',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #e5f3f0',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#1f787c'
          }}>
            <Icons.Mail />
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '12px'
          }}>
            Questions About Privacy?
          </h3>
          <p style={{
            marginBottom: '16px',
            color: '#6b7280'
          }}>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center'
          }}>
            <a
              href="mailto:contact@cirqlelife.com"
              style={{
                color: '#1f787c',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px'
              }}
            >
              contact@cirqlelife.com
            </a>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Techdean IT Services Pvt. Ltd.<br />
              Hyderabad, Telangana, India
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// Footer Component (simplified for privacy page)
const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#1a2038',
      color: 'white',
      padding: '60px 0 40px',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/assets/Logo_full_4k.png" alt="Cirqle Logo" style={{ width: '60px', height: '40px', borderRadius: '8px' }} />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            Cirqle
          </span>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
            Home
          </a>
          <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
            Privacy Policy
          </a>
          <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
            Terms of Service
          </a>
        </div>

        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '24px',
          fontSize: '14px',
          color: '#9ca3af'
        }}>
          © 2025 Techdean IT Services Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Main Privacy Page Component
const PrivacyPage: React.FC = () => {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <Header />
      <PrivacyContent />
      <Footer />
    </div>
  );
};

export default PrivacyPage;
