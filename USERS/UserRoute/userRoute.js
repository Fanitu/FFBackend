const express = require('express');
const router = express.Router();
const userControl = require("../UserController/userController");
const Roles_list = require('../../roles/Roleslist');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
.put(userControl.updateUser)
.get(verifyRoles(Roles_list.admin,Roles_list.editor),userControl.getUsers)
.delete(userControl.deleteUser)
;

/*,userControl.getUsers);

router.route('/:id').get(userControl.getUser); */
   
module.exports = router;