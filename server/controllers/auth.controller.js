import User from '../model/user.model.js';
import createAuthToken from '../utils/createAuthToken.js';

export const login = async (req, res) => {
  console.log('login accessed');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email or password missing');
      return res.status(400).send('Email and password required');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log('User Not Found');
      return res.status(404).send('User not found');
    }

    createAuthToken(email, user._id, res);

    return res.status(201).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
      profilePicture: user.profilePicture,
      userName: user.userName,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error');
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password required');
    }

    const userExists = await User.find({ email: email });

    if (userExists) {
      return res.status(400).send('Email already in use');
    }

    const user = await User.create({ email, password });

    createAuthToken(email, user._id, res);

    return response.status(201).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
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
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error');
  }
};

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

export const logout = (req, res) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    })
    .status(200)
    .send('Logout successful');
};
