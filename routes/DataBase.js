const mysql = require('mysql2/promise');

const cvePool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'User',
    password: process.env.DB_PASSWORD || 'PassWord',
    database: process.env.DB_DATABASE || 'CVE_DataBase',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
});
// 測試連接
async function testConnection() {
    try {
        const connection = await cvePool.getConnection();
        console.log('成功連接到數據庫');
        connection.release();
    } catch (error) {
        console.error('連接數據庫時發生錯誤：', error);
    }
}

testConnection();
module.exports.cveDB = cvePool;
