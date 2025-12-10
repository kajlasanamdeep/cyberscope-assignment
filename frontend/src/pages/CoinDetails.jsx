import React, { useEffect, useState } from 'react';
import { fetchCoinDetails } from '../services/api';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function CoinDetails() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    useEffect(() => {
        fetchCoinDetails(id).then(setCoin).catch(console.error);
    }, [id]);

    if (!coin) return <Loader message="Loading..." />;
    const m = coin.market_data;
    return (
        <div>
            <h1>{coin.name}</h1>
            <img src={coin.image} alt={coin.name} />
            <div dangerouslySetInnerHTML={{ __html: coin.description }} />
            <h3>Market Data</h3>
            <div>Current price: ${m.current_price}</div>
            <div>24h high: ${m.high_24h} low: ${m.low_24h}</div>
            <ul>
                <li>24h: {m.price_change_percentage_24h}%</li>
                <li>7d: {m.price_change_percentage_7d}%</li>
                <li>14d: {m.price_change_percentage_14d}%</li>
                <li>30d: {m.price_change_percentage_30d}%</li>
                <li>60d: {m.price_change_percentage_60d}%</li>
                <li>200d: {m.price_change_percentage_200d}%</li>
                <li>1y: {m.price_change_percentage_1y}%</li>
            </ul>
        </div>
    );
}
