const Department = require("../models/department");


exports.department_list = function (req, res) {
  // const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
  // let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;


  // if (limit > 50) limit = 50;
  // const cursor = Department.find(filter).sort({
  //   createdAt: -1
  // }).skip(offset).limit(limit);

  // // ensures that the effects of skip() and limit() will be ignored
  // cursor.exec().then(emploees => {
  //   Department.count().then(totalCount => {
  //     res.json({
  //       metadata: {
  //         totalCount
  //       },
  //       records: emploees
  //     });
  //   });
  // }).catch(error => {
  //   console.log(error);
  //   res.status(500).json({
  //     message: `Internal Server Error: ${error}`
  //   });
  // });
  Department.find().then(departments => {
    res.json({
      departments
    });
  }).catch(err => {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  });
}
exports.department_create = function (req, res) {
  const department = req.body;


  const newDepartment = new Department(department);
  newDepartment.save().then(savedDepartment => {
    res.json(savedDepartment);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
}

