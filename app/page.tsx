"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SearchField = {
  id: string;
  label: string;
  placeholder: string;
};

type SectionBlueprint = {
  id: string;
  title: string;
  cardCount: number;
};

type VenueCard = {
  id: string;
  name: string;
  price: string;
};

const searchFields: SearchField[] = [
  { id: "where", label: "Where", placeholder: "Search event" },
  { id: "occasion", label: "Occasion", placeholder: "Add occasion" },
  { id: "when", label: "When", placeholder: "Add dates" },
  { id: "guest", label: "Guest", placeholder: "Add pax" },
  { id: "budget", label: "Budget", placeholder: "Add budget" },
];

const sectionBlueprints: SectionBlueprint[] = [
  {
    id: "popular-cebu",
    title: "Popular Birthday venues in Cebu City >",
    cardCount: 8,
  },
  {
    id: "affordable-anniversary",
    title: "Affordable Anniversary venues near you >",
    cardCount: 8,
  },
  {
    id: "recommended-lapu",
    title: "Recommended venues in Lapu-Lapu City >",
    cardCount: 8,
  },
];

const EventIcon = () => (
  <svg
    aria-hidden="true"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#15a1ff"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <path d="M3 10h18" />
    <path d="M8 2v4" />
    <path d="M16 2v4" />
  </svg>
);

const LanguageIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#222"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z" />
  </svg>
);

const BurgerIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#222"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

const SearchIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#111"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M16.5 16.5 21 21" />
  </svg>
);

export default function Home() {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [searchHovered, setSearchHovered] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const searchbarRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sectionData = useMemo(
    () =>
      sectionBlueprints.map((section) => ({
        ...section,
        venues: Array.from({ length: section.cardCount }, (_, index) => ({
          id: `${section.id}-${index + 1}`,
          name: "Insert Event Venue",
          price: "Insert Price",
        })),
      })),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
      if (
        burgerOpen &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setBurgerOpen(false);
      }
      if (
        languageOpen &&
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
      }
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [burgerOpen, modalOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBurgerOpen(false);
        setLanguageOpen(false);
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);
  const currentYear = new Date().getFullYear();

  const scrollCarousel = (sectionId: string, direction: 'left' | 'right') => {
    const carousel = carouselRefs.current[sectionId];
    if (carousel) {
      const scrollAmount = 400; // Adjust scroll distance as needed
      carousel.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="page-shell">
      <header className="header">
        
        <div className="left-section">
          <button className="logo-mark" type="button" aria-label="Venu home">
            <img src="/venu-logo.png" alt="Venu Logo" className="logo-icon" />
          </button>
        </div>

        <div className="middle-section">
          <button className="event-button" type="button">
            <EventIcon />
            <div className="event">EVENTS</div>
          </button>
        </div>

        <div className="right-section">
          <button className="list-your-place" type="button">
            List your place
          </button>
          <button className="currency" type="button">
            PHP
          </button>
          <button 
            className="sign-in" 
            type="button"
            onClick={() => setModalOpen(true)}
          >
            Sign-in
          </button>
          <button 
            className="create-account" 
            type="button"
            onClick={() => setModalOpen(true)}
          >
            Create an Account
          </button>
          <div className="language-wrapper" ref={languageRef}>
            <button
              className="language-button"
              type="button"
              aria-expanded={languageOpen}
              aria-label={languageOpen ? "Close language menu" : "Open language menu"}
              onClick={(event) => {
                event.stopPropagation();
                setLanguageOpen((prev) => !prev);
              }}
            >
              <LanguageIcon />
            </button>
            <div
              className={`language-popup ${languageOpen ? "open" : ""}`}
              role="menu"
              aria-hidden={!languageOpen}
            >
              <div className="popup-menu">
                <button 
                  className="menu-item language-option" 
                  type="button"
                  onClick={() => {
                    setLanguageOpen(false);
                    // Add language change logic here
                  }}
                >
                  <span className="language-flag"></span>
                  <span>English</span>
                </button>
              </div>
            </div>
          </div>
          <div className="burger-wrapper" ref={burgerRef}>
            <button
              className="burger-button"
              type="button"
              aria-expanded={burgerOpen}
              aria-label={burgerOpen ? "Close menu" : "Open menu"}
              onClick={(event) => {
                event.stopPropagation();
                setBurgerOpen((prev) => !prev);
              }}
            >
              <BurgerIcon />
            </button>
            <div
              className={`burger-popup ${burgerOpen ? "open" : ""}`}
              role="menu"
              aria-hidden={!burgerOpen}
            >
              <div className="popup-menu">
                <div className="menu-top">
                  <button className="menu-item" type="button">
                    Help Center
                  </button>
                  <button className="menu-item" type="button">
                    Favorites
                  </button>
                </div>
                <div className="menu-divider" role="separator" aria-hidden="true" />
                <div className="menu-auth">
                  <button 
                    className="popup-signin" 
                    type="button"
                    onClick={() => {
                      setModalOpen(true);
                      setBurgerOpen(false);
                    }}
                  >
                    Sign in
                  </button>
                  <button 
                    className="popup-create" 
                    type="button"
                    onClick={() => {
                      setModalOpen(true);
                      setBurgerOpen(false);
                    }}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="venu-motto">
          <p>Plan less, celebrate more</p>
        </div>

        <div
          className={`searchbar ${searchHovered ? "hovered" : ""}`}
          ref={searchbarRef}
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
        >
          {searchFields.map((field) => (
            <div
              key={field.id}
              className={`field ${
                activeField && activeField !== field.id ? "dimmed" : ""
              }`}
            >
              <label htmlFor={`search-${field.id}`}>{field.label}</label>
              <input
                id={`search-${field.id}`}
                type="text"
                placeholder={field.placeholder}
                onFocus={() => setActiveField(field.id)}
                onClick={() => setActiveField(field.id)}
              />
            </div>
          ))}
          <button className="search-button" type="button" aria-label="Search venues">
            <SearchIcon />
          </button>
        </div>
      </header>

      <main className="content">
        {sectionData.map((section) => (
          <section key={section.id} className="venue-section">
            <div className="venue-section-header">
              <h2 className="venue-suggest">{section.title}</h2>
              <div className="carousel-buttons-group">
                <button
                  className="carousel-button carousel-button-left"
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollCarousel(section.id, 'left')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className="carousel-button carousel-button-right"
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollCarousel(section.id, 'right')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="carousel-container">
              <div
                className="event-carousel"
                ref={(el) => {
                  carouselRefs.current[section.id] = el;
                }}
              >
                {section.venues.map((venue: VenueCard) => (
                  <div className="event-preview" key={venue.id}>
                    <div className="thumb-wrapper">
                      <div className="thumbnail" aria-hidden="true" />
                      <button
                        className={`favorite-button ${isFavorite(venue.id) ? "active" : ""}`}
                        type="button"
                        aria-pressed={isFavorite(venue.id)}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(venue.id);
                        }}
                      >
                        <div className="circle" aria-hidden="true" />
                        <svg className="heart" viewBox="0 0 24 24">
                          <path d="M12 21s-6-4.35-10-9c-3.33-4 0-11 6-8 3 1 4 3 4 3s1-2 4-3c6-3 9.33 4 6 8-4 4.65-10 9-10 9z" />
                        </svg>
                      </button>
                      <p className="insert-venue">{venue.name}</p>
                      <p className="insert-price">{venue.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; {currentYear} Venu. All rights reserved.</p>
        </div>
      </footer>

      {/* Sign in Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div 
            className="modal-box" 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close modal"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="modal-title">Sign in or create an account</h2>
            <p className="modal-description">
              Sign up or log in to access amazing deals and benefits!
            </p>
            
            <div className="modal-social-buttons">
              <button className="social-button social-google" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
              <button className="social-button social-facebook" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Sign in with Facebook
              </button>
              <button className="social-button social-apple" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="modal-divider">
              <span>or</span>
            </div>

            <div className="modal-email-section">
              <input
                type="email"
                className="modal-email-input"
                placeholder="id@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="modal-continue-button" type="button">
                Continue
              </button>
            </div>

            <button className="modal-other-ways" type="button">
              Other ways to sign in
            </button>

            <p className="modal-terms">
              By signing in, I agree to Venu's{" "}
              <a href="#" className="modal-link">Terms of Use</a> and{" "}
              <a href="#" className="modal-link">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
