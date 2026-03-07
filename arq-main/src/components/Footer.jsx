import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Section */}
        <div style={styles.brand}>
          <h3 style={styles.brandTitle}>ARQ</h3>
          <p style={styles.brandDesc}>
            when Data Speaks! ARQ Listens!
          </p>
          <div style={styles.tagline}>
            <span style={styles.emoji}>🎓</span>
            <span>Empowering Future Leaders</span>
          </div>
        </div>

        {/* Contact & Social */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Connect With Us</h4>
          <div style={styles.contact}>
            <p style={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              arq@rajalakshmi.edu.in
            </p>
          </div>
          <div style={styles.socials}>
            <a 
              href="https://www.instagram.com/arqclubrec?igsh=MXQzcGR4M3Q2b2tl" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialIcon} 
              className="footer-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/arqclubrec/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialIcon} 
              className="footer-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottom}>
        <hr style={styles.line} />
        <div style={styles.bottomContent}>
          <p style={styles.copy}>
            © {new Date().getFullYear()} ARQ REC. All Rights Reserved.
          </p>
          <div style={styles.policies}>
          <p>
            Website by <a href="https://sanjaykishore18.github.io/Sanjaykishore18/" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6" }}>SanjayKishore T</a> &amp; <a href="https://yourassociateportfolio.com" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6" }}>Shalini K</a> Assisted by-Sanjay kumar, Lejo
          </p>

          </div>
        </div>
      </div>

      {/* Enhanced CSS for animations */}
      <style>
        {`
          .footer-link {
            transition: all 0.3s ease;
            position: relative;
          }
          
          .footer-link:hover {
            color: #8b5cf6 !important;
            transform: translateY(-2px);
          }
          
          .footer-link:hover::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #8b5cf6, #a855f7);
            animation: slideIn 0.3s ease;
          }
          
          .footer-social {
            transition: all 0.3s ease;
            transform-origin: center;
          }
          
          .footer-social:hover {
            transform: scale(1.2) rotate(10deg);
            filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4));
          }
          
          @keyframes slideIn {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              text-align: center;
            }
            
            .footer-bottom-content {
              flex-direction: column;
              gap: 10px;
            }
            
            .footer-brand {
              text-align: center;
              margin-bottom: 30px;
            }
            
            .footer-section {
              text-align: center;
            }
          }
        `}
      </style>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#000000",
    color: "#ffffff",
    padding: "30px 15px 15px",
    marginTop: "5px",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "60px",
    maxWidth: "1200px",
    margin: "0 auto",
    className: "footer-container",
  },
  brand: {
    flex: "1",
    minWidth: "350px",
    textAlign: "center",
    className: "footer-brand",
  },
  brandTitle: {
    
    fontSize: "36px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #8b5cf6, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  brandDesc: {
    margin: "0 0 25px 0",
    fontSize: "18px",
    color: "#d1d5db",
    lineHeight: "1.6",
  },
  tagline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    color: "#8b5cf6",
    fontSize: "16px",
    fontWeight: "600",
  },
  emoji: {
    fontSize: "22px",
  },
  section: {
    flex: "1",
    minWidth: "250px",
    textAlign: "center",
    className: "footer-section",
  },
  sectionTitle: {
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#ffffff",
    borderBottom: "3px solid #8b5cf6",
    paddingBottom: "10px",
    display: "inline-block",
  },
  contact: {
    marginBottom: "15px",
  },
  contactItem: {
    margin: "0",
    color: "#d1d5db",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontWeight: "500",
  },
  socials: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  socialIcon: {
    display: "inline-block",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #8b5cf6, #a855f7)",
    color: "white",
    textDecoration: "none",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
  },
  bottom: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  line: {
    border: "none",
    borderTop: "1px solid #374151",
    margin: "0 0 25px 0",
    opacity: 0.7,
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    className: "footer-bottom-content",
  },
  copy: {
    margin: 0,
    fontSize: "15px",
    color: "#9ca3af",
    fontWeight: "500",
  },
  policies: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  policyLink: {
    textDecoration: "none",
    color: "#9ca3af",
    fontSize: "15px",
    fontWeight: "500",
  },
  separator: {
    color: "#9ca3af",
    fontSize: "15px",
  },
};
