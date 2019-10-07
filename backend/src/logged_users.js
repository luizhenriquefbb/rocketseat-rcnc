
/**
 * Bad use: this way, the info of connected users will be lost when the server restarts.
 * To make it right, we must use radiosDB for instance. (TODO)
 */
class LoggedUsers {
    constructor() {
        // user_id : socket_id
        this.loggedUsersMap = {}
    }

    newUser(user_id, socket_id) {
        this.loggedUsersMap[user_id] = socket_id

    }

    findByUser_id(user_id) {
        return this.loggedUsersMap[user_id];
    }

    findBySocket_id(socket_id) {
        return Object.values(this.loggedUsersMap).find(el => el == socket_id);
    }

}


module.exports = LoggedUsers