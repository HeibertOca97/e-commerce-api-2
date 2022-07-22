const jwt = require('jsonwebtoken');

const createAndGetToken = (payload, expire) => {
  const token = jwt.sign(payload, 
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: expire}
  );
  const {iat, exp} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  return {
    value: token,
    //iat: iat * 1000,
    exp: exp * 1000,
  }
}

const createAndGetRefreshToken = (payload, expire) => {
  const refreshToken = jwt.sign(payload, 
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: expire}
  );

  const {iat, exp} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  return {
    value: refreshToken,
    //iat: iat * 1000,
    exp: exp * 1000,
  }
}



module.exports = {
  createAndGetToken,
  createAndGetRefreshToken,
}
