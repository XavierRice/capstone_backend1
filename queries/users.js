const db = require('../db/dbConfig')
const bcrypt = require("bcrypt");

const getUsers = async () => {
    try {
      const users = await db.any("SELECT * FROM users");
      return users;
    } catch (err) {
      return err;
    }
  };
  const getOneUser = async (id) => {
    try {
        const oneUser = await db.one("SELECT * FROM users WHERE user_id=$1", id);
        return oneUser;
    } catch (err) {
        return err;
    }
}


  const createUser = async (user) => {
    try {
        const { 
            first_name, 
            last_name, 
            user_name, 
            email, 
            password_hash, 
            user_keywords 
        } = user;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

        const newUser = await db.one(
            "INSERT INTO users (first_name, last_name, user_name, email, password_hash, user_keywords) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [first_name, last_name, user_name, email, hashedPassword, user_keywords]
        );

        return newUser;
    } catch (error) {
        return error;
    }
};

    const logInUser = async (user) => {
        try {
            const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE user_name=$1", user.user_name);
    
            if (!loggedInUser) {
                return false;
            }
    
            const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash);
    
            if (!passwordMatch) {
                return false;
            }
    
            return loggedInUser;
    
        } catch (err) {
            return err;
        }
    }

    const updateUser = async (userId, updatedUserData) => {
        const { first_name, last_name, user_name, email, user_id } = updatedUserData;
    
        try {
            const updatedUser = await db.oneOrNone(
                `UPDATE users
                 SET
                     first_name = $1,
                     last_name = $2,
                     user_name = $3,
                     email = $4
                 WHERE
                     user_id = $5
                 RETURNING *`,
                [first_name, last_name, user_name, email, user_id]
            );
    
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    };
    
    const deleteUser = async (id) => {
        try {
            const deletedUser = await db.one("DELETE FROM users WHERE user_id=$1 RETURNING *", id)
            return deletedUser
        } catch (err) {
            return err
        }
    }
    
    
module.exports = {getUsers, getOneUser, createUser, logInUser, updateUser, deleteUser}
