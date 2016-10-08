const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const filename = path.join(__dirname, '../data/cards.json');

exports.getAll = function(cb) {
  fs.readFile(filename, (err, buffer) => {
    if(err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
    }
    cb(null, data);
  })
}

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData);
  fs.wrtieFile(filename, json, cb);
}

exports.create = function(newItem, cb) {
  exports.getAll((err, items) => {
    if(err) return cb(err);
    newItem.id = uuid();
    items.push(newItem);

    exports.write(items, cb);
  })
} 

exports.update = function(cardId, updateCard, cb) {
  exports.getAll((err, cards) => {
    let updatedCards = cards.map(card => {
      if(card.id === cardId) {
        card = updateCard;
        card.id = cardId;
      }
      return card;
    })
    exports.write(updateCards, cb);
  })
}

exports.filterCategory = function(req, cb) {
  exports.getAll((err, cards) => {
    if (err) return cb(err);
    let categories = req.params.category.split('&');
    let answer = req.query;
    let filteredCategories = [];
      cards.forEach(category => {
        if(card.category === category) {
          filteredCategories.push(card);
        }
      })
  })
}
















