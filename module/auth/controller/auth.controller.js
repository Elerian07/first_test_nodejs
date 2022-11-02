import userModel from "../../../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  let { userName, email, password, cPassword, age, phone } = req.body;
  if (password == cPassword) {
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ message: "Already register" });
    } else {
      const hash = await bcrypt.hashSync(password, 4);

      const signUp = await userModel({
        userName,
        email,
        password: hash,
        age,
        phone,
      });
      const signedUp = await signUp.save();
      res.json({ message: "signedUp", signUp });
    }
  } else {
    res.json({ message: "password dose not match cPassword" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const matched = await bcrypt.compareSync(password, user.password);
    if (matched) {
      const token = jwt.sign({ id: user._id }, "nor", { expiresIn: 60*60 });

      res.json({ message: "welcome, you are signed in", token });
    } else {
      res.json({ message: "incorrect password" });
    }
  } else {
    res.json({ message: "you have to register first" });
  }
};

export { signUp, signIn };
