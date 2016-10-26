module.exports = function(){
    var faker =  require("faker");
    var _ = require("lodash");
    return {
        people: _.times(30, function(n) {

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
                born: { city: userInfo.address.city, state: userInfo.address.state, country: userInfo.address.country },
                school: faker.company.companyName(),
                occupation: faker.name.jobType(),
                about: userInfo.posts[0].paragraph,
                location: { address: userInfo.address.streetC, position: userInfo.address.geo }
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

        })
    }
}
