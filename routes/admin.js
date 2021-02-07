const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/addMenu', isAuth, adminController.getAddMenu);

// /admin/products => GET
router.get('/products', isAuth, adminController.getMenus);

// /admin/add-product => POST
router.post(
  '/addmenu',
  [
    body('foodName')
      .isString()
      .not().isEmpty(),
    body('price').isFloat()
    ],
  isAuth,
  adminController.postAddMenu
);

router.get('/edit-menu/:menuId', isAuth, adminController.getEditMenu);

router.post(
  '/edit-menu',
  [
    body('foodName')
      .not().isEmpty(),
    body('price').isFloat()
  ],
  isAuth,
  adminController.postEditMenu
);

router.post('/deletemenu', isAuth, adminController.postDeleteMenu);

module.exports = router;
