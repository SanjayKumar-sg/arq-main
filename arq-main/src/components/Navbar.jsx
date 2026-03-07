import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import arq from "../photos/ARQ-LOGO .webp";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav style={{
        ...(isMobile ? styles.mobnav : styles.nav),
      }}>
        <div style={styles.brand}>
          <div style={styles.logoContainer}>
            <img src={arq} alt="ARQ Logo" style={styles.logoImage} />
          </div>
          <div style={styles.titleContainer}>
            <span style={styles.title}>Analysis | Research | Quant</span>
          </div>
        </div>
        {isMobile && (
          <div style={styles.hamburger} onClick={() => setMenuOpen(true)}>
            <div style={styles.hamburgerLine}></div>
            <div style={styles.hamburgerLine}></div>
            <div style={styles.hamburgerLine}></div>
          </div>
        )}
        {!isMobile && (
          <div style={styles.links}>
            {links.map((item, i) => (
              <Link key={i} to={item.to} className="nav-link" style={styles.navLink}>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {menuOpen && (
            <div 
              style={styles.backdrop}
              onClick={() => setMenuOpen(false)}
            ></div>
          )}
          <div style={{
            ...styles.sidebar,
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            opacity: menuOpen ? 1 : 0,
          }}>
            <div style={styles.sidebarHeader}>
              <div style={styles.sidebarLogo}>
                <span style={styles.sidebarLogoIcon}>☀️</span>
                <span>ARQ</span>
              </div>
              <button style={styles.closeBtn} onClick={() => setMenuOpen(false)}>
                ×
              </button>
            </div>
            <div style={styles.sidebarContent}>
              {links.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className="sidebar-link"
                  style={styles.sidebarLink}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      {/* CSS Animations - Same as before */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          * {
            font-family: 'Inter', sans-serif;
          }
          .nav-link {
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            position: relative;
            overflow: hidden;
            text-decoration: none; /* Important for Link components */
          }
          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
            transition: left 0.5s ease;
          }
          .nav-link:hover::before {
            left: 100%;
          }
          .nav-link:hover {
            transform: translateY(-3px);
            color: #8b5cf6 !important;
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
          }
          .sidebar-link {
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            text-decoration: none; /* Important for Link components */
          }
          .sidebar-link:hover {
            transform: translateX(15px) scale(1.05);
            color: #8b5cf6 !important;
            background: rgba(139, 92, 246, 0.2);
            border-radius: 12px;
            padding: 12px 16px !important;
          }
          @media (max-width: 768px) {
            .hero-stats {
              flex-direction: column;
              gap: 15px;
            }
          }
        `}
      </style>
    </>
  );
}

// CORRECTED LINKS ARRAY - Remove the "../" prefixes
const links = [
  { label: "Home", to: "/" },
  { label: "Team", to: "/team" },        // Changed from "../team"
  { label: "Events", to: "/events" },    // Changed from "../events"
  { label: "Gallery", to: "/gallery" },  // Changed from "../gallery"
];

// Same styles object as before...
const styles = {
  // ... your existing styles remain unchanged
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "10px auto",
    padding: "15px 40px",
    background: "rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(20px)",
    borderRadius: "50px",
    border: "1px solid rgba(139, 92, 246,)",
    transition: "all 0.4s ease",
    position: "relative",
    zIndex: 10,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  mobnav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 10px",
    background: "rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(20px)",
    margin: "5px 10px",
    borderRadius: "25px",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    position: "relative",
    zIndex: 10,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  logoContainer: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.2",
    textShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
  },
  subtitle: {
    color: "#8b5cf6",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1",
    opacity: 0.9,
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
    padding: "10px",
    background: "rgba(139, 92, 246, 0.2)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  hamburgerLine: {
    width: "25px",
    height: "3px",
    backgroundColor: "#8b5cf6",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navLink: {
    textDecoration: "none",
    color: "#ffffff",
    fontWeight: "500",
    fontSize: "16px",
    padding: "10px 18px",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(139, 92, 246, 0.1)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
  },
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
    zIndex: 998,
  },
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "300px",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
    boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(139, 92, 246, 0.2)",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px",
    borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
  },
  sidebarLogoIcon: {
    fontSize: "24px",
  },
  closeBtn: {
    fontSize: "30px",
    background: "rgba(139, 92, 246, 0.2)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  sidebarContent: {
    flex: 1,
    padding: "30px 25px",
  },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    margin: "15px 0",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "12px",
  },
};
