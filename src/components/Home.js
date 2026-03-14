function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(/la_liga_trophy_a.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '2rem 0'
    }}>
      <div className="container">
        <h1 className="fw-bold text-center mb-5">Statistics from the 2024-25 La Liga season</h1>
        <div className="row g-4">
          {[
            { label: 'Teams', icon: 'icon_teams.png', href: '/teams' },
            { label: 'Players', icon: 'icon_players.png', href: '/players' },
            { label: 'Referees', icon: 'icon_referees.png', href: '/referees' },
            { label: 'Matches', icon: 'icon_matches.png', href: '/matches' },
          ].map(({ label, icon, href }) => (
            <div className="col-md-6 col-lg-3" key={label}>
              <a href={href} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm text-center p-3">
                  <img src={`/${icon}`} alt={label} style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto' }} />
                  <div className="card-body">
                    <h3 className="card-title">{label}</h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
