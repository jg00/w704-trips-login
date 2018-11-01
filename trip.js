
class Trip {
    constructor(username, title, imageUrl, departureDate, returnDate) {
        this.id = Date.now();
        this.username = username;
        this.title = title;
        this.imageUrl = imageUrl;
        this.departureDate = departureDate;
        this.returnDate = returnDate;

    }
}

module.exports = Trip;
