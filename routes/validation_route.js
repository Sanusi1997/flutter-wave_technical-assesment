const express = require('express')
const { base } =           require('../models/rule')
const router = express.Router()
const Rule = require('../models/rule')
const Data = require('../models/data')
const Validation = require('../models/validation')
const jsend = require("jsend")
const { json } = require('express')

// Get my profile
router.get('/', (req, res) => {

  const profile = {
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
      "name": "Hameed Sanusi",
      "github": "@Sanusi1997",
      "email": "sanusihameedolayiwola@gmail.com",
      "mobile": "08104576319",
      "twitter": "@sanusi_hameed"
    }
  }
  res.json(profile)
})


// Create for validation
router.post('/validate-rule', async (req, res) => {

  const rule = new Rule
    ({
      rule: {
        field: req.body.rule.field,
        condition: req.body.rule.condition,
        condition_value: req.body.rule.condition_value

      }
    });

  const data = new Data
    ({
      data: {
        name: req.body.data.name,
        crew: req.body.data.crew,
        age: req.body.data.age,
        position: req.body.data.position,
        missions: req.body.data.missions
      }
    });

  try {
    const ruleInstance = await rule.save()
    const dataInstance = await data.save()
    const validation = new Validation
      ({
        validation: {
          error: false,
          field: req.body.rule.field,
          field_value: req.body.data.missions,
          condition_value: req.body.rule.condition_value,
          position: req.body.data.position
        }
      });

    if (rule["rule"]["condition"] === "eq" && Number(data["data"]["missions"]) ===
      Number(validation["validation"]["condition_value"])) {
      const validationInstance = await validation.save()
      res.status(201).send(jsend.success(validationInstance))
    } else if (rule["rule"]["condition"] === "neq" && Number(data["data"]["missions"]) !==
      Number(rule["rule"]["condition_value"])) {
      const validationInstance = await validation.save()
      res.status(201).send(jsend.success(validationInstance))
    } else if (rule["rule"]["condition"] === "gt" && Number(data["data"]["missions"]) >
      Number(rule["rule"]["condition_value"])) {
      const validationInstance = await validation.save()
      res.status(201).send(jsend.success(validationInstance))
    } else if (rule["rule"]["condition"] == "gte" && Number(data["data"]["missions"]) >=
      Number(rule["rule"]["condition_value"])) {
      const validationInstance = await validation.save()
      res.status(201).send(jsend.success(validationInstance))
    } else {
      validation["validation"]["error"] = true
      const validationInstance = await validation.save()
      res.status(400).send(jsend.error({
        message: `field ${rule["rule"]["field"]} failed validation`,
        data: validationInstance,
      }))
    }
  } catch (err) {
    console.log(data.data)

    if (data["data"]["crew"] === undefined  && data["data"]["name"] === undefined 
          && data["data"]["age"] === undefined  &&  data["data"]["position"] === undefined
          && data["data"]["missions"] === undefined   ) {
      const failedValue = null
      res.status(400).send(jsend.error({
        data: failedValue,
        message: "data field is required"

      }))
    } else if (rule["rule"]["field"] === undefined  &&  rule["rule"]["conditon"] === undefined 
    && rule["rule"]["condition"]) {
      const failedValue = null
      res.status(400).send(jsend.error({
        data: failedValue,
        message: "rule field is required"
      }))
    }else{
      const failedValue = null
      res.status(400).send(jsend.error({
        data: failedValue,
        message: "Invalid JSON payload passed"
      }))

    } 

  }


})
module.exports = router