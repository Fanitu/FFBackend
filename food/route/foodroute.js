const express = require('express');
const router = express.Router();
const Roles_list = require('../../roles/Roleslist');
const verifyRoles = require('../../middleware/verifyRoles');
const foodController = require('../controller/foodcontroller');

router.route('/')
.get(verifyRoles(Roles_list.admin,Roles_list.editor),foodController.getAllFoods)
.post(verifyRoles(Roles_list.admin,Roles_list.editor),foodController.createFood)
.patch(verifyRoles(Roles_list.admin,Roles_list.editor),foodController.updateFood)
.delete(verifyRoles(Roles_list.admin),foodController.deleteFood);

router.route('/:id').get(verifyRoles(Roles_list.admin,Roles_list.editor),foodController.getFoodById);

module.exports = router;