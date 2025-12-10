import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchCoinDetails } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Container = styled.div` max-width: 1100px; margin: 0 auto; padding: 16px; `;

const BackBar = styled.div` display:flex; align-items:center; margin-bottom: 8px; `;
const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    color: #0f172a;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.05s ease;
    &:hover { background:#f8fafc; border-color:#d1d5db; }
    &:active { transform: translateY(1px); }
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 18px;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Avatar = styled.img` width: 36px; height: 36px; border-radius: 50%; `;

const Name = styled.h1` margin: 0; font-size: 20px; color: #0f172a; `;
const Symbol = styled.span` margin-left: 8px; color: #64748b; font-weight: 600; text-transform: uppercase; `;
const Subtle = styled.span` font-size: 12px; color: #94a3b8; margin-left: 8px; `;

const PriceRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
`;
const Price = styled.div` font-size: 36px; font-weight: 800; color: #0b1220; letter-spacing: -0.5px; `;
const Change = styled.span`
    font-weight: 700;
    color: ${p => (p.$negative ? '#dc2626' : '#16a34a')};
    background: ${p => (p.$negative ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)')};
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 14px;
`;

const Cards = styled.div` display: grid; grid-template-columns: 1fr; gap: 16px; `;

const Card = styled.section`
    border: 1px solid #e6e8eb;
    border-radius: 12px;
    background: #ffffff;
    padding: 14px 16px;
`;

const CardTitle = styled.h2` margin: 0 0 10px; font-size: 18px; color: #0f172a; `;

const PerfGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 8px;
    @media (max-width: 900px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    @media (max-width: 720px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    @media (max-width: 480px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`;

const PerfCell = styled.div`
    border: 1px solid #eef0f2;
    border-radius: 10px;
    padding: 10px 12px;
    background: #f8fafc;
`;
const PerfLabel = styled.div` font-size: 12px; color: #64748b; margin-bottom: 6px; `;
const PerfValue = styled.div` font-weight: 700; font-size: 14px; color: ${p => (p.$negative ? '#dc2626' : '#16a34a')}; `;

const AboutTitle = styled.h3` margin: 0 0 8px; color: #0f172a; `;
const About = styled.div`
    color: #334155;
    line-height: 1.6;
    font-size: 14px;
`;

const MetaRow = styled.div` margin-top: 10px; color: #334155; `;
const MetaLabel = styled.span` color: #64748b; margin-right: 8px; `;
const MetaValue = styled.span` font-weight: 700; color: #0f172a; `;

function formatCurrency(value) {
    if (value === null || value === undefined) return '--';
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}
function formatPercent(value) {
    if (value === null || value === undefined) return '--';
    const fixed = Number(value).toFixed(1);
    const num = Number(fixed);
    const arrow = num >= 0 ? '▲' : '▼';
    return `${arrow} ${Math.abs(num)}%`;
}

export default function CoinDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState(null);
    useEffect(() => {
        fetchCoinDetails(id).then(setCoin).catch(console.error);
    }, [id]);

    if (!coin) return <Loader message="Loading..." />;
    const m = coin.market_data;
    const change24 = m.price_change_percentage_24h;

    return (
        <Container>
            <BackBar>
                <BackButton onClick={() => navigate(-1)} aria-label="Go back">← Back</BackButton>
            </BackBar>
            <Header>
                <TitleRow>
                    <Avatar src={coin.image} alt={coin.name} />
                    <Name>
                        {coin.name}
                        <Symbol>{id?.toUpperCase?.() || ''} Price</Symbol>
                        <Subtle>#</Subtle>
                    </Name>
                </TitleRow>
                <PriceRow>
                    <Price>{formatCurrency(m.current_price)}</Price>
                    <Change $negative={change24 !== null && change24 < 0}>
                        {formatPercent(change24)} (24h)
                    </Change>
                </PriceRow>
            </Header>

            <Cards>
                <Card aria-label="Performance">
                    <CardTitle>Performance</CardTitle>
                    <PerfGrid>
                        <PerfCell>
                            <PerfLabel>24h</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_24h < 0}>{formatPercent(m.price_change_percentage_24h)}</PerfValue>
                        </PerfCell>
                        <PerfCell>
                            <PerfLabel>7d</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_7d < 0}>{formatPercent(m.price_change_percentage_7d)}</PerfValue>
                        </PerfCell>
                        <PerfCell>
                            <PerfLabel>14d</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_14d < 0}>{formatPercent(m.price_change_percentage_14d)}</PerfValue>
                        </PerfCell>
                        <PerfCell>
                            <PerfLabel>30d</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_30d < 0}>{formatPercent(m.price_change_percentage_30d)}</PerfValue>
                        </PerfCell>
                        <PerfCell>
                            <PerfLabel>60d</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_60d < 0}>{formatPercent(m.price_change_percentage_60d)}</PerfValue>
                        </PerfCell>
                        <PerfCell>
                            <PerfLabel>200d</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_200d < 0}>{formatPercent(m.price_change_percentage_200d)}</PerfValue>
                        </PerfCell>
                        <PerfCell>
                            <PerfLabel>1y</PerfLabel>
                            <PerfValue $negative={m.price_change_percentage_1y < 0}>{formatPercent(m.price_change_percentage_1y)}</PerfValue>
                        </PerfCell>
                    </PerfGrid>

                    <MetaRow>
                        <MetaLabel>24h High & Low:</MetaLabel>
                        <MetaValue>{formatCurrency(m.low_24h)} – {formatCurrency(m.high_24h)}</MetaValue>
                    </MetaRow>
                </Card>

                <Card aria-label="About">
                    <AboutTitle>About {coin.name} ({id?.toUpperCase?.()})</AboutTitle>
                    <About dangerouslySetInnerHTML={{ __html: coin.description }} />
                </Card>
            </Cards>
        </Container>
    );
}
