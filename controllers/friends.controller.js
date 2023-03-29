const model = require('../models/friends.model');

function getFriends(req, res) {
    res.json(model);
}

function getFriendById(req, res) {
    const friendId = +req.params.friendId;
    const friend = model[friendId];
    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(400).json({
            error: "Friend does not exist",
        })
    }
}


function addFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Missing friend name",
        });
    }

    const newFriend = {
        id: model.length,
        name: req.body.name,
    };

    model.push(newFriend);
    res.status(200).json(newFriend);
    
}

module.exports = {
    getFriendById,
    getFriends,
    addFriend
}