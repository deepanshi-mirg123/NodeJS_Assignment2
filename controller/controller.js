const express = require("express");
const Service = require("../service/service");
const db = require("../database.json");
module.exports = {
  // GET API
  get: async (req, res) => {
    try {
      let result = await Service.get(); // calling get function
      res.json({ result });
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
        responseInvalid: 0,
      });
    }
  },
  // GET API By ID
  getid: async (req, res) => {
    try {
      let result = await Service.getid(req.params); // calling get function with parameters (req.params)
      res.json({ result });
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
        responseInvalid: 0,
      });
    }
  },
  // POST API
  post: async (req, res) => {
    try {
      //Validation 
      if (req.body.name == null || req.body.name == undefined) {
        return res.status(400).send({
          status: 0,
          message: "Name is Required",
          data: [],
        });
      }
      //Validation 
      if (req.body.phone == null || req.body.phone == undefined) {
        return res.status(400).send({
          status: 0,
          message: "phone is Required",
          data: [],
        });
      }
      let result = await Service.post(req.body); // calling function with parameter (req.body)
      res.json({ result });
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
        responseInvalid: 0,
      });
    }
  },
  // UPDATE API
  update: async (req, res) => {
    try {
      //Validation 
      if (req.body.phone) {
        let check = db.find((user) => user.phone == req.body.phone);
        if (check) {
          return res.status(400).send({
            status: 0,
            message:
              "Mobile Number Already exist. Try Again with Another Mobile Number",
            data: [],
          });
        }
      }
      let result = await Service.update(req.body, req.params); // calling function with parameter (req.body & req.params)
      res.json({ result });
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
        responseInvalid: 0,
      });
    }
  },
  // DELETE API
  delete: async (req, res) => {
    try {
      let result = await Service.delete(req.params); // calling function with parameter (req.params)
      res.json({ result });
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
        responseInvalid: 0,
      });
    }
  },
};
