import jwt from 'jsonwebtoken';

const createAuthToken = (email, userId, res) => {
  const authToken = jwt.sign({ userId, email }, process.env.JWT_KEY, {
    expiresIn: '8h',
  });

  res.cookie('jwt', authToken, {
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};

export default createAuthToken;
