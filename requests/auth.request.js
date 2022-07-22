const request = [
  'username',
  'email',
  'password'
];

// LOGIN REQUEST
const loginRequest = (req, res, next) => {
  const {username, password} = req.body;
  let error = '';
  let required = false;

  if(!username || !password){
    error = `${request[0]} and ${request[2]} are required`;
    required = true;
  }

  if(required){
    res.status(400).json({
      success: false,
      error: error
    });
  }else{
    next();
  }
}

// REGISTER REQUEST
const registerRequest = (req, res, next) => {
  const {username, email, password} = req.body;
  const errors = {};
  let required = true;

  if(!username){
    errors[request[0]] = `${request[0]} is required`;
    required = false;
  }

  if(!email){
    errors[request[1]] = `${request[1]} is required`;
    required = false;
  }

  if(!password){
    errors[request[2]] = `${request[2]} is required`;
    required = false;
  }

  if(username && typeof username !== 'string'){
    errors[request[0]] = `${request[0]} has that be type 'string'`;
    required = false;
  }

  if(email && typeof email !== 'string'){
    errors[request[1]] = `${request[1]} has that be type 'string'`;
    required = false;
  }

  if(email && typeof password !== 'string'){
    errors[request[2]] = `${request[2]} has that be type 'string'`;
    required = false;
  }

  if(!required){
    res.status(400).json({
      success: false,
      errors
    });
  }

  next();
}



module.exports = {
  loginRequest,
  registerRequest
}
