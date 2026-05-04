import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const saltRounds = 10;

const createNewUser = async (data) => {
  const passwordHash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(saltRounds));
  const user = await User.create({
    email: data.email,
    password: passwordHash,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phoneNumber: data.phoneNumber,
    gender: data.gender,
    image: data.image,
    roleId: data.roleId,
    positionId: data.positionId
  });
  return user;
};

const getAllUser = async () => {
  return await User.findAll({ raw: true });
};

const getUserInfoById = async (userId) => {
  return await User.findByPk(userId, { raw: true });
};

const updateUser = async (data) => {
  const user = await User.findByPk(data.id);
  if (!user) return null;

  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.address = data.address;
  user.phoneNumber = data.phoneNumber;
  user.gender = data.gender;
  user.image = data.image;
  user.roleId = data.roleId;
  user.positionId = data.positionId;

  if (data.password) {
    user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(saltRounds));
  }

  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  return await User.destroy({ where: { id: userId } });
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById
};
