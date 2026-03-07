import React, { useState } from 'react';
import { 
  Code, Database, Shield, Smartphone, Palette, Video, Gamepad2, 
  Zap, Target, Users, Linkedin, ChevronLeft, ChevronRight,
  BarChart3, Cloud, Camera, Calendar, Megaphone
} from 'lucide-react';

export default function TeamPage() {
  const [executives, setExecutives] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for tracking current person in each domain
  const [domainIndex, setDomainIndex] = useState({
    webdev: 0,
    dataanalytics: 0,
    machinelearning: 0,
    datasecurity: 0,
    cloudcomputing: 0,
    design: 0,
    cinematography: 0,
    iot: 0,
    bi: 0,
    management: 0,
    event: 0,
    pr: 0
  });

  const API_URL = "http://127.0.0.1:8000";

  React.useEffect(() => {
    fetch(`${API_URL}/api/team/`)
      .then(res => res.json())
      .then(data => {
        setExecutives(data.executives);
        setTeamMembers(data.members);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching team data:", err);
        setLoading(false);
      });
  }, []);

  const domainConfigs = {
    webdev: { title: "Web Development", icon: Code, color: "#3b82f6" },
    dataanalytics: { title: "Data Analytics", icon: Database, color: "#10b981" },
    machinelearning: { title: "Machine Learning", icon: Target, color: "#f97316" },
    datasecurity: { title: "Data Security", icon: Shield, color: "#ef4444" },
    cloudcomputing: { title: "Cloud Computing", icon: Cloud, color: "#06b6d4" },
    design: { title: "Design & Media", icon: Palette, color: "#f59e0b" },
    cinematography: { title: "Cinematography", icon: Camera, color: "#ec4899" },
    iot: { title: "IoT & Hardware", icon: Zap, color: "#84cc16" },
    bi: { title: "Business Intelligence", icon: BarChart3, color: "#8b5cf6" },
    management: { title: "Management", icon: Users, color: "#a855f7" },
    event: { title: "Event Management", icon: Calendar, color: "#06b6d4" },
    pr: { title: "Public Relations", icon: Megaphone, color: "#f59e0b" }
  };

  const getDomainMembers = (domainKey) => {
    return teamMembers.filter(m => m.domain === domainKey);
  };

  // Navigation functions for domains
  const handleNext = (domain) => {
    const domainMembers = getDomainMembers(domain);
    if (domainMembers.length === 0) return;
    setDomainIndex(prev => ({
      ...prev,
      [domain]: (prev[domain] + 1) % domainMembers.length
    }));
  };

  const handlePrev = (domain) => {
    const domainMembers = getDomainMembers(domain);
    if (domainMembers.length === 0) return;
    setDomainIndex(prev => ({
      ...prev,
      [domain]: prev[domain] === 0 ? domainMembers.length - 1 : prev[domain] - 1
    }));
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .team-page {
          min-height: 100vh;
          background: #0b0b0e; /* Black background */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          padding: 4rem 0;
          position: relative;
          overflow-x: hidden;
        }

        /* Subtle flowing background on black */
        .team-page::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background:
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 20%, transparent 21%),
            radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.06) 15%, transparent 16%),
            radial-gradient(circle at 20% 70%, rgba(168, 85, 247, 0.07) 18%, transparent 19%);
          animation: float 20s ease-in-out infinite;
          z-index: -1;
        }

        .team-page::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(45deg, transparent 49%, rgba(168, 85, 247, 0.04) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(168, 85, 247, 0.04) 50%, transparent 51%);
          background-size: 60px 60px;
          animation: patternSlide 25s linear infinite;
          z-index: -1;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }

        .page-header {
          text-align: center;
          margin-bottom: 5rem;
          animation: fadeInDown 1s ease-out;
          position: relative;
        }

        .page-header::before {
          content: '';
          position: absolute;
          top: -2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #a855f7, transparent);
          border-radius: 50px;
          animation: breathe 3s ease-in-out infinite;
        }

        .page-title {
          font-size: 4rem;
          font-weight: 900;
          color: #f8fafc; /* near-white on black */
          margin-bottom: 1rem;
          text-shadow: 2px 2px 6px rgba(168, 85, 247, 0.15);
          animation: flipInY 1.5s ease-out;
          position: relative;
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #cbd5e1; /* muted light */
          max-width: 48rem;
          margin: 0 auto;
          font-weight: 500;
          animation: slideInUp 2s ease-out;
        }

        .executives-section {
          margin-bottom: 8rem;
          animation: fadeIn 1.5s ease-out;
          position: relative;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #f8fafc;
          text-align: center;
          margin-bottom: 4rem;
          text-shadow: 1px 1px 2px rgba(168, 85, 247, 0.15);
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #a855f7, transparent);
          border-radius: 50px;
        }

        .executives-flow {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 3rem;
          justify-items: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .executives-flow .executive-member:nth-child(1) {
          grid-column: 1 / 3;
        }

        .executives-flow .executive-member:nth-child(2) {
          grid-column: 3 / 5;
        }

        .executives-flow .executive-member:nth-child(3) {
          grid-column: 5 / 7;
        }

        .executives-flow .executive-member:nth-child(4) {
          grid-column: 2 / 4;
        }

        .executives-flow .executive-member:nth-child(5) {
          grid-column: 4 / 6;
        }

        /* Executive member as a white frame card */
        .executive-member {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          animation: slideInUp 1s ease-out;
          transition: all 0.4s ease;
          flex: 0 0 auto;
          max-width: 280px;
          width: 100%;
          background: #ffffff; /* white frame */
          border: 1px solid rgba(168, 85, 247, 0.25);
          border-radius: 16px;
          padding: 1.25rem 1.25rem 1.5rem;
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.15), 0 6px 14px rgba(0,0,0,0.25);
        }

        .executive-member:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 14px 40px rgba(168, 85, 247, 0.22), 0 10px 18px rgba(0,0,0,0.35);
        }

        .member-profile {
          position: relative;
          margin-bottom: 1.2rem;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* White circular button with lilac hover */
        .linkedin-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 2.5rem;
          height: 2.5rem;
          background: #ffffff; /* white button */
          border: 1px solid rgba(168, 85, 247, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          text-decoration: none;
        }

        .linkedin-btn:hover {
          background: #a855f7; /* lilac fill on hover */
          transform: scale(1.08) rotateZ(360deg);
          box-shadow: 0 8px 22px rgba(168, 85, 247, 0.35);
          border-color: transparent;
        }

        .linkedin-btn svg {
          width: 1.25rem;
          height: 1.25rem;
          color: #0b0b0e; /* dark icon on white */
          transition: color 0.3s ease;
        }

        .linkedin-btn:hover svg {
          color: #ffffff; /* white on lilac */
        }

        /* White circular frame for images */
        .member-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 6px solid #ffffff; /* white frame */
          outline: 2px solid rgba(168, 85, 247, 0.35); /* lilac outline for depth */
          transition: all 0.4s ease;
          background: #fff;
        }

        .executive-member:hover .member-image {
          outline-color: rgba(168, 85, 247, 0.6);
          transform: scale(1.04);
          box-shadow: 0 15px 35px rgba(168, 85, 247, 0.25);
        }

        .member-info {
          background: transparent;
          padding: 0;
        }

        .member-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0b0b0e; /* dark on white card */
          margin-bottom: 0.35rem;
          transition: all 0.3s ease;
        }

        .executive-member:hover .member-name {
          color: #6b21a8; /* deeper lilac */
          transform: translateY(-1px);
        }

        .member-role {
          font-size: 0.95rem;
          color: #7c3aed; /* lilac text on white */
          font-weight: 700;
          position: relative;
        }

        .member-role::before {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background: #a855f7;
          border-radius: 50px;
          transition: width 0.3s ease;
        }

        .executive-member:hover .member-role::before {
          width: 60px;
        }

        .domains-section {
          animation: fadeIn 2s ease-out;
          position: relative;
        }

        .domains-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 5rem 4rem;
          margin-top: 2rem;
        }

        /* Each domain area as a white frame card */
        .domain-area {
          position: relative;
          transition: all 0.4s ease;
          animation: slideInUp 1.5s ease-out;
          padding: 1.25rem;
          background: #ffffff; /* white frame */
          border: 1px solid rgba(168, 85, 247, 0.25);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.15), 0 6px 14px rgba(0,0,0,0.25);
        }

        .domain-area:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 40px rgba(168, 85, 247, 0.22), 0 10px 18px rgba(0,0,0,0.35);
        }

        .domain-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 2px solid rgba(168, 85, 247, 0.2);
          position: relative;
        }

        .domain-header::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #a855f7;
          transition: width 0.4s ease;
        }

        .domain-area:hover .domain-header::after {
          width: 100%;
        }

        /* White circular icon frame with lilac glyph */
        .domain-icon {
          width: 3rem;
          height: 3rem;
          background: #ffffff; /* white */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.35);
        }

        .domain-area:hover .domain-icon {
          transform: rotateY(180deg) scale(1.06);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.35);
        }

        .domain-icon svg {
          width: 1.5rem;
          height: 1.5rem;
          color: #7c3aed; /* lilac icon on white */
        }

        .domain-title {
          font-size: 1.35rem;
          font-weight: 900;
          color: #0b0b0e; /* dark on white frame */
          transition: all 0.3s ease;
        }

        .domain-area:hover .domain-title {
          color: #6b21a8;
        }

        .member-showcase {
          position: relative;
          text-align: center;
          background: transparent;
          padding: 0.75rem 0;
        }

        .navigation-arrows {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        /* White circular nav buttons */
        .nav-btn {
          width: 2.5rem;
          height: 2.5rem;
          background: #ffffff;
          border: 1px solid rgba(168, 85, 247, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        .nav-btn:hover {
          background: #a855f7;
          transform: scale(1.08);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.35);
          border-color: transparent;
        }

        .nav-btn svg {
          width: 1.25rem;
          height: 1.25rem;
          color: #0b0b0e; /* dark on white */
          transition: color 0.3s ease;
        }

        .nav-btn:hover svg {
          color: #ffffff;
        }

        .nav-btn-left { left: -1.25rem; }
        .nav-btn-right { right: -1.25rem; }

        /* White circular frame for domain member image */
        .domain-member-image {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.25rem;
          display: block;
          border: 6px solid #ffffff; /* white frame */
          outline: 2px solid rgba(168, 85, 247, 0.35);
          transition: all 0.4s ease;
          background: #fff;
        }

        .domain-area:hover .domain-member-image {
          outline-color: rgba(168, 85, 247, 0.6);
          transform: scale(1.04);
          box-shadow: 0 15px 35px rgba(168, 85, 247, 0.25);
        }

        /* Role pill on white card */
        .role-indicator {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(168, 85, 247, 0.12);
          color: #7c3aed;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 800;
          margin-bottom: 0.85rem;
          border: 1px solid rgba(168, 85, 247, 0.35);
          position: relative;
          overflow: hidden;
        }

        .role-indicator::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transition: left 0.6s ease;
        }

        .domain-area:hover .role-indicator::before {
          left: 100%;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, -15px) rotate(2deg); }
          66% { transform: translate(-10px, 10px) rotate(-1deg); }
        }

        @keyframes patternSlide {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }

        @keyframes breathe {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.7; }
          50% { transform: translateX(-50%) scaleX(1.2); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes flipInY {
          from { opacity: 0; transform: rotateY(-90deg); }
          to { opacity: 1; transform: rotateY(0deg); }
        }

        /* Responsive tweaks */
        @media (max-width: 1200px) {
          .domains-flow { gap: 4rem 3rem; }
        }

        @media (max-width: 768px) {
          .team-page { padding: 2rem 0; }
          .page-title { font-size: 2.5rem; }
          .section-title { font-size: 2rem; }
          .page-header { margin-bottom: 4rem; }
          .executives-section { margin-bottom: 6rem; }
          .executives-flow { 
            grid-template-columns: 1fr; 
            gap: 3rem; 
            max-width: none;
          }
          .executives-flow .executive-member:nth-child(1),
          .executives-flow .executive-member:nth-child(2),
          .executives-flow .executive-member:nth-child(3),
          .executives-flow .executive-member:nth-child(4),
          .executives-flow .executive-member:nth-child(5) {
            grid-column: 1;
          }
          .domains-flow { grid-template-columns: 1fr; gap: 4rem 0; margin-top: 1rem; }
          .domain-area { padding: 1rem; }
          .member-image { width: 150px; height: 150px; }
          .domain-member-image { width: 140px; height: 140px; }
          .nav-btn-left { left: -1rem; }
          .nav-btn-right { right: -1rem; }
          .executive-member { max-width: 250px; }
          .domain-header { margin-bottom: 2rem; padding-bottom: 1rem; }
          .member-showcase { padding: 0.5rem 0; }
        }

        @media (max-width: 480px) {
          .page-title { font-size: 2rem; }
          .section-title { font-size: 1.75rem; }
          .member-image { width: 120px; height: 120px; }
          .domain-member-image { width: 110px; height: 110px; }
          .executives-flow { gap: 2.5rem; }
          .domains-flow { gap: 3rem 0; }
          .domain-area { padding: 0.75rem; }
        }
      `}</style>

      <div className="team-page">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Our Team</h1>
            <p className="page-subtitle">
              Meet the passionate individuals who drive our community forward and make innovation possible
            </p>
          </div>

          {/* Executive Section - 3-2 Grid Layout with Centered Bottom Row */}
          <div className="executives-section">
            <h2 className="section-title">Executive Team</h2>
            <div className="executives-flow">
              {executives.map((executive, index) => (
                <div key={index} className="executive-member">
                  <div className="member-profile">
                    <a 
                      href={executive.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="linkedin-btn"
                    >
                      <Linkedin />
                    </a>
                    <img 
                      src={executive.image && executive.image.startsWith('http') ? executive.image : (executive.image ? `${API_URL}${executive.image}` : '')} 
                      alt={executive.name}
                      className="member-image"
                    />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{executive.name}</h3>
                    <p className="member-role">{executive.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Teams Section - Organic Grid */}
          <div className="domains-section">
            <h2 className="section-title">Domain Teams</h2>
            <div className="domains-flow">
              {Object.entries(domainConfigs).map(([domainKey, config]) => {
                const domainMembers = getDomainMembers(domainKey);
                if (domainMembers.length === 0) return null;
                const currentMember = domainMembers[domainIndex[domainKey]];
                const Icon = config.icon;
                
                return (
                  <div key={domainKey} className="domain-area">
                    <div className="domain-header">
                      <div className="domain-icon">
                        <Icon />
                      </div>
                      <h3 className="domain-title">{config.title}</h3>
                    </div>
                    
                    <div className="member-showcase">
                      {domainMembers.length > 1 && (
                        <>
                          <div className="navigation-arrows nav-btn-left">
                            <button 
                              className="nav-btn"
                              onClick={() => handlePrev(domainKey)}
                            >
                              <ChevronLeft />
                            </button>
                          </div>
                          <div className="navigation-arrows nav-btn-right">
                            <button 
                              className="nav-btn"
                              onClick={() => handleNext(domainKey)}
                            >
                              <ChevronRight />
                            </button>
                          </div>
                        </>
                      )}
                      
                      <a 
                        href={currentMember.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="linkedin-btn"
                      >
                        <Linkedin />
                      </a>
                      
                      <img 
                        src={currentMember.image && currentMember.image.startsWith('http') ? currentMember.image : (currentMember.image ? `${API_URL}${currentMember.image}` : '')} 
                        alt={currentMember.name}
                        className="domain-member-image"
                      />
                      <div className="role-indicator">{currentMember.role}</div>
                      <h4 className="member-name">{currentMember.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
