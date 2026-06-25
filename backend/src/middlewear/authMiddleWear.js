import jwt from 'jsonwebtoken'

export function authMiddleWear(req, res , next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        return res.status(400).json({message:"Porvide Token"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (error) {
      return res.status(401).json({error:"Invalid Token"})
    }
}