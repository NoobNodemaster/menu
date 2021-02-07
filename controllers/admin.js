const mongoose = require('mongoose');
const fileHelper=require('../util/file');

const { validationResult } = require('express-validator/check');

const Menu = require('../models/menu');

exports.getAddMenu = (req, res, next) => {
  res.render('admin/edit-menu', {
    pageTitle: 'Add Menu',
    path: '/admin/add-menu',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddMenu = (req, res, next) => {
  const foodName = req.body.foodName;
  const price = req.body.price; 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-menu', {
      pageTitle: 'Add Menu',
      path: '/admin/add-menu',
      editing: false,
      hasError: true,
      menu: {
        foodName: foodName,
        price: price
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const menu = new Menu({
    foodName: foodName,
    price: price
    });
  menu
    .save()
    .then(result => {
      console.log('Menu added');
      res.redirect('/admin/menu');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditMenu = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const menuId = req.params.menuId;
  Menu.findById(menuId)
    .then(menu => {
      if (!menu) {
        return res.redirect('/');
      }
      res.render('admin/edit-menu', {
        pageTitle: 'Edit Menu',
        path: '/admin/edit-menu',
        editing: editMode,
        menu: menu,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditMenu = (req, res, next) => {
  const menuId = req.body.menuId;
  const updatedFoodName = req.body.foodName;
  const updatedPrice = req.body.price;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-menu', {
      pageTitle: 'Edit Menu',
      path: '/admin/edit-menu',
      editing: true,
      hasError: true,
      menu: {
        foodName: updatedFoodName,
        price: updatedPrice,
        _id: menuId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Menu.findById(menuId)
    .then(menu => {
      if (menu.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      menu.foodName = updatedFoodName;
      menu.price = updatedPrice;
      return menu.save().then(result => {
        console.log('UPDATED Menu');
        res.redirect('/admin/menu');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getMenus = (req, res, next) => {
  Menu.find({ userId: req.user._id })
    .then(menu => {
      console.log(menu);
      res.render('admin/menu', {
        menus: menu,
        pageTitle: 'Admin Menu',
        path: '/admin/menu'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteMenu = (req, res, next) => {
  const menuId = req.body.menuId;
Menu.findById(menuId)
.then(menu=>{
  if(!menu){
    return next(new Error('menu not found'));
  }
return Menu.deleteOne({ _id: prodId, userId: req.user._id })
})  
.then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
