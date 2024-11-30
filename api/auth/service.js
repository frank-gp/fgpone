const AuthModel = require("./helpers/db.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package

class Service {
  async create(reqBody) {
    const _id =
      reqBody._id ||
      new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(2, 14);

    const { username, password, email } = reqBody;
    console.log("reqBody", reqBody);

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existing = await AuthModel.findOne({ email });
    if (existing && existing.username === username) throw new Error("The username already exists");
    if (existing && existing.email === email) throw new Error("The email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const url = new AuthModel({ ...reqBody, _id, password: hashedPassword });
    const user = await url.save();
    // Ensure we're working with a plain object before deleting the password
    const plainUser = user.toObject();
    delete plainUser.password;

    return plainUser;
  }

  async login(reqBody) {
    // Find the user and include password, email, username, and role
    const user = await AuthModel.findOne({ username: reqBody.username }).select("password name email username role createdAt");
    if (!user) throw new Error("Username not found");

    // Compare the plain password with the hashed password
    const isPasswordValid = await bcrypt.compare(reqBody.password, user.password);
    if (!isPasswordValid) throw new Error("Password is incorrect");

    // Remove the password from the returned user object
    user.password = undefined; // this removes the password field from the returned user object

    const { _id, username, role, email } = user;
    // Generate JWT token
    const payload = { _id, username, role, email };
    const secretKey = "your_secret_key"; // It's recommended to store this key in environment variables
    const token = jwt.sign(payload, secretKey, { expiresIn: "10d" }); // Token expires in 1 hour

    return { user, token }; // Return the user data and the token
  }

  async findAll() {
    return await AuthModel.find().sort({ _id: -1 });
  }

  async findOne(id) {
    return await AuthModel.findById(id);
  }

  async findOneEmail(email) {
    const find = await AuthModel.findOne({ email });
    if (!find) {
      throw new Error("Email not found");
    }
    return find;
  }
}

module.exports = new Service();
