const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new User({
      name,
      email,
      password: hashedPassword, 
      role: 'teacher',
    });

    await teacher.save();
    res.status(201).json({ msg: 'Teacher added successfully', teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error adding teacher' });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await User.findById(id);

    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    if (req.user.role !== 'master' && req.user.role !== 'principal' && req.user._id.toString() !== id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving teacher' });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.status(200).json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving teachers' });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedTeacher = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTeacher || updatedTeacher.role !== 'teacher') {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    res.status(200).json({ msg: 'Teacher updated successfully', updatedTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating teacher' });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await User.findById(id);

    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error deleting teacher' });
  }
};
