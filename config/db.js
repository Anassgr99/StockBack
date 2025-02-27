import mysql from 'mysql2';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config(); // Load environment variables from .env file

// Parse the MySQL URL
const mysqlUrl = url.parse(process.env.MYSQL_URL);
const [user, password] = mysqlUrl.auth.split(':');
const host = mysqlUrl.hostname;
const port = mysqlUrl.port;
const database = mysqlUrl.pathname.split('/')[1];
mysqlUrl='mysql://root:YpvkUbEqjDSkeZQwVOByggVHjZqVVCDB@mysql.railway.internal:3306/railway';

// MySQL Database Connection
const db = mysql.createConnection(mysqlUrl);x

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit if database connection fails
    } else {
        console.log('Connected to the MySQL database.');
    }
});

export default db;
