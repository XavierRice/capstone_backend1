const db = require('../db/dbConfig')


const getUser = async () => {
    try {
        const oneUser = await db.one("SELECT * FROM users WHERE id=$1")
        return oneUser;
    } catch (error) {
        return error
    }
    }

    const createUser = async(user) => {
        try {
            const { user_id, 
                    first_name, 
                    last_name, 
                    user_name, 
                    email, 
                    events_created, 
                    favorite_events, 
                    favorite_news, 
                    donations_made, 
                    password_hash, 
                    user_keywords } = user
            const salt = 10;
            const hash = await bcrypt.hash(password_hash, salt);
            const newUser = await db.one(
                "INSERT INTO users (user_id, first_name, last_name, user_name, email, events_created, favorite_events, favorite_news, donations_made, password_hash, user_keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *", 
            )
            return newUser
        } catch(error) {
            return error
        }
    }
    const logInUser = async (user) => {
        try {
            const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username)
    
            if(!loggedInUser){
                return false
            }
    
            const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)
    
            if(!passwordMatch){
                return false
            }
    
            return loggedInUser
    
        } catch (err) {
            return err
        }
    }
module.exports = {getUser, createUser, logInUser}
