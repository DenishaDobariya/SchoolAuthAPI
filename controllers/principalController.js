const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addPrincipal = async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ msg: 'Access denied: Only master can add a principal' });
  }

  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const principal = new User({
      name,
      email,
      password: hashedPassword,
      role: 'principal',
    });

    await principal.save();
    res.status(201).json({ msg: 'Principal added successfully', principal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error adding principal' });
  }
};

exports.getPrincipalById = async (req, res) => {
  try {
    const { id } = req.params;
    const principal = await User.findById(id);

    if (!principal || principal.role !== 'principal') {
      return res.status(404).json({ msg: 'Principal not found' });
    }

    if (req.user.role !== 'master' && req.user._id.toString() !== id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.status(200).json({ principal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving principal' });
  }
};

exports.getAllPrincipals = async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ msg: 'Access denied: Only master can view all principals' });
  }

  try {
    const principals = await User.find({ role: 'principal' });
    res.status(200).json({ principals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving principals' });
  }
};

exports.updatePrincipal = async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ msg: 'Access denied: Only master can update a principal' });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedPrincipal = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPrincipal || updatedPrincipal.role !== 'principal') {
      return res.status(404).json({ msg: 'Principal not found' });
    }

    res.status(200).json({ msg: 'Principal updated successfully', updatedPrincipal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating principal' });
  }
};

exports.deletePrincipal = async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ msg: 'Access denied: Only master can delete a principal' });
  }

  try {
    const { id } = req.params;

    const principal = await User.findById(id);

    if (!principal || principal.role !== 'principal') {
      return res.status(404).json({ msg: 'Principal not found' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Principal deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error deleting principal' });
  }
};
