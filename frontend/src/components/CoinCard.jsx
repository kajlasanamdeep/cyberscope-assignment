import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div` padding: 12px; border: 1px solid #eee; border-radius: 8px; margin: 8px 0; display:flex; align-items:center; `;
const Change = styled.span` font-weight: 600; color: ${p => (p.$negative ? '#dc2626' : '#16a34a')}; `;
const Up = styled.span` color:#16a34a; margin-right:4px; `;
const Down = styled.span` color:#dc2626; margin:0 4px 0 12px; `;
const Label = styled.span` font-size: 14px; font-weight: 700; color:#0f172a; margin-right: 6px; `;
const Value = styled.span` font-size: 12px; font-weight: 500; color:#64748b; `;
export default function CoinCard({ coin }) {
    const change = typeof coin.price_change_percentage_24h === 'number' ? coin.price_change_percentage_24h : null;
    return (
        <Card>
            <img src={coin.image} alt={coin.name} style={{ width: 32, height: 32, marginRight: 12, borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
                <Link to={`/coins/${coin.id}`}><strong>{coin.name} ({coin.symbol.toUpperCase()})</strong></Link>
                <div><Label>Price:</Label><Value>${coin.current_price}</Value></div>
                <div><Up>↑</Up><Label>24h high:</Label><Value>${coin.high_24h}</Value><Down>↓</Down><Label>24h low:</Label><Value>${coin.low_24h}</Value></div>
                <div><Label>24h change:</Label><Change $negative={change !== null && change < 0}>{change === null ? '--' : `${change.toFixed(2)}%`}</Change></div>
            </div>
        </Card>
    );
}
