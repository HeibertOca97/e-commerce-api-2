const login = (req, res) => {
  res.send('Login');
}

const register = (req, res) => {
  res.send('Register');
}

const getAll = (req, res) => {
  res.send('user test1');
}

const addUser = (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json(data);
}

module.exports = {
  getAll,
  addUser
};
