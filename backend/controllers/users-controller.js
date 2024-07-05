let express = require("express");
let router = express.Router();

let usersService = require("../services/users-service");

router.get("/getUsers/:page", async (request, response, next) => {
  try {
    let page = request.params.page;
    let res = await usersService.getUsers(page);
    response.status(200).json(res);
  } catch (error) {
    return next(error);
  }
});

router.get("/getUser/:id", async (request, response, next) => {
  try {
    let id = request.params.id;
    let userInfo = await usersService.getUser(id);
    response.status(200).json(userInfo);
  } catch (error) {
    return next(error);
  }
});
router.put("/updateUser/:id", async (request, response, next) => {
  try {
    let id = request.params.id;
    let userInfo = request.body;
    let res = await usersService.updateUser(userInfo, id);
    response.status(200).json(res);
  } catch (error) {
    return next(error);
  }
});
router.delete("/deleteUser/:id", async (request, response, next) => {
  try {
    let id = request.params.id;
    let res = await usersService.deleteUser(id);
    response.status(200).json(res);
  } catch (error) {
    console.log("delete error",error);
    return next(error);
  }
});
router.post("/createUser", async (request, response, next) => {
  try {
    let userInfo = request.body;
    let res = await usersService.createUser(userInfo);
    response.status(200).json(res);
  } catch (error) {

    return next(error);
  }
});

module.exports = router;
