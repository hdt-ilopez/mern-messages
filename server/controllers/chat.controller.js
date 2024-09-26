import User from '../model/user.model.js';

export const userSuggestions = async (req, res) => {
  const { searchQuery } = req.body;
  const userId = req.userId;

  if (!searchQuery || searchQuery.trim() === '') {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const users = await User.find(
      {
        userName: { $regex: searchQuery, $options: 'i' },
        _id: { $ne: userId },
      },
      { profilePicture: 1, _id: 1, firstName: 1, lastName: 1, userName: 1 }
    ).limit(5);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
