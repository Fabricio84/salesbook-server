import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Userstore } from "../store.js"
import { v4 as uuidv4 } from "uuid";
import { UserData } from "../types.js"

const saltRounds = 8;

export class AuthController {
    static async register(req, res) {
        const userData = req.body;

        try {
            // Make sure user data exists
            if (!req.body) {
                throw new Error();
            }

            // Make sure user data contains all required fields
            const { email, password: passwordRaw, role } = UserData.check(userData);
            const password = await bcrypt.hash(passwordRaw, saltRounds);

            // Generate ID and Handle for user
            const userId = uuidv4();

            // Create full user object
            const user = {
                email,
                role,
                password,
                id: userId,
                handle: email
            };

            // Save user object
            await Userstore.set(userId, user);

            return res.status(201).send();
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }

    static async authenticate(req, res) {
        const { email, password } = req.body;

        try {
            const { results } = await Userstore.filter({ handle: email });

            return res.send(results);

            if (!user)
                throw new Error('Email não existe na nossa base de dados!');

            const isMatch = bcrypt.compareSync(password, user?.password);

            if (!isMatch)
                throw new Error('Email ou Senha incorretos!');

            const accessToken = jwt.sign({ email: user.email }, String(process.env.JWT_SECRET));

            res.json({ accessToken });
        } catch (e) {
            console.log(e.message);
            res.sendStatus(404);
        }
    }

    // implementar recuperação de senha por meio de link via emails
    static async changePassword(req, res) {}
}