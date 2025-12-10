import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import CoinsList from './pages/CoinsList';
import CoinDetails from './pages/CoinDetails';

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
`;

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const BrandLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: -0.4px;
  color: #0b1220;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
  width: 80%;
`;

const FooterBar = styled.footer`
  padding: 12px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #a0a0a0;
`;

export default function App() {
  return (
    <AppShell>
      <HeaderBar>
        <BrandLink to="/">
          <Title>Coin list by CoinGecko</Title>
        </BrandLink>
      </HeaderBar>

      <MainContent>
        <Routes>
          <Route path="/" element={<CoinsList />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>

      <FooterBar>
        <small>Cyberscope — Coin list powered by CoinGecko</small>
      </FooterBar>
    </AppShell>
  );
}

function NotFound() {
  return (
    <NotFoundWrap>
      <h2>Page not found</h2>
      <p><Link to="/">Go back to coins list</Link></p>
    </NotFoundWrap>
  );
}

const NotFoundWrap = styled.div` padding: 20px; `;
