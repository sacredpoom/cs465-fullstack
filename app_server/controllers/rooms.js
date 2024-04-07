const roomsEndpoint = 'http://localhost:3000/api/rooms';
const options = {
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    }
}

//var fs = require('fs');
//var room = JSON.parse(fs.readFileSync('./data/room.json', 'utf8'));

/* GET rooms view */
const rooms = async function(req, res, next) {
    await fetch(roomsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('rooms', {title: 'Travlr Getaways', rooms: json, message});
        })
        .catch(err => res.status(500).send(e.message));
};

module.exports = {
    rooms
};