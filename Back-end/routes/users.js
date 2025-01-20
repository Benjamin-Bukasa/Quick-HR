const express = require("express")
const router = express.Router()
const {getUser,getUsers,createUser,putUser,patchUser,deleteUser}= require("../controllers/users")

router.route("/").get(getUsers).post(createUser)
router.route("/:id").get(getUser).put(putUser).patch(patchUser).delete(deleteUser)


module.exports = router