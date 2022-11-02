import jwt from "jsonwebtoken";

import userModel from "../model/user.model.js";


const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      const token = authorization.split(" ")[1];

      if (authorization.startsWith("Bearer")) {
        const decode = jwt.verify(token, "nor");

        if (decode) {
          const user = await userModel.findById(decode.id);
          if (user) {
            req.userId = user._id;
            next();
          } else {
            res.json({ message: "id not found" });
          }
        } else {
          res.json({ message: "expired token" });
        }
      }
    } catch (error) {
      res.json({ message: " error", error });
    }
  };
};

export default auth;
