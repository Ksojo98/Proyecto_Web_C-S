const path = require('path');

const mainController = {
    index: (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')),
    contact: (req, res) => res.sendFile(path.join(__dirname, '../views/contact.html')),
    reviews: (req, res) => res.sendFile(path.join(__dirname, '../views/reviews.html')),
    map: (req, res) => res.sendFile(path.join(__dirname, '../views/map.html')),
    luxuryproperties: (req, res) => res.sendFile(path.join(__dirname, '../views/luxuryproperties.html'))
};

module.exports = mainController;
