import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CoinsList from './pages/CoinsList';
import CoinDetails from './pages/CoinDetails';

export default function App() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <Link to="/" style={styles.brand}>
          <h1 style={{ margin: 0 }}>Cyberscope</h1>
        </Link>
      </header>

      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<CoinsList />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer style={styles.footer}>
        <small>Cyberscope — Coin list powered by CoinGecko</small>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Page not found</h2>
      <p><Link to="/">Go back to coins list</Link></p>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid #eee',
    background: '#fafafa'
  },
  brand: { textDecoration: 'none', color: 'inherit' },
  navLink: { marginLeft: 12, textDecoration: 'none', color: '#333' },
  main: {
    flex: 1,
    padding: 20,
    maxWidth: 1100,
    margin: '0 auto',
    width: '100%',
  },
  footer: {
    padding: 12,
    borderTop: '1px solid #eee',
    textAlign: 'center'
  }
};
