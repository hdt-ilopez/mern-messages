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
      firstName: user.firstName,
      lastName: user.lastName,
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

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).send('Email already in use');
    }

    const user = await User.create({ email, password });

    createAuthToken(email, user._id, res);

    return res.status(201).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
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
