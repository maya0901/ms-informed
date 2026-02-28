import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FFF8F9;
    --pink-light: #FFD6E0;
    --pink-mid: #FF85A1;
    --pink-deep: #D63F6B;
    --pink-dark: #A52B50;
    --charcoal: #2C2C2C;
    --muted: #9E7E85;
    --card-bg: #FFFFFF;
    --border: #F2C4D0;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--charcoal);
  }

  #root {
    width: 100%;
  }

  .app-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* NAV */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255,248,249,0.92);
    backdrop-filter: blur(12px);
    border-top: 3px solid var(--pink-deep);
    border-bottom: 1px solid var(--border);
    padding: 16px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 0 16px 16px;
    margin: 0 -24px;
    padding-left: 48px;
    padding-right: 48px;
  }

  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--charcoal);
    letter-spacing: -0.5px;
  }

  .nav-logo span { color: var(--pink-deep); }

  .nav-tagline {
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  /* HERO */
  .hero {
    position: relative;
    padding: 80px 48px 60px;
    overflow: hidden;
    text-align: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 500px;
    background: radial-gradient(ellipse at center, #FFD6E0 0%, #FFF0F3 50%, transparent 75%);
    opacity: 0.7;
    pointer-events: none;
    z-index: 0;
  }

  .hero > * { position: relative; z-index: 1; }

  .hero-eyebrow {
    display: inline-block;
    background: var(--pink-light);
    color: var(--pink-deep);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 700;
    line-height: 1.18;
    color: var(--charcoal);
    max-width: 680px;
    margin: 0 auto 16px;
  }

  .hero h1 em {
    font-style: italic;
    color: var(--pink-deep);
  }

  .hero-sub {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 500px;
    margin: 0 auto 40px;
    line-height: 1.65;
    font-weight: 400;
  }

  /* SEARCH */
  .search-wrap {
    display: flex;
    align-items: center;
    max-width: 560px;
    margin: 0 auto;
    background: white;
    border: 2px solid var(--border);
    border-radius: 50px;
    padding: 6px 6px 6px 24px;
    box-shadow: 0 8px 40px rgba(214,63,107,0.12);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-wrap:focus-within {
    border-color: var(--pink-mid);
    box-shadow: 0 8px 40px rgba(214,63,107,0.22);
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    background: transparent;
    color: var(--charcoal);
  }

  .search-input::placeholder { color: #C9A8B2; }

  .search-btn {
    background: var(--pink-deep);
    color: white;
    border: none;
    border-radius: 40px;
    padding: 12px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }

  .search-btn:hover { background: var(--pink-dark); transform: scale(1.03); }
  .search-btn:disabled { background: var(--pink-mid); cursor: not-allowed; transform: none; }

  /* RESULTS AREA */
  .results {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 48px 80px;
  }

  /* LOADING */
  .loading-wrap {
    text-align: center;
    padding: 60px 0;
  }

  .pulse-ring {
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid var(--pink-light);
    border-top-color: var(--pink-deep);
    animation: spin 0.9s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    color: var(--muted);
    font-size: 0.95rem;
    font-style: italic;
  }

  /* ERROR */
  .error-card {
    background: #FFF0F3;
    border: 1px solid #FFC4D0;
    border-radius: 16px;
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 32px;
  }

  .error-icon { font-size: 1.4rem; }
  .error-msg { color: var(--pink-dark); font-size: 0.95rem; font-weight: 500; }

  /* SECTION TITLE */
  .section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 44px;
  }

  .section-label-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--charcoal);
  }

  .section-badge {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--pink-light);
    color: var(--pink-deep);
    padding: 4px 12px;
    border-radius: 20px;
  }

  /* DRUG NAME BANNER */
  .drug-banner {
    background: linear-gradient(135deg, var(--pink-deep) 0%, #E8527A 100%);
    border-radius: 20px;
    padding: 28px 36px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    box-shadow: 0 8px 32px rgba(214,63,107,0.25);
  }

  .drug-banner-name {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-transform: capitalize;
  }

  .drug-banner-sub {
    color: rgba(255,255,255,0.75);
    font-size: 0.9rem;
    margin-top: 4px;
  }

  .drug-banner-icon {
    font-size: 2.8rem;
    opacity: 0.6;
  }

  /* REPORTED GRID */
  .reported-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 14px;
  }

  .reported-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: transform 0.18s, box-shadow 0.18s;
    animation: fadeUp 0.4s ease both;
  }

  .reported-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(214,63,107,0.1);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .reported-card-symptom {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--charcoal);
    text-transform: capitalize;
  }

  .reported-card-count {
    font-size: 0.82rem;
    color: var(--muted);
  }

  .count-bar-wrap {
    height: 5px;
    background: var(--pink-light);
    border-radius: 10px;
    overflow: hidden;
  }

  .count-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--pink-mid), var(--pink-deep));
    border-radius: 10px;
    transition: width 0.8s ease;
  }

  /* UNDER DISCUSSED */
  .underdiscussed-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .underdiscussed-pill {
    background: #FFF0F3;
    border: 1.5px solid var(--border);
    color: var(--pink-deep);
    border-radius: 30px;
    padding: 8px 18px;
    font-size: 0.88rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: capitalize;
    animation: fadeUp 0.4s ease both;
    transition: background 0.2s, border-color 0.2s;
  }

  .underdiscussed-pill:hover {
    background: var(--pink-light);
    border-color: var(--pink-mid);
  }

  /* INSIGHTS */
  .insights-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px 36px;
    box-shadow: 0 4px 24px rgba(214,63,107,0.07);
    animation: fadeUp 0.5s ease both;
  }

  .insights-summary {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--charcoal);
    border-left: 3px solid var(--pink-mid);
    padding-left: 16px;
    margin-bottom: 28px;
    font-style: italic;
  }

  .doctor-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--charcoal);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .doctor-questions {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .doctor-q {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--charcoal);
    display: flex;
    gap: 10px;
    align-items: flex-start;
    animation: fadeUp 0.4s ease both;
  }

  .doctor-q-num {
    background: var(--pink-deep);
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    min-width: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 700;
    margin-top: 1px;
  }

  /* OFFICIAL DETAILS */
  .official-details {
    margin-top: 44px;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .official-summary {
    background: white;
    padding: 18px 24px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    transition: background 0.15s;
  }

  .official-summary:hover { background: #FFF5F7; }

  .official-inner {
    padding: 20px 24px;
    background: white;
    border-top: 1px solid var(--border);
  }

  .official-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .official-tag {
    background: #F8F8F8;
    border: 1px solid #EBEBEB;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.82rem;
    color: #666;
    text-transform: capitalize;
  }

  /* DIVIDER */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 12px 0;
  }

  /* EMPTY */
  .empty {
    color: var(--muted);
    font-size: 0.9rem;
    font-style: italic;
    padding: 8px 0;
  }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    padding: 28px 48px;
    text-align: center;
  }

  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--charcoal);
    font-weight: 600;
    margin-bottom: 6px;
  }

  .footer-logo span { color: var(--pink-deep); }

  .footer-disclaimer {
    font-size: 0.78rem;
    color: var(--muted);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .nav { padding: 14px 20px; }
    .hero { padding: 52px 20px 40px; }
    .results { padding: 0 20px 60px; }
    .drug-banner { padding: 20px 22px; }
    .drug-banner-name { font-size: 1.5rem; }
    .insights-card { padding: 22px 20px; }
    .footer { padding: 24px 20px; }
  }
`;

export default function App() {
  const [search, setSearch] = useState("");
  const [drugData, setDrugData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [officialOpen, setOfficialOpen] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError("");
    setDrugData(null);
    setAnalysisData(null);
    setOfficialOpen(false);

    try {
      const drugRes = await fetch(`/api/drug/${search.trim()}`);
      if (!drugRes.ok) throw new Error("Drug not found");
      const drugJson = await drugRes.json();
      setDrugData(drugJson);

      const analysisRes = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          drug: drugJson.drug,
          official: drugJson.official_side_effects,
          women: drugJson.women_reported,
        }),
      });

      const analysisJson = await analysisRes.json();
      setAnalysisData(analysisJson);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Could not fetch medication data. Please check the name and try again.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  const reportedEntries = Object.entries(analysisData?.community?.reported || {});
  const maxCount = reportedEntries.length ? Math.max(...reportedEntries.map(([, c]) => c)) : 1;
  const underDiscussed = analysisData?.community?.under_discussed || [];
  const doctorQuestions = analysisData?.insights?.doctor_questions || [];

  return (
    <>
      <style>{styles}</style>

      <div className="app-container">
        {/* NAV */}
        <nav className="nav">
          <div>
            <div className="nav-logo">Ms<span>-</span>Informed</div>
            <div className="nav-tagline">Women's medication insights, amplified</div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-eyebrow">✦ Side Effects They Don't Tell You About</div>
          <h1>Your symptoms are <em>real.</em><br />Your concerns deserve answers.</h1>
          <p className="hero-sub">
            Combining FDA data with real women's experiences to surface what's often left out of the conversation.
          </p>

          <div className="search-wrap">
            <input
              className="search-input"
              placeholder="Search a medication (e.g. sertraline, ibuprofen...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={handleSearch} disabled={loading}>
              {loading ? "Analyzing..." : "Search →"}
            </button>
          </div>
        </section>

        {/* RESULTS */}
        <div className="results">

          {/* LOADING */}
          {loading && (
            <div className="loading-wrap">
              <div className="pulse-ring" />
              <p className="loading-text">Gathering insights for women's experiences…</p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <span className="error-msg">{error}</span>
            </div>
          )}

          {/* DRUG BANNER */}
          {drugData && (
            <div className="drug-banner">
              <div>
                <div className="drug-banner-name">{drugData.drug}</div>
                <div className="drug-banner-sub">Medication Analysis · Ms-Informed</div>
              </div>
              <div className="drug-banner-icon">💊</div>
            </div>
          )}

          {analysisData && (
            <>
              {/* WOMEN REPORTED */}
              <div className="section-label">
                <span className="section-label-text">Women-Reported Patterns</span>
                <span className="section-badge">Community Data</span>
              </div>

              {reportedEntries.length > 0 ? (
                <div className="reported-grid">
                  {reportedEntries.map(([symptom, count], i) => (
                    <div
                      className="reported-card"
                      key={i}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <div className="reported-card-symptom">
                        {symptom.replace(/_/g, " ")}
                      </div>
                      <div className="count-bar-wrap">
                        <div
                          className="count-bar"
                          style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
                        />
                      </div>
                      <div className="reported-card-count">{count} report{count !== 1 ? "s" : ""}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty">No community data available for this medication.</p>
              )}

              {/* UNDER-DISCUSSED */}
              <div className="section-label" style={{ marginTop: "44px" }}>
                <span className="section-label-text">Under-Discussed Symptoms</span>
                <span className="section-badge">⚑ Often Missed</span>
              </div>

              {underDiscussed.length > 0 ? (
                <div className="underdiscussed-list">
                  {underDiscussed.map((s, i) => (
                    <div className="underdiscussed-pill" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                      <span>◆</span> {s.replace(/_/g, " ")}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty">No major under-discussed symptoms detected.</p>
              )}

              {/* INSIGHTS */}
              {analysisData.insights?.summary && (
                <>
                  <div className="section-label">
                    <span className="section-label-text">Insights</span>
                  </div>
                  <div className="insights-card">
                    <p className="insights-summary">{analysisData.insights.summary}</p>

                    {doctorQuestions.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="doctor-title">
                          🩺 Questions You Can Ask Your Doctor
                        </div>
                        <ul className="doctor-questions">
                          {doctorQuestions.map((q, i) => (
                            <li
                              className="doctor-q"
                              key={i}
                              style={{ animationDelay: `${i * 0.07}s` }}
                            >
                              <span className="doctor-q-num">{i + 1}</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* OFFICIAL FDA */}
          {drugData && (
            <div className="official-details" style={{ marginTop: "44px" }}>
              <div
                className="official-summary"
                onClick={() => setOfficialOpen((o) => !o)}
              >
                <span>📋 View Official FDA Side Effects</span>
                <span>{officialOpen ? "▲" : "▼"}</span>
              </div>
              {officialOpen && (
                <div className="official-inner">
                  <div className="official-tags">
                    {drugData.official_side_effects?.slice(0, 10).map((effect, i) => (
                      <span className="official-tag" key={i}>{effect}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">Ms<span>-</span>Informed</div>
          <p className="footer-disclaimer">
            For informational purposes only. Ms-Informed does not replace professional medical advice, diagnosis, or treatment. Always consult your healthcare provider.
          </p>
        </footer>
      </div>
    </>
  );
}