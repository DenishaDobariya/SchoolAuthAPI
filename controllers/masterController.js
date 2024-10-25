const User = require('../models/User');

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'master' && req.user._id.toString() !== id) {
      return res.status(403).json({ msg: 'Access denied: Only master or the user can access this data' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving user data' });
  }
};
