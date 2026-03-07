import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Users, MapPin } from 'lucide-react';

export default function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${API_URL}/api/gallery/`)
      .then(res => res.json())
      .then(data => {
        // Map the API data to the format expected by the frontend
        const mappedEvents = data.map(event => ({
          ...event,
          thumbnail: event.thumbnail && event.thumbnail.startsWith('http') ? event.thumbnail : (event.thumbnail ? `${API_URL}${event.thumbnail}` : ''),
          images: event.images.map(img => img.image && img.image.startsWith('http') ? img.image : (img.image ? `${API_URL}${img.image}` : ''))
        }));
        setEvents(mappedEvents);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gallery data:", err);
        setLoading(false);
      });
  }, []);

  const openEventGallery = (event) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedEvent.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .gallery-page {
          min-height: 100vh;
          background: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          padding: 4rem 0;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 4rem;
          animation: fadeInDown 1s ease-out;
        }

        .page-title {
          font-size: 4rem;
          font-weight: 900;
          color: #cfa5f7;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(139, 92, 246, 0.1);
          animation: flipInY 1.5s ease-out;
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #c084fc;
          max-width: 48rem;
          margin: 0 auto;
          font-weight: 500;
          animation: slideInUp 2s ease-out;
        }

        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          animation: fadeIn 1.5s ease-out;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1.5rem;
          padding: 1.5rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          cursor: pointer;
          overflow: hidden;
          animation: slideInUp 1s ease-out;
          backdrop-filter: blur(10px);
        }

        .event-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 35px 70px -12px rgba(139, 92, 246, 0.2);
        }

        .event-thumbnail {
          width: 100%;
          height: 200px;
          border-radius: 1rem;
          object-fit: cover;
          margin-bottom: 1rem;
          transition: all 0.4s ease;
        }

        .event-card:hover .event-thumbnail {
          transform: scale(1.05);
        }

        .event-info {
          padding: 0.5rem 0;
        }

        .event-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .event-detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .event-detail svg {
          width: 1rem;
          height: 1rem;
          color: #8b5cf6;
        }

        .image-count {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          overflow: hidden;
          animation: scaleIn 0.3s ease-out;
        }

        .modal-header {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.98);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .close-btn {
          width: 2.5rem;
          height: 2.5rem;
          background: none;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #64748b;
        }

        .close-btn:hover {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
          transform: scale(1.1);
        }

        .image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .main-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #1e293b;
        }

        .nav-btn:hover {
          background: #8b5cf6;
          color: #ffffff;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn-left {
          left: 1rem;
        }

        .nav-btn-right {
          right: 1rem;
        }

        .nav-btn svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        .image-counter {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .thumbnail-strip {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.98);
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }

        .thumbnail-strip::-webkit-scrollbar {
          height: 4px;
        }

        .thumbnail-strip::-webkit-scrollbar-track {
          background: transparent;
        }

        .thumbnail-strip::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 2px;
        }

        .thumbnail {
          width: 60px;
          height: 60px;
          border-radius: 0.5rem;
          object-fit: cover;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          flex-shrink: 0;
        }

        .thumbnail:hover {
          transform: scale(1.1);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .thumbnail.active {
          border-color: #8b5cf6;
          transform: scale(1.1);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .event-card {
            padding: 1rem;
          }

          .event-thumbnail {
            height: 180px;
          }

          .modal-content {
            max-width: 95vw;
            max-height: 95vh;
          }

          .modal-header {
            padding: 1rem;
          }

          .modal-title {
            font-size: 1.25rem;
          }

          .main-image {
            max-height: 60vh;
          }

          .nav-btn {
            width: 2.5rem;
            height: 2.5rem;
          }

          .nav-btn svg {
            width: 1.25rem;
            height: 1.25rem;
          }

          .nav-btn-left {
            left: 0.5rem;
          }

          .nav-btn-right {
            right: 0.5rem;
          }

          .thumbnail {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <div className="gallery-page">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Event Gallery</h1>
            <p className="page-subtitle">
              Explore moments from our memorable events and celebrations
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="event-card" 
                onClick={() => openEventGallery(event)}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={event.thumbnail} 
                    alt={event.title}
                    className="event-thumbnail"
                  />
                  <div className="image-count">
                    {event.images.length} photos
                  </div>
                </div>
                <div className="event-info">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-details">
                    <div className="event-detail">
                      <Calendar />
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <MapPin />
                      <span>{event.location}</span>
                    </div>
                    <div className="event-detail">
                      <Users />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={closeGallery}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{selectedEvent.title}</h2>
                <button className="close-btn" onClick={closeGallery}>
                  <X />
                </button>
              </div>
              
              <div className="image-container">
                <img 
                  src={selectedEvent.images[currentImageIndex]} 
                  alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                  className="main-image"
                />
                
                {selectedEvent.images.length > 1 && (
                  <>
                    <button className="nav-btn nav-btn-left" onClick={prevImage}>
                      <ChevronLeft />
                    </button>
                    <button className="nav-btn nav-btn-right" onClick={nextImage}>
                      <ChevronRight />
                    </button>
                  </>
                )}
                
                <div className="image-counter">
                  {currentImageIndex + 1} of {selectedEvent.images.length}
                </div>
              </div>

              {selectedEvent.images.length > 1 && (
                <div className="thumbnail-strip">
                  {selectedEvent.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => goToImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
