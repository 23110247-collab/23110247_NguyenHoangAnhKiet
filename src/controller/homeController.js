import CRUDService from '../services/CRUDService.js';

const getHomePage = (req, res) => {
  return res.render('crud');
};

const postCRUD = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  return res.render('crud', { message: 'User created successfully.' });
};

const getCRUD = (req, res) => {
  return res.render('crud');
};

const getAllCRUD = async (req, res) => {
  const users = await CRUDService.getAllUser();
  return res.render('findAllUser', { users });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (!userId) {
    return res.redirect('/crud');
  }

  const user = await CRUDService.getUserInfoById(userId);
  return res.render('updateUser', { user });
};

const putCRUD = async (req, res) => {
  await CRUDService.updateUser(req.body);
  const users = await CRUDService.getAllUser();
  return res.render('findAllUser', { users });
};

const deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await CRUDService.deleteUserById(userId);
  }
  const users = await CRUDService.getAllUser();
  return res.render('findAllUser', { users });
};

export default {
  getHomePage,
  postCRUD,
  getCRUD,
  getAllCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD
};
