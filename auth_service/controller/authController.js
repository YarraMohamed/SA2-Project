const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user');

// Register controller
exports.register = async (req, res) => {
    try {
        const { email, name, phone, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(16).toString("hex");

        user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            tokens: token
        });

        await user.save();

        res.status(200).json({
            name,
            email,
            phone,
            tokens: token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: [{ msg: "Email or password not found" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ errors: [{ msg: "Email or password not found" }] });
        }

        user.status = 'active';
        await user.save();

        user.password = undefined;
        user.status = undefined;

        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Logout controller
// exports.logout = async (req, res) => {
//     try {
//         req.user.status = 'inactive';
//         await req.user.save();

//         res.status(200).json({ msg: "Logged out successfully" });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// };
