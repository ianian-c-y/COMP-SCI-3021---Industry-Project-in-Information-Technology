const mysql = require('mysql2/promise');

const cvePool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'Users',
    password: 'PassWord',
    database: 'CVE_DataBase',
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
