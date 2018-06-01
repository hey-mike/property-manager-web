const Tenant = require('../models/tenant');
const faker = require('faker');

exports.generate_tenants = async function(req, res) {
  var gender = ['Male', 'Female'];
  var tenants = [];
  for (var i = 0; i < 1000; i++) {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var title = faker.name.jobTitle();
    var department = faker.commerce.department();
    var randomGender = gender[Math.floor(Math.random() * 2)];
    var randomEmail = faker.internet.email(); // Rusty@arne.info
    var randomDate = faker.date.recent();

    var tenant = {
      name: {
        firstName,
        lastName
      },
      gender: randomGender,
      email: randomEmail,
      title: title,
      department: department,
      createdAt: randomDate
    };
    tenants.push(tenant);
  }

  try {
    const docs = await Tenant.insertMany(tenants);
    res.json({ docs });
  } catch (err) {
    res.status(500).json({ err });
  }
};
