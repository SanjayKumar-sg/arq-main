import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/services/")
      .then(response => {
        setServicesList(response.data);
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .services-page {
          min-height: 100vh;
          background: #0b0b0e;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          padding: 4rem 0 8rem;
          position: relative;
          overflow-x: hidden;
        }

        .services-page::before {
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
          z-index: 0;
        }

        .services-page::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(45deg, transparent 49%, rgba(168, 85, 247, 0.04) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(168, 85, 247, 0.04) 50%, transparent 51%);
          background-size: 60px 60px;
          animation: patternSlide 25s linear infinite;
          z-index: 0;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
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
          color: #f8fafc;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 6px rgba(168, 85, 247, 0.15);
          animation: flipInY 1.5s ease-out;
          position: relative;
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #cbd5e1;
          max-width: 48rem;
          margin: 0 auto;
          font-weight: 500;
          animation: slideInUp 2s ease-out;
        }

        .services-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 3rem;
          animation: fadeIn 2s ease-out;
        }

        /* Each service area as a white frame card (mirroring Team's white card) */
        .service-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid rgba(168, 85, 247, 0.25);
          border-radius: 18px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.15), 0 6px 14px rgba(0,0,0,0.25);
          transition: all 0.4s ease;
          animation: slideInUp 1.5s ease-out;
          text-decoration: none;
          cursor: pointer;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 40px rgba(168, 85, 247, 0.22), 0 10px 18px rgba(0,0,0,0.35);
        }

        .service-image-container {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border: 4px solid #ffffff;
          outline: 2px solid rgba(168, 85, 247, 0.35);
          transition: all 0.4s ease;
          background: #fff;
          aspect-ratio: 16/9;
        }

        .service-card:hover .service-image-container {
          outline-color: rgba(168, 85, 247, 0.6);
          box-shadow: 0 15px 35px rgba(168, 85, 247, 0.25);
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-image {
          transform: scale(1.04);
        }

        .service-info {
          text-align: center;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .service-title {
          font-size: 1.35rem;
          font-weight: 900;
          color: #0b0b0e;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-title {
          color: #6b21a8;
          transform: translateY(-1px);
        }

        .service-description {
          font-size: 1rem;
          color: #4b5563; /* Darker grey to be legible on white card */
          line-height: 1.6;
          text-align: center;
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

        @media (max-width: 768px) {
          .services-page { padding: 2rem 0; }
          .page-title { font-size: 2.5rem; }
          .page-header { margin-bottom: 4rem; }
          .services-flow { grid-template-columns: 1fr; gap: 2.5rem;}
        }

        @media (max-width: 480px) {
          .page-title { font-size: 2rem; }
          .services-flow { gap: 2rem; }
        }
      `}</style>

      <div className="services-page">
        <Helmet>
          <title>Services | ARQ</title>
        </Helmet>
        
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Our Services</h1>
            <p className="page-subtitle">
              Empowering your decisions with Analysis, Research, and Quant strategies carefully tailored to your needs.
            </p>
          </div>

          <div className="services-flow">
            {servicesList.map((service, index) => (
              <a 
                key={service.id || index} 
                href={service.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="service-card"
              >
                <div className="service-image-container">
                  <img 
                    src={service.image && service.image.startsWith('http') ? service.image : `http://127.0.0.1:8000${service.image}`} 
                    alt={service.title || `Service ${index + 1}`} 
                    className="service-image"
                  />
                </div>
                <div className="service-info">
                  <h3 className="service-title">{service.title}</h3>
                  {service.description && (
                    <p className="service-description">{service.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
