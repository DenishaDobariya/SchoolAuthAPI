const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new User({
      name,
      email,
      password: hashedPassword,  
      role: 'student',
    });

    await student.save();
    res.status(201).json({ msg: 'Student added successfully', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error adding student' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await User.findById(id);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ msg: 'Student not found' });
    }

    if (req.user.role !== 'master' && req.user.role !== 'principal' && req.user.role !== 'teacher' && req.user._id.toString() !== id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving student' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving students' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedStudent = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent || updatedStudent.role !== 'student') {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.status(200).json({ msg: 'Student updated successfully', updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating student' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findById(id);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ msg: 'Student not found' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error deleting student' });
  }
};
