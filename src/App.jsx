import { useState, useMemo } from "react";

const BUSINESSES = [
  { id: 1, name: "Fade Kings Barbershop", city: "Lisbon", category: "Barber", identity_tags: ["Black-owned", "Black barber", "Afro hair specialist"], description: "Award-winning cuts for textured and Afro hair. A welcoming space beloved by the diaspora community in Lisbon.", rating: 4.9 },
  { id: 2, name: "Belo Corte", city: "Lisbon", category: "Barber", identity_tags: ["Black-owned", "Black barber", "Braids", "Locs"], description: "Specialising in braids, twists, locs and fades. Family-run shop with roots in Cape Verde.", rating: 4.7 },
  { id: 3, name: "Mercado África", city: "Lisbon", category: "Grocery", identity_tags: ["African grocery", "Black-owned", "West African products"], description: "Your one-stop shop for African pantry staples — from fufu flour and egusi to plantain and palm oil.", rating: 4.8 },
  { id: 4, name: "Sabores de Angola", city: "Lisbon", category: "Restaurant", identity_tags: ["African food", "Black-owned", "Angolan cuisine"], description: "Authentic Angolan home cooking. Try the muamba de galinha and fresh palm-wine.", rating: 4.6 },
  { id: 5, name: "Igreja Pentecostal da Graça", city: "Lisbon", category: "Church", identity_tags: ["Pentecostal church", "African community", "Portuguese-speaking"], description: "A vibrant Pentecostal congregation serving the Lusophone African community with Sunday services and youth groups.", rating: 4.9 },
  { id: 6, name: "Masjid Al-Nour", city: "Lisbon", category: "Mosque", identity_tags: ["Mosque", "Muslim community", "Halal", "Prayer space"], description: "Welcoming mosque in central Lisbon with daily prayers, Friday khutbah, and a small library.", rating: 4.8 },
  { id: 7, name: "Bella Modesta Salon", city: "Florence", category: "Salon", identity_tags: ["Hijabi-friendly", "Women-only section", "Modest styling"], description: "A sophisticated salon offering a private room for sisters who prefer modesty. Expert colour, cuts, and styling.", rating: 4.7 },
  { id: 8, name: "Umm Kulthum Atelier", city: "Florence", category: "Boutique", identity_tags: ["Modest fashion", "Hijabi-friendly", "Islamic wear"], description: "Elegant modest wear and custom tailoring. Beautiful abayas, modest dresses and occasion wear made in Florence.", rating: 4.8 },
  { id: 9, name: "Tokyo Afro Studio", city: "Tokyo", category: "Salon", identity_tags: ["Black hair specialist", "Afro hair", "Natural hair", "Expat-friendly"], description: "The go-to studio for natural and Afro hair in Tokyo. Serving the international community since 2015.", rating: 4.6 },
  { id: 10, name: "Shalom Messianic Fellowship", city: "Tokyo", category: "Church", identity_tags: ["Pentecostal church", "International community", "English-speaking"], description: "Spirit-filled international fellowship meeting every Sunday. Warm welcome extended to all visitors.", rating: 4.8 },
  { id: 11, name: "African Kitchen Tokyo", city: "Tokyo", category: "Restaurant", identity_tags: ["African food", "Nigerian cuisine", "Black-owned"], description: "A taste of home in the heart of Tokyo. Jollof rice, egusi soup, suya and more.", rating: 4.5 },
  { id: 12, name: "Harlem Cuts Berlin", city: "Berlin", category: "Barber", identity_tags: ["Black barber", "Afro hair", "Black-owned", "Fades"], description: "Berlin's most renowned Black barber. Expert fades, line-ups and beard grooming for the diaspora.", rating: 4.9 },
  { id: 13, name: "Afrikiko Supermarkt", city: "Berlin", category: "Grocery", identity_tags: ["African grocery", "West African products", "Halal"], description: "Huge selection of African and Caribbean groceries. Halal meats, fresh yam, and hard-to-find spices.", rating: 4.6 },
  { id: 14, name: "Al-Rahma Mosque Berlin", city: "Berlin", category: "Mosque", identity_tags: ["Mosque", "Muslim community", "Halal", "Arabic & German"], description: "Central mosque offering prayer times, Quran classes and a welcoming community for Muslim visitors and locals.", rating: 4.7 },
  { id: 15, name: "Grace International Church", city: "Berlin", category: "Church", identity_tags: ["Pentecostal church", "International", "English-speaking", "African community"], description: "Dynamic, multilingual Pentecostal church with a strong diaspora congregation and powerful worship.", rating: 4.8 },
  { id: 16, name: "La Beauté Modeste", city: "Paris", category: "Salon", identity_tags: ["Hijabi-friendly", "Women-only", "Modest styling", "Afro hair"], description: "Paris's pioneering women-only salon for modest and natural hair styling. Relaxed, safe, stylish.", rating: 4.9 },
  { id: 17, name: "Épicerie Africaine Château d'Or", city: "Paris", category: "Grocery", identity_tags: ["African grocery", "Black-owned", "Halal", "Caribbean products"], description: "Beloved African and Caribbean grocery in the 18th arrondissement. Fresh produce, spices, and specialty ingredients.", rating: 4.7 },
];

const CITIES = ["All Cities", ...Array.from(new Set(BUSINESSES.map((b) => b.city))).sort()];

const TAG_COLORS = [
  { bg: "#FEF3C7", text: "#92400E" },
  { bg: "#D1FAE5", text: "#065F46" },
  { bg: "#DBEAFE", text: "#1E40AF" },
  { bg: "#FCE7F3", text: "#9D174D" },
  { bg: "#EDE9FE", text: "#5B21B6" },
  { bg: "#FEE2E2", text: "#991B1B" },
];

const tagColor = (tag) => TAG_COLORS[tag.charCodeAt(0) % TAG_COLORS.length];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: 14, color: i < full ? "#F59E0B" : i === full && half ? "#F59E0B" : "#D1D5DB" }}>
          {i < full ? "★" : i === full && half ? "⯨" : "☆"}
        </span>
      ))}
      <span style={{ marginLeft: 4, fontSize: 13, fontWeight: 700, color: "#92400E", fontFamily: "monospace" }}>{rating.toFixed(1)}</span>
    </span>
  );
};

const CATEGORY_ICONS = {
  Barber: "✂️", Grocery: "🛒", Restaurant: "🍽️", Church: "⛪", Mosque: "🕌", Salon: "💆", Boutique: "👗",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Cities");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return [];
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return BUSINESSES.filter((b) => {
      const cityMatch = city === "All Cities" || b.city === city;
      const textMatch =
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.identity_tags.some((t) => t.toLowerCase().includes(q)) ||
        b.city.toLowerCase().includes(q);
      return cityMatch && textMatch;
    });
  }, [query, city, submitted]);

  const handleSearch = () => setSubmitted(true);
  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  const showWarning = submitted && query.trim() === "";
  const showNoResults = submitted && query.trim() !== "" && results.length === 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FDF6ED; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .hero { background: linear-gradient(135deg, #1C1917 0%, #292524 60%, #3B1F0E 100%); padding: 60px 24px 80px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(251,146,60,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(234,179,8,0.08) 0%, transparent 40%); pointer-events: none; }
        .hero-dots { position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(#F5DEB3 1px, transparent 1px); background-size: 28px 28px; opacity: 0.04; }
        .hero-inner { max-width: 720px; margin: 0 auto; position: relative; z-index: 1; }
        .logo-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(251,146,60,0.15); border: 1px solid rgba(251,146,60,0.3); border-radius: 999px; padding: 6px 16px; margin-bottom: 28px; }
        .logo-badge span { font-size: 13px; color: #FB923C; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
        h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 3.6rem); font-weight: 900; color: #FDF6ED; line-height: 1.1; margin-bottom: 14px; letter-spacing: -0.02em; }
        h1 em { color: #FB923C; font-style: normal; }
        .subtitle { color: #A8A29E; font-size: 1.05rem; margin-bottom: 36px; line-height: 1.6; max-width: 540px; }
        .search-bar { display: flex; gap: 10px; flex-wrap: wrap; }
        .search-input-wrap { flex: 1; min-width: 220px; position: relative; }
        .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 18px; pointer-events: none; }
        input[type="text"] { width: 100%; padding: 15px 18px 15px 46px; border-radius: 14px; border: 2px solid transparent; background: rgba(255,255,255,0.09); color: #FDF6ED; font-size: 1rem; font-family: 'DM Sans', sans-serif; outline: none; transition: border 0.2s, background 0.2s; backdrop-filter: blur(4px); }
        input[type="text"]::placeholder { color: #78716C; }
        input[type="text"]:focus { border-color: #FB923C; background: rgba(255,255,255,0.13); }
        select { padding: 15px 20px; border-radius: 14px; border: 2px solid transparent; background: rgba(255,255,255,0.09); color: #FDF6ED; font-size: 0.95rem; font-family: 'DM Sans', sans-serif; outline: none; cursor: pointer; transition: border 0.2s; backdrop-filter: blur(4px); -webkit-appearance: none; min-width: 150px; }
        select option { background: #292524; color: #FDF6ED; }
        select:focus { border-color: #FB923C; }
        .search-btn { padding: 15px 28px; background: #FB923C; color: #1C1917; border: none; border-radius: 14px; font-size: 1rem; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.2s, transform 0.1s; white-space: nowrap; }
        .search-btn:hover { background: #F97316; }
        .search-btn:active { transform: scale(0.97); }
        .hints { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
        .hint-pill { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; padding: 5px 14px; font-size: 12px; color: #A8A29E; cursor: pointer; transition: background 0.15s, color 0.15s; user-select: none; }
        .hint-pill:hover { background: rgba(251,146,60,0.15); color: #FB923C; border-color: rgba(251,146,60,0.3); }
        .main { max-width: 900px; margin: 0 auto; padding: 40px 24px 80px; }
        .results-header { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #292524; margin-bottom: 24px; font-weight: 700; }
        .results-header span { color: #FB923C; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 48px; }
        .card { background: #fff; border-radius: 20px; padding: 24px; border: 1.5px solid #F5E6D0; box-shadow: 0 2px 12px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; animation: fadeUp 0.35s ease both; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.09); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .card:nth-child(1){animation-delay:0s}.card:nth-child(2){animation-delay:.05s}.card:nth-child(3){animation-delay:.1s}.card:nth-child(4){animation-delay:.15s}.card:nth-child(5){animation-delay:.2s}.card:nth-child(6){animation-delay:.25s}
        .card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
        .card-icon { width: 44px; height: 44px; background: #FEF3C7; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .card-city { font-size: 12px; color: #A8A29E; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 4px; }
        .card-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #1C1917; margin-bottom: 8px; line-height: 1.3; }
        .card-desc { font-size: 0.88rem; color: #57534E; line-height: 1.6; margin-bottom: 16px; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .tag { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.02em; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px dashed #F5E6D0; }
        .card-category { font-size: 12px; color: #A8A29E; font-weight: 500; }
        .map-placeholder { background: linear-gradient(135deg, #E7F0FB 0%, #EAE4F7 100%); border-radius: 20px; padding: 40px 24px; text-align: center; border: 1.5px dashed #C7BAF5; margin-top: 8px; }
        .map-icon { font-size: 40px; margin-bottom: 12px; }
        .map-placeholder h3 { font-family: 'Playfair Display', serif; color: #5B21B6; font-size: 1.1rem; margin-bottom: 6px; }
        .map-placeholder p { font-size: 0.88rem; color: #7C3AED; opacity: 0.8; }
        .map-dots { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; max-width: 320px; margin: 20px auto 0; opacity: 0.3; }
        .map-dot { width: 10px; height: 10px; border-radius: 50%; background: #7C3AED; }
        .map-dot.active { background: #FB923C; opacity: 1; transform: scale(1.4); }
        .empty-state { text-align: center; padding: 60px 24px; animation: fadeUp 0.3s ease both; }
        .empty-icon { font-size: 52px; margin-bottom: 16px; }
        .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #292524; margin-bottom: 8px; }
        .empty-state p { color: #78716C; font-size: 0.95rem; max-width: 360px; margin: 0 auto; line-height: 1.6; }
        .warning-bar { background: #FEF3C7; border: 1.5px solid #FCD34D; border-radius: 12px; padding: 14px 20px; color: #92400E; font-size: 0.92rem; margin-bottom: 24px; font-weight: 500; animation: fadeUp 0.3s ease both; }
        @media (max-width: 600px) { .search-bar { flex-direction: column; } select, .search-btn { width: 100%; } .grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div className="logo-badge"><span>🌍 TravelBuddy Search</span></div>
          <h1>Find your <em>community</em><br />wherever you travel.</h1>
          <p className="subtitle">Discover culturally relevant businesses — barbers, grocers, churches, mosques, salons and more — in cities around the world.</p>
          <div className="search-bar">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder='Try "Black barber", "Halal grocery", "Pentecostal church"…' value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="search-btn" onClick={handleSearch}>Search →</button>
          </div>
          <div className="hints">
            {["Black barber Lisbon", "African grocery Berlin", "Hijabi-friendly salon Florence", "Pentecostal church Tokyo"].map((hint) => (
              <span key={hint} className="hint-pill" onClick={() => { setQuery(hint); setSubmitted(true); }}>{hint}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="main">
        {showWarning && <div className="warning-bar">⚠️ Please enter a search term to find businesses.</div>}

        {submitted && query.trim() && results.length > 0 && (
          <p className="results-header"><span>{results.length}</span> result{results.length !== 1 ? "s" : ""} for "{query}"</p>
        )}

        {showNoResults && (
          <div className="empty-state">
            <div className="empty-icon">🗺️</div>
            <h3>No businesses found</h3>
            <p>We couldn't find a match for "<strong>{query}</strong>"{city !== "All Cities" ? ` in ${city}` : ""}. Try a different keyword or broaden your city filter.</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid">
            {results.map((b) => (
              <div className="card" key={b.id}>
                <div className="card-top">
                  <div><div className="card-city">📍 {b.city}</div></div>
                  <div className="card-icon">{CATEGORY_ICONS[b.category] || "🏪"}</div>
                </div>
                <div className="card-name">{b.name}</div>
                <div className="card-desc">{b.description}</div>
                <div className="tags">
                  {b.identity_tags.map((tag) => {
                    const c = tagColor(tag);
                    return <span key={tag} className="tag" style={{ background: c.bg, color: c.text }}>{tag}</span>;
                  })}
                </div>
                <div className="card-footer">
                  <span className="card-category">{b.category}</span>
                  <StarRating rating={b.rating} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="map-placeholder">
          <div className="map-icon">🗺️</div>
          <h3>Map view coming soon</h3>
          <p>Businesses will be pinned on an interactive map so you can explore by neighbourhood.</p>
          <div className="map-dots">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={`map-dot ${[2, 7, 13].includes(i) ? "active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
