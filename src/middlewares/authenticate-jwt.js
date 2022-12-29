import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) 
    return res.sendStatus(401);

  const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
  (req).token = decoded;

   next();
};