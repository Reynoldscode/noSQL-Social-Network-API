const { User } = require('../models');

const UserController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // Get one user by ID
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
  
  // Create a user
  createUser(req, res) {
    const userData = req.body;

    // Validate incoming data
    if (!userData || typeof userData !== 'object') {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    // Create a new user
    User.create(userData)
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch((err) => {
        // Handle validation errors
        if (err.name === 'ValidationError') {
          const errors = {};
          for (const field in err.errors) {
            errors[field] = err.errors[field].message;
          }
          return res.status(400).json({ message: 'Validation error', errors });
        }
        // Handle other errors
        res.status(500).json({ message: 'Failed to create user', error: err.message });
      });
  },

  // Update user by ID
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // Delete user
  deleteUserById(req, res) {
    User.findOneAndDelete(req.params.id)
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      })
      .catch(err => res.status(500).json(err));
  },

  // Add friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // Remove friend from user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "There is no user with this id!" });
        }
        // check if friend was removed
        const removed = !dbUserData.friends.includes(params.friendId);
        
        if (removed) {
          res.json({ message: "Friend removed", dbUserData });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = UserController;