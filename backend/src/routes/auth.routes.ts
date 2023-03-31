import { Router } from 'express'
import { loginCtrl, registerCtrl } from '../controllers/auth.controller'
// import { validatorLogin, validatorRegister, validatorRegisterDoctor } from '../middlewares/validators/auth.valid'

const router = Router()

router.post('/login', loginCtrl)
router.post('/register', registerCtrl)

router.post('/login-doctor', loginCtrl)
router.post('/register-doctor', registerCtrl)

export { router }
