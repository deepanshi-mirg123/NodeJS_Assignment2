const db = require("../database.json");
const fs = require("fs");

module.exports = {
  // Get API
  get: async () => {
    try {
      //Return the Available Data
      if (db) {
        let obj = {
          status: 1,
          data: db,
          message: "Success",
        };
        return obj;
      } else {
        let obj = {
          status: 0,
          data: [],
          message: "Data Not Found",
        };
        return obj;
      }
    } catch (error) {
      let obj = { status: 0, data: "null", message: "Error" };
      return obj;
    }
  },
  // Get api  by id 
  getid: async (item) => {
    try {
      //checking the ID in the json file , if exist then returning the data
      let result = db.find((user) => user.id == item.id);
      if (result) {
        let obj = {
          status: 1,
          data: result,
          message: "Data",
        };
        return obj;
      } else {
        let obj = {
          status: 0,
          data: [],
          message: ` No Data Found for Id ${item.id}`,
        };
        return obj;
      }
    } catch (error) {
      let obj = { status: 0, data: "null", message: "Error" };
      return obj;
    }
  },
  // post Api 
  post: async (data) => {
    try {
      //checking phone number is not already exist in the json file
      let result = db.find((user) => user.phone == data.phone);
      if (result) {
        let obj = {
          status: 0,
          data: [],
          message:
            "Mobile Number Already exist. Try Again with Different Mobile Number",
        };
        return obj;
      } else {
        //automatically Genrating a new Id as Default
        let newId;
        if (db.length == 0) {
          newId = 1;
        } else {
          newId = db[db.length - 1].id + 1;
        }
        const newdata = await Object.assign({ id: newId }, data);
        db.push(newdata);
        try {
          await fs.promises.writeFile("database.json", JSON.stringify(db));
          let obj = {
            status: 1,
            data: newdata,
            message: "Success",
          };
          return obj;
        } catch (error) {
          let obj = { status: 0, data: "null", message: "Error" };
          return obj;
        }
      }
    } catch (error) {
      let obj = { status: 0, data: "null", message: "Error" };
      return obj;
    }
  },
  // PATCH Api
  update: async (data, id) => {
    try {
      let result = db.findIndex((user) => user.id == id.id);
      if (result !== -1) {
        const newdata = { ...db[result], ...data };
        db[result] = newdata;
        await fs.promises.writeFile("database.json", JSON.stringify(db));
        let obj = {
          status: 1,
          data: newdata,
          message: "Success",
        };
        return obj;
      } else {
        let obj = {
          status: 0,
          data: [],
          message: "Data Not Updated",
        };
        return obj;
      }
    } catch (error) {
      let obj = { status: 0, data: "null", message: "Error" };
      return obj;
    }
  },
  // DELETE Api 
  delete: async (id) => {
    try {
      let result = db.findIndex((user) => user.id == id.id);
      if (result !== -1) {
        db.splice(result, 1);
        await fs.promises.writeFile("database.json", JSON.stringify(db));
        let obj = {
          status: 1,
          data: null,
          message: `Data with ID ${id.id} has been deleted.`,
        };
        return obj;
      } else {
        let obj = {
          status: 0,
          data: [],
          message: `No data found with ID ${id.id}. Deletion failed.`,
        };
        return obj;
      }
    } catch (error) {
      let obj = { status: 0, data: "null", message: "Error" };
      return obj;
    }
  },
};
