const fs = require('fs');
const path = require('path');

const Menu = require('../models/menu');


exports.getMenu = (req, res, next) => {
  Menu.find()
    .then(menus => {
      console.log(menus);
      res.render('shop/menuList', {
        menus: menus,
        pageTitle: 'All Menus',
        path: '/menu'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
