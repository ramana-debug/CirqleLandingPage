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
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
};

// Header Component (simplified for terms page)
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

// Terms Content Component
const TermsContent: React.FC = () => {
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
          <Icons.FileText />
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
          Terms of Service
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
          Please read these Terms of Service carefully before using the Cirqle mobile application and services.
        </p>
      </div>

      {/* Terms Sections */}
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
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '16px' }}>
            By downloading, installing, or using the Cirqle mobile application ("App") and related services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our App or Services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and Techdean IT Services Pvt. Ltd. ("Company", "we", "us", or "our").
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
            2. Use of the Application
          </h2>
          <p style={{ marginBottom: '16px' }}>
            You agree to use Cirqle only for lawful purposes and in accordance with these Terms. You are responsible for:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Using the App only for legitimate asset management purposes</li>
            <li style={{ marginBottom: '8px' }}>Providing accurate and complete information when required</li>
            <li style={{ marginBottom: '8px' }}>Maintaining the security of your account credentials</li>
            <li style={{ marginBottom: '8px' }}>Not attempting to disrupt, hack, or reverse engineer the App</li>
            <li style={{ marginBottom: '8px' }}>Not using the App for any illegal or unauthorized purpose</li>
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
            3. Account Registration and Security
          </h2>
          <p style={{ marginBottom: '16px' }}>
            To access certain features of Cirqle, you may need to create an account. You agree to:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Provide accurate, current, and complete information during registration</li>
            <li style={{ marginBottom: '8px' }}>Maintain and update your information to keep it accurate</li>
            <li style={{ marginBottom: '8px' }}>Keep your login credentials confidential and secure</li>
            <li style={{ marginBottom: '8px' }}>Notify us immediately of any unauthorized use of your account</li>
          </ul>
          <p>
            You are responsible for all activities that occur under your account.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            4. Data and Privacy
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          <p>
            You retain ownership of the data you input into the App, including asset information, property details, and documents. However, you grant us a license to use this data solely for providing and improving our Services.
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
            5. Intellectual Property Rights
          </h2>
          <p style={{ marginBottom: '16px' }}>
            The Cirqle App, including its design, features, content, trademarks, and logos, is owned by Techdean IT Services Pvt. Ltd. and is protected by intellectual property laws.
          </p>
          <p>
            You may not copy, modify, distribute, sell, or lease any part of our Services or included software, nor may you reverse engineer or attempt to extract the source code of that software.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a2038',
            marginBottom: '16px'
          }}>
            6. Service Availability and Modifications
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We strive to provide continued access to Cirqle, but we do not guarantee that the App will be available at all times. We may:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Suspend or discontinue the App or any features temporarily or permanently</li>
            <li style={{ marginBottom: '8px' }}>Modify, update, or change the App and its features</li>
            <li style={{ marginBottom: '8px' }}>Perform maintenance that may affect App availability</li>
          </ul>
          <p>
            We will provide reasonable notice of significant changes when possible.
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
            7. Disclaimers and Limitations
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Cirqle is provided "as is" and "as available" without warranties of any kind. We disclaim all warranties, including but not limited to:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Merchantability and fitness for a particular purpose</li>
            <li style={{ marginBottom: '8px' }}>Accuracy, reliability, or completeness of information</li>
            <li style={{ marginBottom: '8px' }}>Uninterrupted or error-free service</li>
            <li style={{ marginBottom: '8px' }}>Security or absence of harmful components</li>
          </ul>
          <p>
            You use the App at your own risk and discretion.
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
            8. Limitation of Liability
          </h2>
          <p style={{ marginBottom: '16px' }}>
            To the maximum extent permitted by law, Techdean IT Services Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Loss of profits, data, or business opportunities</li>
            <li style={{ marginBottom: '8px' }}>Damage to reputation or goodwill</li>
            <li style={{ marginBottom: '8px' }}>Third-party claims or damages</li>
          </ul>
          <p>
            Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.
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
            9. Termination
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We may suspend or terminate your access to Cirqle at any time, with or without cause or notice, including if you:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Violate these Terms or our policies</li>
            <li style={{ marginBottom: '8px' }}>Engage in fraudulent or illegal activities</li>
            <li style={{ marginBottom: '8px' }}>Interfere with the App's operation or security</li>
          </ul>
          <p>
            You may terminate your account at any time by uninstalling the App and ceasing to use our Services.
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
            10. Governing Law and Dispute Resolution
          </h2>
          <p style={{ marginBottom: '16px' }}>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of Cirqle shall be subject to the exclusive jurisdiction of the courts in hyderabad, Telangana, India.
          </p>
          <p>
            We encourage you to contact us first to resolve any disputes amicably before pursuing legal action.
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
            11. Changes to Terms
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We may update these Terms from time to time to reflect changes in our services or legal requirements. We will notify you of material changes by:
          </p>
          <ul style={{
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li style={{ marginBottom: '8px' }}>Posting the updated Terms in the App</li>
            <li style={{ marginBottom: '8px' }}>Sending you an email notification (if provided)</li>
            <li style={{ marginBottom: '8px' }}>Displaying a prominent notice in the App</li>
          </ul>
          <p>
            Your continued use of Cirqle after the effective date constitutes acceptance of the updated Terms.
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
            12. Severability
          </h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
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
            Questions or Concerns?
          </h3>
          <p style={{
            marginBottom: '16px',
            color: '#6b7280'
          }}>
            If you have any questions about these Terms of Service, please contact us:
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
              hyderabad, Telangana, India
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// Footer Component (simplified for terms page)
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
          <a href="/help" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
            Help Center
          </a>
          <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
            Privacy Policy
          </a>
          <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
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

// Main Terms Page Component
const TermsPage: React.FC = () => {
  return (
    <div style={{ 
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <Header />
      <TermsContent />
      <Footer />
    </div>
  );
};

export default TermsPage;