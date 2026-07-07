import {Router} from "express"
import {Home, signUp, login, getAllUsers, getSingleUser, deleteAcct } from "../controllers/userControllers.js"
import { checkToken } from "../middleWare/authMiddleWare.js"
const router = Router()

router.get("/",Home)
router.post("/Sign-up", signUp)
router.post("/login", login)
router.get("/All-users", checkToken, getAllUsers)
router.get("/user", checkToken, getSingleUser)
router.delete("/Account-delete",checkToken, deleteAcct)

export default router