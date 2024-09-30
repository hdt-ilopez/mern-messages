import User from '../model/user.model.js';
import Contacts from '../model/contacts.model.js';

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const { userName, firstName, lastName, profilePicture } = req.body;

    if (!userName || !firstName || !lastName || !profilePicture) {
      res
        .status(404)
        .send('Username, First Name, Last Name, and Profile Picture Required');
    }

    const userNameExists = await User.findOne({ userName: userName });

    if (userNameExists && userNameExists._id.toString() !== userId) {
      return res.status(400).send('Username in use');
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        userName,
        profilePicture,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      userName: userData.username,
      profilePicture: userData.profilePicture,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error');
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('User Not Found');
      return res.status(404).send('User not found');
    }

    return res.status(201).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
      profilePicture: user.profilePicture,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error');
  }
};

export const getUserContacts = async (req, res) => {
  try {
    const userId = req.userId;

    const contacts = await Contacts.find({ userId: userId }).populate(
      'contactId'
    );

    if (!contacts.length === 0) {
      return res.status(201).send('No contacts found for user');
    } else {
      return res.status(200).json(contacts);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};
