const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', adminController.getMenu);

router.get('/addmenu',isAuth,adminController.getAddMenu); //checked

// /admin/products => GET
router.get('/menus', isAuth, adminController.getMenus); //partial

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
); //checked

router.get('/editmenu/:menuId', isAuth, adminController.getEditMenu);

router.post(
  '/editmenu',
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
