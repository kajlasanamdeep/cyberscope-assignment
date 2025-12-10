const cg = require('../services/coingecko');

module.exports.getCoins = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = Math.min(parseInt(req.query.per_page) || 50, 250);
        const coins = await cg.getMarkets({ page, per_page });
        res.json(coins);
    } catch (err) { next(err); }
};

module.exports.getCoinDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await cg.getCoinDetails(id);
    res.json(data);
  } catch (err) { next(err); }
}