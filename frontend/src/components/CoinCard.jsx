import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div` padding: 12px; border: 1px solid #eee; border-radius: 8px; margin: 8px 0; display:flex; align-items:center; `;
export default function CoinCard({ coin }) {
    return (
        <Card>
            <img src={coin.image} alt={coin.name} style={{ width: 32, height: 32, marginRight: 12 }} />
            <div style={{ flex: 1 }}>
                <Link to={`/coins/${coin.id}`}><strong>{coin.name} ({coin.symbol.toUpperCase()})</strong></Link>
                <div>Price: ${coin.current_price}</div>
                <div>24h high: ${coin.high_24h} low: ${coin.low_24h}</div>
                <div>24h change: {coin.price_change_percentage_24h?.toFixed(2)}%</div>
            </div>
        </Card>
    );
}
