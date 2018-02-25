'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js');

const Comment = db.define('comments', {
  comment_text: {
  	type: Sequelize.TEXT,
  	allowNull: false,
  	defaultValue: null
  },
  user_name: {
    type: Sequelize.TEXT,
  	allowNull: false,
    defaultValue: null
  },
  movie_id: {
  	type: Sequelize.STRING,
  	allowNull: false
  }
})

module.exports = Comment;
