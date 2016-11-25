module.exports = function() {
        var faker = require("faker");
        var _ = require("lodash");
        return {
            users: _.times(30, function(n) {

                    var userInfo = faker.helpers.createCard();

                    return {
                        id: n,
                        avatar: faker.internet.avatar(),
                        username: userInfo.username,
                        email: userInfo.email,
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        sex: assignSex(),
                        birth_date: assignBirthdate(),
                        born: {
                            city: userInfo.address.city,
                            state: userInfo.address.state,
                            country: userInfo.address.country
                        },
                        school: faker.company.companyName(),
                        occupation: faker.name.jobType(),
                        about: userInfo.posts[0].paragraph,
                        location: {
                            address: userInfo.address.streetC,
                            position: userInfo.address.geo
                        },
                        interests: assignInterest()
                    }

                    function assignSex() {
                        var prefix = faker.name.prefix();
                        var male = 1;
                        var female = 2;
                        switch (prefix) {
                            case 'Dr.':
                            case 'Mrs.':
                                return male;
                                break;
                            case 'Miss':
                            case 'Ms.':
                                return female;
                                break;
                            default:
                                return male;
                        }
                    }

                    function assignBirthdate() {
                        var start = new Date(1987, 0, 1);
                        var end = new Date(2000, 0, 1);
                        var birth_date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                        return obj = {
                            year: birth_date.getFullYear(),
                            month: birth_date.getMonth(),
                            day: birth_date.getDay()
                        };
                    }

                    function assignInterest() {
                        var interests = ['read', 'sports', 'artist', 'business', 'languages', 'geek', 'video games', 'cook'];
                        var amountOfInterests = Math.floor(Math.random() * interests.length) + 1;
                        var newInterestsList = [];
                        for (var i = 0; i < amountOfInterests; i++) {
                            newInterestsList.push(interests[i]);
                        }

                        return newInterestsList;
                    }

                }),
                teachers: _.times(30, function(n) {

                    var userInfo = faker.helpers.createCard();

                    return {
                        id: n,
                        avatar: faker.internet.avatar(),
                        username: userInfo.username,
                        email: userInfo.email,
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        sex: assignSex(),
                        birth_date: assignBirthdate(),
                        born: {
                            city: userInfo.address.city,
                            state: userInfo.address.state,
                            country: userInfo.address.country
                        },
                        school: faker.company.companyName(),
                        occupation: faker.name.jobType(),
                        about: userInfo.posts[0].paragraph,
                        location: {
                            address: userInfo.address.streetC,
                            position: userInfo.address.geo
                        },
                        interests: assignInterest()
                    }

                    function assignSex() {
                        var prefix = faker.name.prefix();
                        var male = 1;
                        var female = 2;
                        switch (prefix) {
                            case 'Dr.':
                            case 'Mrs.':
                                return male;
                                break;
                            case 'Miss':
                            case 'Ms.':
                                return female;
                                break;
                            default:
                                return male;
                        }
                    }

                    function assignBirthdate() {
                        var start = new Date(1987, 0, 1);
                        var end = new Date(2000, 0, 1);
                        var birth_date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                        return obj = {
                            year: birth_date.getFullYear(),
                            month: birth_date.getMonth(),
                            day: birth_date.getDay()
                        };
                    }

                    function assignInterest() {
                        var interests = ['read', 'sports', 'artist', 'business', 'languages', 'geek', 'video games', 'cook'];
                        var amountOfInterests = Math.floor(Math.random() * interests.length) + 1;
                        var newInterestsList = [];
                        for (var i = 0; i < amountOfInterests; i++) {
                            newInterestsList.push(interests[i]);
                        }

                        return newInterestsList;
                    }

                }),
                schools: _.times(30, function(n) {

                    var userInfo = faker.helpers.createCard();

                    return {
                        id: n,
                        avatar: faker.internet.avatar(),
                        username: userInfo.username,
                        email: userInfo.email,
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        sex: assignSex(),
                        birth_date: assignBirthdate(),
                        born: {
                            city: userInfo.address.city,
                            state: userInfo.address.state,
                            country: userInfo.address.country
                        },
                        school: faker.company.companyName(),
                        occupation: faker.name.jobType(),
                        about: userInfo.posts[0].paragraph,
                        location: {
                            address: userInfo.address.streetC,
                            position: userInfo.address.geo
                        },
                        interests: assignInterest()
                    }

                    function assignSex() {
                        var prefix = faker.name.prefix();
                        var male = 1;
                        var female = 2;
                        switch (prefix) {
                            case 'Dr.':
                            case 'Mrs.':
                                return male;
                                break;
                            case 'Miss':
                            case 'Ms.':
                                return female;
                                break;
                            default:
                                return male;
                        }
                    }

                    function assignBirthdate() {
                        var start = new Date(1987, 0, 1);
                        var end = new Date(2000, 0, 1);
                        var birth_date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                        return obj = {
                            year: birth_date.getFullYear(),
                            month: birth_date.getMonth(),
                            day: birth_date.getDay()
                        };
                    }

                    function assignInterest() {
                        var interests = ['read', 'sports', 'artist', 'business', 'languages', 'geek', 'video games', 'cook'];
                        var amountOfInterests = Math.floor(Math.random() * interests.length) + 1;
                        var newInterestsList = [];
                        for (var i = 0; i < amountOfInterests; i++) {
                            newInterestsList.push(interests[i]);
                        }

                        return newInterestsList;
                    }

                })
            }
        }
