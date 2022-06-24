const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authToken = req.headers.token;
  if(authToken){
    const token = authToken.split(" ")[1];

    jwt.verify(token, process.env.JWT_PASSWORD_SECRET, (error, data) => {
      if(error){
        res.status(403).json({
          success: false, 
          error: "Token is not valid!"
        });
      } 
      req.user = data;
      next();
    });  
  }else{
    res.status(401).json({
      success: false,
      error: "You are not Authenticated!"
    })
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      res.status(403).json({
        success: false,
        error: "You are not allowed to be that!"
      });
    }
  });
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.isAdmin){
      next();
    }else{
      res.status(403).json({
        success: false,
        error: "You are not allowed to be that!"
      });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
}
