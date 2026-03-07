
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Target, Eye, Award, Users, Calendar, Trophy, ArrowRight, Clock, Star, Rocket, Globe, Plus, Minus } from 'lucide-react';
import banner from '../photos/banner.webp'
import banner3 from '../photos/banner 3.webp'
import { useNavigate } from 'react-router-dom';

export default function ClubHomepage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({ members: 0, events: 0, awards: 0, dedication: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      title: "Welcome to ARQ",
      subtitle: "Where Excellence Meets Passion",
      image: banner
    },
    {
      id: 2,
      title: "Data-Driven Excellence",
      subtitle: "Analyze • Visualize • Innovate",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Experience Innovation",
      subtitle: "Building Tomorrow's Leaders Today",
      image: banner3
    }

  ];

  const mvvContent = {
    mission: {
      icon: Target,
      title: "Our Mission",
      description: `Make Data Science universal across disciplines.
      Shape future analysts and researchers with strong quantitative skills.
      Establish ARQ as a hub for impactful, data-driven projects.
      Foster industry connections to enhance career opportunities.
      Create a legacy of innovation and excellence.
      `,
      highlights: ["Collaborative Learning", "Skill Development", "Community Impact", "Innovation Drive"]
    },
    vision: {
      icon: Eye,
      title: "Our Vision",
      description: `Teach Data Science to students from all academic backgrounds,
 Encourage research through interdisciplinary collaboration,
 Provide hands-on training with real-world tools and datasets,
 Bridge academia and industry through mentorship and workshops,
 Build a data-driven community for continuous learning and innovation.`,
      highlights: ["Leadership Excellence", "Creative Innovation", "Global Impact", "Sustainable Growth"]
    },
    value: {
      icon: Award,
      title: "Our Values",
      description: "Integrity, Excellence, Inclusivity, and Innovation form the cornerstone of our club. We believe in transparent communication, continuous improvement, respect for diversity, and pushing boundaries to achieve extraordinary results.",
      highlights: ["Integrity First", "Excellence Always", "Inclusive Culture", "Bold Innovation"]
    }
  };

  const timelineEvents = [
    {
      year: "February 2025",
      title: "Foundation",
      description: "The ARQ Club Inauguration – UTOPIA'25 (Launch Edition) marked the official launch of the club, featuring inspiring sessions by industry leaders on AI innovation and entrepreneurship. The event celebrated the club's vision to empower students in research, creativity, and future technology ventures.",
      icon: Rocket
    },
    {
      year: "March 2025",
      title: "First Milestone",
      description: "Data Analytics Hands-On Workshop offered students a practical learning experience in machine learning and data visualization, guided by alumnus Mr. Sabarish Abishek. The session fostered strong engagement, alumni mentorship, and real-world exposure to modern data analytics practices.",
      icon: Star
    },
    {
      year: "April 2025",
      title: "National Level Technical Symposium",
      description: "brought together over 270 participants for an inspiring blend of workshops, competitions, and innovation showcases. The event earned high praise for its professional organization and sparked strong student interest in joining ARQ and pursuing ongoing tech projects.",
      icon: Trophy
    },
  ];

  const faqData = [
    {
      question: "What is ARQ all about?",
      answer: "ARQ is a dynamic tech community focused on fostering innovation, collaboration, and skill development. We bring together developers, designers, and tech enthusiasts to learn, build, and grow together through various projects, workshops, and events."
    },
    {
      question: "Who should join this club?",
      answer: "Anyone passionate about technology and innovation! Whether you're a student, professional developer, designer, or just someone curious about tech, our club welcomes all skill levels. We believe in inclusive learning and collaborative growth."
    },
    {
      question: "What kind of activities does the club organize?",
      answer: "The club hosts workshops, hackathons, tech talks, and innovation challenges focused on AI, data science, and emerging technologies — giving members hands-on experience and networking opportunities."
    },
    {
      question: "How do I join?",
      answer: "Joining is simple! You can register through our website, attend one of our open events, or reach out to any of our current members. We conduct regular orientation sessions for new members to help you get started on your journey with us."
    }
  ];

  const stats = [
    { icon: Users, value: 56, label: "Active Members", key: "members", suffix: "+" },
    { icon: Calendar, value: 2, label: "Annual Events", key: "events", suffix: "+" },
    { icon: Trophy, value: 2, label: "Awards Won", key: "awards", suffix: "+" },
    { icon: Target, value: 100, label: "Dedication", key: "dedication", suffix: "%" }
  ];

  // Counter animation function
  const animateCounter = (target, key, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCounters(prev => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }
    }, 16);
  };

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start all counter animations
            setTimeout(() => animateCounter(56, 'members'), 20);
            setTimeout(() => animateCounter(2, 'events'), 1);
            setTimeout(() => animateCounter(2, 'awards'), 600);
            setTimeout(() => animateCounter(100, 'dedication'), 800);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .club-homepage {
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Hero Carousel Styles */
        .hero-carousel {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: #000000;
        }

        .banner-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: scale(1.1) rotateY(90deg);
          transition: all 1.2s ease-in-out;
        }

        .banner-slide.active {
          opacity: 1;
          transform: scale(1) rotateY(0deg);
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          filter: brightness(0.6);
        }

        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(139, 92, 246, 0.15);
          z-index: 2;
        }

        .banner-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
          z-index: 3;
          background: rgba(0, 0, 0, 0.3);
        }

        .banner-text {
          max-width: 80rem;
          animation: slideInUp 1.5s ease-out;
        }

        .banner-title {
          font-size: 5rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          animation: flipInX 2s ease-out;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
        }

        .banner-subtitle {
          font-size: 2rem;
          color: #8b5cf6;
          font-weight: 400;
          margin-bottom: 3rem;
          animation: fadeInUp 2.5s ease-out;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: #ffffff;
          color: #000000;
          border: 1px solid #8b5cf6;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.125rem;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.4s ease;
          animation: bounceIn 3s ease-out;
        }

        .explore-btn:hover {
          background: #8b5cf6;
          color: #ffffff;
          transform: scale(1.1) rotateZ(-5deg);
          border-color: #ffffff;
        }

        .arrow-icon {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.3s ease;
        }

        .explore-btn:hover .arrow-icon {
          transform: translateX(5px) rotateZ(360deg);
        }

        /* Navigation Arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 4rem;
          height: 4rem;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #8b5cf6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000000;
          cursor: pointer;
          transition: all 0.4s ease;
          z-index: 10;
          animation: pulse 2s infinite;
        }

        .nav-arrow:hover {
          background: #8b5cf6;
          color: #ffffff;
          border-color: #ffffff;
          transform: translateY(-50%) scale(1.2) rotateZ(360deg);
        }

        .nav-arrow-left {
          left: 2rem;
        }

        .nav-arrow-right {
          right: 2rem;
        }

        .nav-arrow svg {
          width: 2rem;
          height: 2rem;
        }

        /* Dots Indicator */
        .dots-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 10;
        }

        .dot {
          height: 1rem;
          width: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #8b5cf6;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.4s ease;
          animation: bounce 2s infinite;
        }

        .dot:hover {
          background: #8b5cf6;
          transform: scale(1.3);
        }

        .dot.active {
          background: #8b5cf6;
          width: 3rem;
          border-radius: 1rem;
          animation: wiggle 1s ease-in-out;
        }

        /* Stats Section - WHITE BACKGROUND */
        .stats-section {
          position: relative;
          margin-top: -6rem;
          z-index: 20;
          padding: 0 1rem 6rem;
          background: #ffffff;
        }

        .stats-card {
          background: #ffffff;
          border-radius: 2rem;
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          animation: slideInUp 1s ease-out;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .stat-item:hover {
          transform: scale(1.1);
        }

        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          background: #000000;
          border-radius: 1rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
          animation: rotateIn 2s ease-out;
        }

        .stat-item:hover .stat-icon {
          background: #8b5cf6;
        }

        .stat-icon svg {
          width: 2rem;
          height: 2rem;
          color: #ffffff;
          transition: all 0.4s ease;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          color: #000000;
          margin-bottom: 0.5rem;
          transition: color 0.4s ease;
          font-family: 'Courier New', monospace;
        }

        .stat-item:hover .stat-value {
          color: #8b5cf6;
        }

        .stat-label {
          color: #000000;
          font-weight: 600;
          transition: color 0.4s ease;
        }

        .stat-item:hover .stat-label {
          color: #8b5cf6;
        }

        /* NEW WHO WE ARE SECTION - FLUID DESIGN */
        .mvv-section {
          position: relative;
          padding: 6rem 0;
          background: #000000;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%);
          margin-bottom: -80px;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          padding: 0 1rem;
          animation: fadeInDown 1s ease-out;
        }

        .section-header h2 {
          font-size: 4rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1.5rem;
          animation: flipInY 1.5s ease-out;
        }

        .section-header p {
          font-size: 1.25rem;
          color: #8b5cf6;
          max-width: 48rem;
          margin: 0 auto;
          font-weight: 500;
          animation: slideInLeft 2s ease-out;
        }

        /* New Fluid Layout */
        .main-content {
          display: flex;
          gap: 4rem;
          align-items: flex-start;
          padding: 0 1rem;
        }

        .mvv-content {
          flex: 0 0 55%;
        }

        .timeline-content {
          flex: 0 0 45%;
        }

        /* New Tab Design - Clean Pills */
        .tab-buttons {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 4rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 0.5rem;
          backdrop-filter: blur(10px);
          animation: fadeIn 2s ease-out;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          animation: bounceInUp 1.5s ease-out;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: scale(1.05);
        }

        .tab-btn.active {
          background: #8b5cf6;
          color: #ffffff;
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        .tab-icon {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.3s ease;
        }

        .tab-btn:hover .tab-icon,
        .tab-btn.active .tab-icon {
          transform: rotateZ(360deg);
        }

        /* New Content Design - No Boxes */
        .tab-content {
          position: relative;
          min-height: 28rem;
        }

        .tab-panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          pointer-events: none;
        }

        .tab-panel.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          animation: slideInUp 0.8s ease-out;
        }

        /* Main Content Area - No Background */
        .content-area {
          padding: 0;
          animation: slideInRight 1s ease-out;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .content-icon-large {
          width: 8rem;
          height: 8rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border-radius: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
          transition: all 0.4s ease;
          animation: rotateIn 1.5s ease-out;
        }

        .content-icon-large:hover {
          transform: rotateZ(360deg) scale(1.1);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
        }

        .content-icon-large svg {
          width: 4rem;
          height: 4rem;
          color: #ffffff;
          transition: all 0.4s ease;
        }

        .content-title-area h3 {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.1;
          animation: slideInLeft 1s ease-out;
        }

        .content-subtitle {
          font-size: 1.25rem;
          color: #8b5cf6;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .content-description {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          margin-bottom: 3rem;
          animation: fadeInUp 1.5s ease-out;
        }

        /* New Highlights Design - Floating Pills */
        .highlights-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: flex-start;
        }

        .highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(139, 92, 246, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 50px;
          padding: 1rem 1.5rem;
          transition: all 0.4s ease;
          animation: slideInUp 2s ease-out;
        }

        .highlight-pill:hover {
          background: rgba(139, 92, 246, 0.4);
          border-color: rgba(139, 92, 246, 0.6);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
        }

        .highlight-dot-new {
          width: 0.75rem;
          height: 0.75rem;
          background: #8b5cf6;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.4s ease;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .highlight-pill:hover .highlight-dot-new {
          background: #ffffff;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        .highlight-pill span {
          color: #ffffff;
          font-weight: 600;
          font-size: 1.125rem;
          transition: color 0.4s ease;
        }

        /* Timeline Styles - Simplified */
        .timeline-section {
          padding: 2rem 0;
          animation: slideInLeft 1s ease-out;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .timeline-header h3 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .timeline-header p {
          color: #8b5cf6;
          font-weight: 500;
          font-size: 1.125rem;
        }

        .timeline {
          position: relative;
          padding-left: 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 1rem;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #8b5cf6 0%, #a855f7 100%);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          animation: fadeInRight 1s ease-out;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-dot {
          position: absolute;
          left: -1.75rem;
          top: 0.5rem;
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border: 3px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
          animation: pulse 2s infinite;
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.2);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }

        .timeline-dot svg {
          width: 1.75rem;
          height: 1.75rem;
          color: #ffffff;
          transition: all 0.4s ease;
        }

        .timeline-content-item {
          background: rgba(139, 92, 246, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1.5rem;
          padding: 1.5rem;
          transition: all 0.4s ease;
        }

        .timeline-item:hover .timeline-content-item {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateX(10px);
        }

        .timeline-year {
          font-size: 1.5rem;
          font-weight: 900;
          color: #8b5cf6;
          margin-bottom: 0.5rem;
        }

        .timeline-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .timeline-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        /* FAQ & CTA Section - WHITE BACKGROUND WITH SLANT */
        .faq-cta-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          background: #ffffff;
          padding-top: 80px;
          clip-path: polygon(0 80px, 100% 0, 100% 100%, 0 100%);
        }

        .faq-side {
          flex: 0 0 50%;
          background: #ffffff;
          padding: 6rem 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .cta-side {
          flex: 0 0 50%;
          background: #000000;
          padding: 6rem 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          clip-path: polygon(80px 0, 100% 0, 100% 100%, 0 100%);
          margin-left: -80px;
        }

        /* FAQ Styles */
        .faq-content {
          max-width: 500px;
          width: 100%;
        }

        .faq-header {
          text-align: left;
          margin-bottom: 3rem;
          animation: slideInLeft 1s ease-out;
        }

        .faq-header h2 {
          font-size: 3rem;
          font-weight: 900;
          color: #000000;
          margin-bottom: 1rem;
        }

        .faq-header p {
          font-size: 1.125rem;
          color: #8b5cf6;
          font-weight: 500;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: slideInUp 1s ease-out;
        }

        .faq-item:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateY(-2px);
        }

        .faq-question {
          width: 100%;
          background: none;
          border: none;
          padding: 1.5rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          color: #8b5cf6;
        }

        .faq-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #8b5cf6;
          transition: transform 0.3s ease;
        }

        .faq-item.open .faq-icon {
          transform: rotateZ(180deg);
        }

        .faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item.open .faq-answer {
          max-height: 200px;
          padding: 0 1.5rem 1.5rem;
        }

        .faq-answer p {
          color: #64748b;
          line-height: 1.6;
          font-size: 1rem;
        }

        /* CTA Styles */
        .cta-content {
          max-width: 500px;
          width: 100%;
          text-align: center;
          animation: slideInRight 1s ease-out;
        }

        .cta-content h2 {
          font-size: 3rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1.5rem;
          animation: flipInX 1s ease-out;
        }

        .cta-content p {
          font-size: 1.25rem;
          color: #8b5cf6;
          margin-bottom: 2.5rem;
          font-weight: 500;
          line-height: 1.6;
          animation: fadeInUp 1.5s ease-out;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: slideInUp 2s ease-out;
        }

        .btn-primary {
          padding: 1rem 2.5rem;
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.4s ease;
          animation: bounceInLeft 2s ease-out;
        }

        .btn-primary:hover {
          background: #8b5cf6;
          color: #ffffff;
          transform: scale(1.1) rotateZ(-5deg);
          border-color: #8b5cf6;
        }

        .btn-secondary {
          padding: 1rem 2.5rem;
          background: transparent;
          color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.4s ease;
          animation: bounceInRight 2s ease-out;
        }

        .btn-secondary:hover {
          background: #ffffff;
          color: #000000;
          transform: scale(1.1) rotateZ(5deg);
        }

        /* Animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes flipInX {
          from {
            opacity: 0;
            transform: rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: rotateX(0deg);
          }
        }

        @keyframes flipInY {
          from {
            opacity: 0;
            transform: rotateY(-90deg);
          }
          to {
            opacity: 1;
            transform: rotateY(0deg);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        @keyframes bounceInUp {
          0% {
            opacity: 0;
            transform: translateY(100px);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px);
          }
          80% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }

        @keyframes bounceInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          60% {
            opacity: 1;
            transform: translateX(10px);
          }
          80% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }

        @keyframes bounceInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          60% {
            opacity: 1;
            transform: translateX(-10px);
          }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotateZ(-360deg) scale(0);
          }
          to {
            opacity: 1;
            transform: rotateZ(0deg) scale(1);
          }
        }

        @keyframes pulse {
          0% { transform: translateY(-50%) scale(1); }
          50% { transform: translateY(-50%) scale(1.1); }
          100% { transform: translateY(-50%) scale(1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes wiggle {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(-3deg); }
          75% { transform: rotateZ(3deg); }
          100% { transform: rotateZ(0deg); }
        }

        /* MOBILE RESPONSIVE STYLES - UPDATED WITH ALL FIXES */
        @media (max-width: 768px) {
          
          /* Hero Section Mobile */
          .hero-carousel {
            height: 70vh;
          }
          
          .banner-title {
            font-size: 2.5rem;
          }
          
          .banner-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
          }
          
          .explore-btn {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
          
          /* Navigation Arrows Mobile */
          .nav-arrow {
            width: 3rem;
            height: 3rem;
          }
          
          .nav-arrow svg {
            width: 1.5rem;
            height: 1.5rem;
          }
          
          .nav-arrow-left {
            left: 1rem;
          }
          
          .nav-arrow-right {
            right: 1rem;
          }

          /* Dots Indicator Mobile */
          .dots-indicator {
            bottom: 2rem;
          }

          .dot {
            height: 0.75rem;
            width: 0.75rem;
          }

          .dot.active {
            width: 2rem;
          }
          
          /* Stats Section Mobile */
          .stats-section {
            margin-top: -3rem;
            padding: 0 1rem 3rem;
          }
          
          .stats-card {
            padding: 1.5rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .stat-icon {
            width: 3rem;
            height: 3rem;
          }
          
          .stat-icon svg {
            width: 1.5rem;
            height: 1.5rem;
          }
          
          .stat-value {
            font-size: 2rem;
          }

          .stat-label {
            font-size: 0.875rem;
          }
          
          /* MVV Section Mobile - INCREASED PADDING AND FIXED OVERLAPPING */
          .mvv-section {
            padding: 4rem 0 8rem; /* INCREASED bottom padding from 6rem to 8rem */
            clip-path: none; /* Removed clip-path to prevent overlapping */
            margin-bottom: 0; /* Reset margin-bottom */
            overflow: hidden;
          }
          
          .section-header h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }

          .section-header p {
            font-size: 1.125rem;
          }

          .section-header {
            margin-bottom: 3rem;
            padding: 0 1rem;
          }

          /* Main Content Mobile - Remove Timeline */
          .main-content {
            flex-direction: column;
            gap: 0;
            padding: 0 1rem;
          }

          .mvv-content {
            flex: none;
            width: 100%;
          }

          .timeline-content {
            display: none; /* Hide timeline on mobile */
          }
          
          /* UPDATED - Tab Buttons Mobile - HORIZONTAL LAYOUT */
          .tab-buttons {
            flex-direction: row; /* CHANGED from column to row */
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem; /* REDUCED gap for tighter layout */
            margin-bottom: 3rem;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.75rem; /* REDUCED padding */
            border-radius: 50px;
          }
          
          .tab-btn {
            padding: 0.75rem 1rem; /* SMALLER padding */
            font-size: 0.875rem; /* SMALLER font size */
            border-radius: 25px; /* SMALLER border radius */
            flex: 1; /* Equal width distribution */
            min-width: auto; /* Remove min-width constraint */
            max-width: calc(33.333% - 0.5rem); /* Limit width to fit 3 buttons */
            justify-content: center;
            text-align: center;
            white-space: nowrap; /* Prevent text wrapping */
          }
          
          .tab-icon {
            width: 1rem; /* SMALLER icon */
            height: 1rem;
          }
          
          /* HIDE PURPLE ICON IN MOBILE - Content Header Mobile */
          .content-header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          /* HIDE THE LARGE PURPLE ICON ON MOBILE */
          .content-icon-large {
            display: none; /* HIDDEN - This hides the purple symbol/icon */
          }

          .content-title-area h3 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-align: center;
          }

          .content-subtitle {
            font-size: 1rem;
            text-align: center;
          }

          .content-description {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            text-align: center;
          }
          
          /* Tab Content Mobile - INCREASED MINIMUM HEIGHT TO PREVENT OVERLAPPING */
          .tab-content {
            min-height: 35rem; /* INCREASED from 28rem to 35rem */
            margin-bottom: 4rem; /* ADDED extra margin for more space */
          }

          .content-area {
            padding: 0 0 3rem; /* ADDED bottom padding */
          }
          
          .highlights-container {
            justify-content: center;
            gap: 0.75rem;
            margin-bottom: 3rem; /* ADDED margin bottom for more space */
          }

          .highlight-pill {
            padding: 0.875rem 1.25rem;
            font-size: 1rem;
          }

          .highlight-pill span {
            font-size: 1rem;
          }
          
          /* FAQ & CTA Section Mobile - FIXED OVERLAPPING ISSUE */
          .faq-cta-section {
            flex-direction: column;
            min-height: auto;
            clip-path: none; /* Removed clip-path */
            padding-top: 6rem; /* INCREASED padding-top for more separation */
            margin-top: 4rem; /* INCREASED margin-top for more space */
          }

          .faq-side, .cta-side {
            flex: none;
            width: 100%;
            padding: 3rem 2rem;
            clip-path: none;
            margin-left: 0;
          }

          /* FAQ Mobile */
          .faq-header h2 {
            font-size: 2.25rem;
            text-align: center;
          }

          .faq-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .faq-question {
            padding: 1.25rem;
            font-size: 1rem;
          }

          .faq-icon {
            width: 1.25rem;
            height: 1.25rem;
          }

          .faq-answer {
            padding: 0 1.25rem;
          }

          .faq-item.open .faq-answer {
            padding: 0 1.25rem 1.25rem;
          }

          /* CTA Mobile */
          .cta-content h2 {
            font-size: 2.25rem;
          }

          .cta-content p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          /* Container Mobile */
          .container {
            padding: 0 0.75rem;
          }
        }

        /* DESKTOP ONLY STYLES */
        @media (min-width: 769px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* EXTRA SMALL MOBILE - UPDATED FOR TAB BUTTONS */
        @media (max-width: 480px) {
          .banner-title {
            font-size: 2rem;
          }

          .banner-subtitle {
            font-size: 1.125rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .content-title-area h3 {
            font-size: 2rem;
          }

          .faq-header h2, .cta-content h2 {
            font-size: 2rem;
          }

          .stat-value {
            font-size: 1.75rem;
          }

          .stats-grid {
            gap: 1rem;
          }

          .faq-side, .cta-side {
            padding: 2rem 1.5rem;
          }

          .content-description {
            font-size: 1.125rem;
          }

          .highlight-pill {
            padding: 0.75rem 1rem;
          }

          .highlight-pill span {
            font-size: 0.875rem;
          }
          
          /* UPDATED - Tab buttons for very small screens */
          .tab-btn {
            padding: 0.75rem 0.5rem; /* Adjust padding for smaller screens */
            font-size: 0.75rem; /* Even smaller font */
            gap: 0.25rem; /* Smaller gap between icon and text */
          }
          
          .tab-btn .tab-icon {
            width: 0.875rem;
            height: 0.875rem;
          }
          
          /* Keep text but make it smaller */
          .tab-btn span {
            font-size: 0.75rem;
          }

          /* INCREASED MOBILE CONTENT HEIGHT FOR SMALL SCREENS */
          .tab-content {
            min-height: 30rem; /* INCREASED even more for small screens */
            margin-bottom: 0.1rem; /* More bottom margin */
          }

          /* FAQ Section - More space for small screens */
          .faq-cta-section {
            padding-top: 0.1rem; /* Even more padding for small screens */
            margin-top: 0.1rem; /* More margin */
          }
        }
      `}</style>

      <div className="club-homepage">
        
        {/* Hero Banner Carousel */}
        <div className="hero-carousel">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
            >
              <img 
                src={banner.image} 
                alt={banner.title}
                className="banner-image"
              />
              <div className="banner-overlay"></div>
              
              <div className="banner-content">
                <div className="banner-text">
                  <h1 className="banner-title">{banner.title}</h1>
                  <p className="banner-subtitle">{banner.subtitle}</p>
                  <button className="explore-btn" onClick={() => navigate("/events")}>
                    Explore More <ArrowRight className="arrow-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button onClick={prevBanner} className="nav-arrow nav-arrow-left">
            <ChevronLeft />
          </button>
          <button onClick={nextBanner} className="nav-arrow nav-arrow-right">
            <ChevronRight />
          </button>

          {/* Dots Indicator */}
          <div className="dots-indicator">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`dot ${index === currentBanner ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section - WHITE BACKGROUND */}
        <div className="stats-section" ref={statsRef}>
          <div className="container">
            <div className="stats-card">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">
                      <stat.icon />
                    </div>
                    <div className="stat-value">
                      {counters[stat.key]}{stat.suffix}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values Section - BLACK BACKGROUND - NEW DESIGN */}
        <div className="mvv-section">
          <div className="container">
            <div className="section-header">
              <h2>Who We Are</h2>
              <p>Discover our purpose, direction, and the principles that guide everything we do</p>
            </div>

            <div className="main-content">
              {/* MVV Content - 55% */}
              <div className="mvv-content">
                {/* New Tab Buttons */}
                <div className="tab-buttons">
                  {Object.keys(mvvContent).map((key) => {
                    const content = mvvContent[key];
                    const Icon = content.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                      >
                        <Icon className="tab-icon" />
                        <span>{content.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* New Tab Content */}
                <div className="tab-content">
                  {Object.keys(mvvContent).map((key) => {
                    const content = mvvContent[key];
                    const Icon = content.icon;
                    return (
                      <div
                        key={key}
                        className={`tab-panel ${activeTab === key ? 'active' : ''}`}
                      >
                        <div className="content-area">
                          <div className="content-header">
                            <div className="content-icon-large">
                              <Icon />
                            </div>
                            <div className="content-title-area">
                              <div className="content-subtitle">{key}</div>
                              <h3>{content.title}</h3>
                            </div>
                          </div>
                          
                          <p className="content-description">{content.description}</p>
                          
                          <div className="highlights-container">
                            {content.highlights.map((highlight, index) => (
                              <div key={index} className="highlight-pill">
                                <div className="highlight-dot-new"></div>
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Content - 45% - HIDDEN ON MOBILE */}
              <div className="timeline-content">
                <div className="timeline-section">
                  <div className="timeline-header">
                    <h3>Our Story</h3>
                    <p>Journey through time</p>
                  </div>
                  <div className="timeline">
                    {timelineEvents.map((event, index) => {
                      const Icon = event.icon;
                      return (
                        <div key={index} className="timeline-item">
                          <div className="timeline-dot">
                            <Icon />
                          </div>
                          <div className="timeline-content-item">
                            <div className="timeline-year">{event.year}</div>
                            <div className="timeline-title">{event.title}</div>
                            <div className="timeline-description">{event.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ & CTA Section - WHITE BACKGROUND */}
        <div className="faq-cta-section">
          {/* FAQ Section - White Side */}
          <div className="faq-side">
            <div className="faq-content">
              <div className="faq-header">
                <h2>Frequently Asked Questions</h2>
                <p>Find answers to common questions about our club</p>
              </div>
              <div className="faq-list">
                {faqData.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${openFAQ === index ? 'open' : ''}`}
                  >
                    <button 
                      className="faq-question"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.question}</span>
                      {openFAQ === index ? <Minus className="faq-icon" /> : <Plus className="faq-icon" />}
                    </button>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section - Black Side */}
          <div className="cta-side">
            <div className="cta-content">
              <h2>Ready to Join Us?</h2>
              <p>Become part of a thriving community of innovators, leaders, and change-makers</p>
              <div className="cta-buttons">
                <a className="btn-primary" href="https://chat.whatsapp.com/FQat2k9e8LK9LD7vUgma7q?mode=ems_share_t">Join Now</a>
                <a className="btn-secondary" href="./events">Learn More</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}