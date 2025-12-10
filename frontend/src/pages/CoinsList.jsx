import React, { useEffect, useState } from 'react';
import { fetchCoins } from '../services/api';
import CoinCard from '../components/CoinCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function CoinsList() {
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 20;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchCoins({ page, per_page: perPage })
            .then(data => { if (mounted) setCoins(data); })
            .catch(console.error)
            .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, [page]);

    return (
        <div>
            <h1>Coins</h1>
            {loading ? <Loader message="Loading coins..." /> : (
                <div>
                    {coins.map(c => <CoinCard key={c.id} coin={c} />)}
                </div>
            )}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
}
