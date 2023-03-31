import bcrypt from 'bcrypt'

const SALT_NUM = 8

const encrypt = async (password: string): Promise<string> => {
  await bcrypt.genSalt(SALT_NUM)
  const hash = await bcrypt.hash(password, SALT_NUM)
  return hash
}

const verifyHash = async (plainPass: string, hashPass: string): Promise<boolean> => {
  const isCorrect = await bcrypt.compare(plainPass, hashPass)
  return isCorrect
}

export {
  encrypt,
  verifyHash
}
