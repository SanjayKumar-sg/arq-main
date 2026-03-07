import React, { useState, useEffect } from "react";

import utopia from "../photos/utopia thumbnail.webp"
import alumnati from "../photos/alumaniti thumbnail.webp"
import dataloar from "../photos/datalore thumbnail.webp"
import inaguration25 from "../photos/inaguration25.webp"
// Updated Data for ARQ Club of Data Science events

const upcomingEvents = [];

const pastSummary = {
  successStories: [
    {
      name: "sivarama krishna",
      story: "Pitch or Pass is an investment challenge where teams analyze data, develop strategies, and present proposals to expert investors.",
      year: "2025"
    },
    {
      name: "Sricharan N",
      story: "UXplore is a UI/UX design competition where teams craft innovative, user-centric experiences and complete design systems.",
      year: "2025"
    }
  ]
};

function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div style={styles.eventModalOverlay} onClick={onClose}>
      <div style={styles.eventModal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.eventModalHeader}>
          <div style={styles.eventModalIcon}>🚀</div>
          <div>
            <h3 style={styles.eventModalTitle}>{event.title}</h3>
            <div style={styles.eventModalMeta}>
              <span style={styles.eventDate}>📅 {event.date}</span>
              <span style={styles.eventLocation}>📍 {event.venue || "Virtual Event"}</span>
            </div>
          </div>
          <button style={styles.eventModalClose} onClick={onClose}>
            ×
          </button>
        </div>
        <div style={styles.eventModalBody}>
          <p style={styles.modalText}>{event.description}</p>
          <div>
            <h4 style={styles.modalSubheading}>Key Points:</h4>
            <p style={styles.modalText}>{event.short_info || event.short}</p>
          </div>
          <div>
            <h4 style={styles.modalSubheading}>Highlights:</h4>
            <p style={styles.modalText}>{event.highlights}</p>
          </div>
        </div>
        <div style={styles.eventModalFooter}>
          <div style={styles.eventModalActions}>
            <button style={styles.buttonPrimary} onClick={onClose}>
              Join Event
            </button>
            <button style={styles.buttonSecondary} onClick={onClose}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('completed');
  const [dots, setDots] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successStories, setSuccessStories] = useState([]);
  const [upcomingEventsBackend, setUpcomingEventsBackend] = useState([]);

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 12,
    minutes: 0,
    seconds: 0
  });

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${API_URL}/api/events/`)
      .then(res => res.json())
      .then(data => {
        setAllEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });

    fetch(`${API_URL}/api/success-stories/`)
      .then(res => res.json())
      .then(data => {
        setSuccessStories(data);
      })
      .catch(err => {
        console.error("Error fetching success stories:", err);
      });

    fetch(`${API_URL}/api/upcoming-events/`)
      .then(res => res.json())
      .then(data => {
        setUpcomingEventsBackend(data);
      })
      .catch(err => {
        console.error("Error fetching upcoming events:", err);
      });
  }, []);

  const completedEvents = allEvents.filter(e => e.status === "Completed");
  const upcomingEvents = allEvents.filter(e => e.status !== "Completed");

  // Animation for dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.eventsPage}>
      <style jsx>{`
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes horizontal-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes modal-appear { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); } 50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); } }
        @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
        .announcement-text { animation: shimmer 2s infinite linear; background: linear-gradient(to right, #8b5cf6 0%, #ffffff 50%, #8b5cf6 100%); background-size: 200px 100%; background-clip: text; -webkit-background-clip: text; color: transparent; }
        .floating-icon { animation: float 3s ease-in-out infinite; }
        .glowing-card { animation: glow 2s ease-in-out infinite; }
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000; color: #fff; }
        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr!important; }
          .enhanced-stats-grid { grid-template-columns: repeat(2,1fr)!important; }
          .stories-grid { grid-template-columns: 1fr!important; }
          .countdown-timer { flex-wrap: wrap!important; gap: 8px!important; }
          .hero-actions { flex-direction: column!important; align-items: center!important; }
        }
      `}</style>

      <section style={styles.eventsHero}>
        <div style={styles.eventsHeroContent}>
          <h1 style={styles.eventsHeroTitle}>Transform Your Future</h1>
          <p style={styles.eventsHeroSubtitle}>Join workshops, hackathons, and tech talks that shape your future</p>
        </div>
      </section>

      <main style={styles.section}>
        <div style={styles.tabNavigation}>
          <button style={{ ...styles.tabButton, ...(activeTab==='upcoming'?styles.tabButtonActive:{}) }} onClick={()=>setActiveTab('upcoming')}>Upcoming Events</button>
          <button style={{ ...styles.tabButton, ...(activeTab==='completed'?styles.tabButtonActive:{}) }} onClick={()=>setActiveTab('completed')}>Past Events</button>
        </div>

        {activeTab==='upcoming' && (
          <section>
            <div style={styles.eventsSectionHeader}>
              <h2 style={styles.eventsSectionTitle}>Upcoming Events</h2>
              <p style={styles.eventsSectionSubtitle}>Stay tuned for exciting announcements</p>
            </div>
            
            {upcomingEventsBackend.length > 0 ? (
              <div style={styles.upcomingEventsGrid}>
                {upcomingEventsBackend.map((event, i) => (
                  <div key={event.id} style={styles.upcomingEventCard} onClick={() => setSelectedEvent(event)}>
                    <div style={styles.upcomingEventImage}>
                      <img 
                        src={event.image && event.image.startsWith('http') ? event.image : (event.image ? `${API_URL}${event.image}` : '')} 
                        alt={event.title} 
                        style={styles.upcomingEventImageImg}
                      />
                      <div style={styles.upcomingEventOverlay}>
                        <span style={styles.upcomingBadge}>NEW</span>
                      </div>
                    </div>
                    <div style={styles.upcomingEventContent}>
                      <h3 style={styles.upcomingEventTitle}>{event.title}</h3>
                      <div style={styles.upcomingMeta}>
                        <span>📅 {event.date}</span>
                        <span>📍 {event.venue}</span>
                      </div>
                      <p style={styles.upcomingDescription}>{event.short_info || event.description.substring(0, 100) + '...'}</p>
                      {event.link && (
                        <a href={event.link} target="_blank" rel="noopener noreferrer" style={styles.registerButton} onClick={(e) => e.stopPropagation()}>
                          Register Now
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Coming Soon Announcement */
              <div style={styles.comingSoonContainer}>
                <div className="glowing-card" style={styles.comingSoonCard}>
                  <p style={styles.comingSoonSubtitle}>
                    We're cooking up something amazing! Stay connected for updates on our upcoming events.
                  </p>
                  <div style={styles.comingSoonFeatures}>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>🚀</span>
                      <span>Innovative Workshops</span>
                    </div>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>🏆</span>
                      <span>Competitions</span>
                    </div>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>🎯</span>
                      <span>Tech Talks</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab==='completed' && (
          <section style={styles.completedEventsSection}>
            <div style={styles.eventsSectionHeader}>
              <h2 style={styles.eventsSectionTitle}>Past Events</h2>
              <p style={styles.eventsSectionSubtitle}>Celebrating our successful events and achievements</p>
            </div>
            <div style={styles.completedEventsScrollContainer}>
              <div style={styles.completedEventsScrollWrapper}>
                {[...completedEvents,...completedEvents].map((event,i)=>(
                  <div key={`${event.id}-${i}`} style={styles.completedEventCard} onClick={() => setSelectedEvent(event)}>
                    <div style={styles.completedEventImage}>
                       <img src={event.image && event.image.startsWith('http') ? event.image : (event.image ? `${API_URL}${event.image}` : '')} alt={event.title} style={styles.completedEventImageImg}/>
                      <div style={styles.completedEventOverlay}>
                        <span style={styles.eventTypeBadge}>{event.type}</span>
                        <div style={styles.eventRating}><span style={styles.ratingStars}>⭐</span><span style={styles.ratingScore}>{event.rating}</span></div>
                      </div>
                    </div>
                    <div style={styles.completedEventContent}>
                      <div style={styles.completedEventHeader}>
                        <h3 style={styles.completedEventTitle}>{event.title}</h3>
                        <span style={styles.completedEventStatus}>{event.status}</span>
                      </div>
                      <div style={styles.completedEventMeta}>
                        <div style={styles.completedMetaItem}><span style={styles.metaIcon}>📅</span><span>{event.date}</span></div>
                        <div style={styles.completedMetaItem}><span style={styles.metaIcon}>⏱</span><span>{event.duration}</span></div>
                      </div>
                      <div style={styles.completedEventHighlights}>
                        <h4 style={styles.highlightsTitle}>Highlights</h4>
                        <p style={styles.highlightsText}>{event.highlights}</p>
                      </div>
                      <div style={styles.completedEventStats}>
                        <div style={styles.statItem}><div style={styles.statNumber}>{event.participants||"-"}</div><div style={styles.statLabel}>Participants</div></div>
                        <div style={styles.statItem}><div style={styles.statNumber}>{event.rating}</div><div style={styles.statLabel}>Rating</div></div>
                        <div style={styles.statItem}><div style={styles.statNumber}>100%</div><div style={styles.statLabel}>Completion</div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section style={styles.eventsStatsSection}>
          <h2 style={styles.statsSectionTitle}>Our Impact in Numbers</h2>
          <div className="enhanced-stats-grid" style={styles.enhancedStatsGrid}>
            <div style={styles.enhancedStatsCard}><div style={styles.statsCardIcon}>🎯</div><div style={styles.statsCardNumber}>4+</div><div style={styles.statsCardLabel}>Events Conducted</div><div style={styles.statsCardTrend}><span>📈</span><span>+35% this year</span></div></div>
            <div style={styles.enhancedStatsCard}><div style={styles.statsCardIcon}>👥</div><div style={styles.statsCardNumber}>50K+</div><div style={styles.statsCardLabel}>Total Participants</div><div style={styles.statsCardTrend}><span>📈</span><span>+40% growth</span></div></div>
            <div style={styles.enhancedStatsCard}><div style={styles.statsCardIcon}>🏆</div><div style={styles.statsCardNumber}>98%</div><div style={styles.statsCardLabel}>Satisfaction Rate</div><div style={styles.statsCardTrend}><span>📈</span><span>Excellent feedback</span></div></div>
            <div style={styles.enhancedStatsCard}><div style={styles.statsCardIcon}>🌟</div><div style={styles.statsCardNumber}>5K+</div><div style={styles.statsCardLabel}>Certificates Issued</div><div style={styles.statsCardTrend}><span>📈</span><span>Career boost</span></div></div>
          </div>
        </section>

        <section style={styles.successStories}>
          <h2 style={styles.successTitle}>Success Stories</h2>
          <div className="stories-grid" style={styles.storiesGrid}>
            {successStories.map((s,i)=>(
              <div key={i} style={styles.storyCard}>
                <div style={styles.storyAvatar}>👤</div>
                <div style={styles.storyContent}>
                  <h4 style={styles.storyQuote}>{s.story}</h4>
                  <p style={styles.storyAuthor}>- {s.name}, {s.year}</p>
                  <div style={styles.storyRating}>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedEvent && <EventModal event={selectedEvent} onClose={()=>setSelectedEvent(null)}/>}
    </div>
  );
}

const styles = {
  eventsPage: {
    minHeight: '100vh',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    background: '#000000',
    color: '#ffffff',
  },
  eventsHero: {
    position: 'relative',
    minHeight: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000000',
    padding: '15px 15px 10px',
  },
  eventsHeroContent: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '0 15px',
  },
  eventsHeroBadge: {
    display: 'inline-block',
    background: '#8B5CF6',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '15px',
  },
  eventsHeroTitle: {
    fontSize: '42px',
    margin: '10px 0 8px 0',
    color: '#ffffff',
    fontWeight: '700',
  },
  eventsHeroSubtitle: {
    fontSize: '16px',
    color: '#9CA3AF',
    marginBottom: '10px',
    lineHeight: '1.6',
  },
  section: {
    margin: '10px auto',
    maxWidth: '1200px',
    padding: '0 15px',
  },
  tabNavigation: {
    display: 'flex',
    gap: '8px',
    marginBottom: '15px',
    justifyContent: 'center',
  },
  tabButton: {
    padding: '10px 20px',
    border: '1px solid #374151',
    background: '#1F2937',
    color: '#9CA3AF',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  tabButtonActive: {
    background: '#8B5CF6',
    color: '#ffffff',
    borderColor: '#8B5CF6',
  },
  eventsSectionHeader: {
    textAlign: 'center',
    margin: '15px 0 15px',
  },
  eventsSectionTitle: {
    fontSize: '30px',
    marginBottom: '6px',
    color: '#ffffff',
    fontWeight: '700',
  },
  eventsSectionSubtitle: {
    color: '#9CA3AF',
    fontSize: '14px',
  },
  // Coming Soon Styles
  comingSoonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '250px',
    padding: '10px 10px',
  },
  comingSoonCard: {
    background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
    borderRadius: '16px',
    padding: '25px 20px',
    textAlign: 'center',
    maxWidth: '550px',
    width: '100%',
    border: '2px solid #8B5CF6',
    position: 'relative',
    overflow: 'hidden',
  },
  comingSoonTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '12px',
    background: 'linear-gradient(45deg, #8b5cf6, #ffffff, #8b5cf6)',
    backgroundSize: '200% 200%',
  },
  comingSoonSubtitle: {
    fontSize: '16px',
    color: '#D1D5DB',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  comingSoonFeatures: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '0px',
    flexWrap: 'wrap',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#D1D5DB',
    fontSize: '14px',
    fontWeight: '500',
  },
  featureIcon: {
    fontSize: '20px',
  },
  completedEventsSection: {
    margin: '20px 0',
  },
  completedEventsScrollContainer: {
    position: 'relative',
    overflow: 'hidden',
    padding: '15px 0',
  },
  completedEventsScrollWrapper: {
    display: 'flex',
    gap: '20px',
    animation: 'horizontal-scroll 40s linear infinite',
    width: 'fit-content',
  },
  completedEventCard: {
    flexShrink: 0,
    width: '320px',
    background: '#1F2937',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #374151',
  },
  completedEventImage: {
    position: 'relative',
    height: '160px',
    overflow: 'hidden',
  },
  completedEventImageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  completedEventOverlay: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    right: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventTypeBadge: {
    background: '#8B5CF6',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: '600',
  },
  eventRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '16px',
    fontSize: '11px',
  },
  ratingStars: {
    fontSize: '12px',
  },
  ratingScore: {
    fontWeight: '600',
    color: '#ffffff',
  },
  completedEventContent: {
    padding: '18px',
  },
  completedEventHeader: {
    marginBottom: '12px',
  },
  completedEventTitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    lineHeight: '1.3',
  },
  completedEventStatus: {
    background: '#10B981',
    color: '#ffffff',
    padding: '3px 10px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  completedEventMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px',
  },
  completedMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    color: '#9CA3AF',
    fontSize: '12px',
    background: '#374151',
    padding: '3px 6px',
    borderRadius: '4px',
  },
  metaIcon: {
    fontSize: '12px',
  },
  completedEventHighlights: {
    marginBottom: '15px',
  },
  highlightsTitle: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    margin: '0 0 6px 0',
  },
  highlightsText: {
    color: '#D1D5DB',
    fontSize: '12px',
    margin: 0,
    lineHeight: '1.5',
  },
  completedEventStats: {
    display: 'flex',
    justifyContent: 'space-around',
    background: '#374151',
    padding: '12px',
    borderRadius: '6px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#8B5CF6',
  },
  statLabel: {
    fontSize: '10px',
    color: '#9CA3AF',
    marginTop: '2px',
    fontWeight: '500',
  },
  eventsStatsSection: {
    margin: '30px 0',
    textAlign: 'center',
  },
  statsSectionTitle: {
    fontSize: '30px',
    marginBottom: '25px',
    color: '#ffffff',
    fontWeight: '700',
  },
  enhancedStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '25px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  enhancedStatsCard: {
    background: '#1F2937',
    padding: '32px 24px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #374151',
    transition: 'transform 0.2s ease',
  },
  statsCardIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  statsCardNumber: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: '8px',
  },
  statsCardLabel: {
    color: '#D1D5DB',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  statsCardTrend: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    color: '#10B981',
    fontSize: '14px',
    fontWeight: '500',
  },
  successStories: {
    margin: '30px 0',
    textAlign: 'center',
  },
  successTitle: {
    fontSize: '30px',
    marginBottom: '25px',
    color: '#ffffff',
    fontWeight: '700',
  },
  storiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '18px',
  },
  storyCard: {
    background: '#1F2937',
    padding: '18px',
    borderRadius: '10px',
    display: 'flex',
    gap: '15px',
    textAlign: 'left',
    border: '1px solid #374151',
  },
  storyAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
    color: '#9CA3AF',
  },
  storyContent: {
    flex: 1,
  },
  storyQuote: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 0 8px 0',
    lineHeight: '1.5',
  },
  storyAuthor: {
    color: '#9CA3AF',
    fontSize: '12px',
    margin: '0 0 6px 0',
  },
  storyRating: {
    fontSize: '14px',
  },
  buttonPrimary: {
    padding: '10px 20px',
    background: '#8B5CF6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.2s ease',
  },
  buttonSecondary: {
    padding: '10px 20px',
    background: 'transparent',
    color: '#8B5CF6',
    border: '2px solid #8B5CF6',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.2s ease',
  },
  eventModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '15px',
  },
  eventModal: {
    background: '#1F2937',
    borderRadius: '10px',
    maxWidth: '480px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    animation: 'modal-appear 0.3s ease-out',
    border: '1px solid #374151',
  },
  eventModalHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '18px 18px 12px',
    borderBottom: '1px solid #374151',
  },
  eventModalIcon: {
    fontSize: '28px',
    flexShrink: 0,
  },
  eventModalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
  },
  eventModalMeta: {
    display: 'flex',
    gap: '12px',
    marginTop: '6px',
  },
  eventDate: {
    color: '#9CA3AF',
    fontSize: '12px',
  },
  eventLocation: {
    color: '#9CA3AF',
    fontSize: '12px',
  },
  eventModalClose: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#9CA3AF',
    cursor: 'pointer',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
  },
  eventModalBody: {
    padding: '15px 18px',
  },
  modalText: {
    color: '#D1D5DB',
    lineHeight: '1.6',
    margin: '0 0 12px 0',
  },
  modalSubheading: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    margin: '12px 0 6px 0',
  },
  eventModalFooter: {
    padding: '0 18px 18px',
  },
  eventModalActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
  upcomingEventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    padding: '20px 0',
  },
  upcomingEventCard: {
    background: '#1F2937',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #374151',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  upcomingEventImage: {
    position: 'relative',
    height: '180px',
  },
  upcomingEventImageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  upcomingEventOverlay: {
    position: 'absolute',
    top: '12px',
    left: '12px',
  },
  upcomingBadge: {
    background: '#8B5CF6',
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '700',
  },
  upcomingEventContent: {
    padding: '20px',
  },
  upcomingEventTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#ffffff',
  },
  upcomingMeta: {
    display: 'flex',
    gap: '15px',
    color: '#9CA3AF',
    fontSize: '14px',
    marginBottom: '12px',
  },
  upcomingDescription: {
    color: '#D1D5DB',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  registerButton: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    background: '#8B5CF6',
    color: '#ffffff',
    padding: '10px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
  },
};

export default Events;
