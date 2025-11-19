const express = require('express');
const router = express.Router();
const orderController = require("../controller/orderController");
const Roles_list = require('../../roles/Roleslist');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
.post(orderController.handleNewOrder)
.get(verifyRoles(Roles_list.admin,Roles_list.editor),orderController.getAllOrders);

router.route('/:id').put(verifyRoles(Roles_list.admin,Roles_list.editor),orderController.updateOrder)
.delete(orderController.deleteOrder);


module.exports = router;