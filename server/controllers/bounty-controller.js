const Bounty = require('../models/Bounty');

const getBounties = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } }
        ]
      }
    }
    const bounties = await Bounty.find(query);
    res.status(200).json({ success: true, data: bounties });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed fetching bounties', error: error.message });
  }
};

module.exports = { getBounties };
