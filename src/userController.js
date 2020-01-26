import userModel from "./userModel";

// Get list of users
exports.index = function(req, res) {
  userModel.get(function(err, users) {
    if(err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    });
  });
};

// Create a new user
exports.new = function(req, res) {
  let user = new userModel();
  user.name = req.body.name ? req.body.name : user.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.department = req.body.department;

  user.save(function(err){
    if(err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      message: "User created successfully",
      data: user
    });
  });
};

// View user details
exports.view = function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
      if(err) {
        res.json({
          status: "error",
          message: err,
        });
      }
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Update user details
exports.update = function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
      if(err) {
        res.json({
          status: "error",
          message: err,
        });
      }
      user.name = req.body.name ? req.body.name : user.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.department = req.body.department;
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

// Delet user
exports.delete = function (req, res) {
    userModel.remove({ _id: req.params.id }, function (err, user) {
      if(err) {
        res.json({
          status: "error",
          message: err,
        });
      }
      res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};
