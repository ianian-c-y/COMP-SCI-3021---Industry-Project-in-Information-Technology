const express = require('express');
const router = express.Router();
const db = require('./DataBase').cveDB;  // 正確使用 CVE 資料庫連接

router.get('/:cveId', async (req, res) => {
    try {
        const { cveId } = req.params;

        // 驗證 CVE ID 格式
        if (!cveId || !/^\d+$/.test(cveId)) {
            return res.status(400).json({
                success: false,
                message: 'CVE ID 格式錯誤，只能包含數字'
            });
        }

        const fullCveId = `CVE-2024-${cveId}`;

        // 查詢資料庫 - 使用 db 而不是 pool
        const [rows] = await db.execute(
            'SELECT * FROM CVE_2024 WHERE cve_id = ?',
            [fullCveId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `找不到 CVE ID: ${fullCveId}`
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error('資料庫查詢錯誤:', error);
        res.status(500).json({
            success: false,
            message: '伺服器內部錯誤'
        });
    }
});

router.get('/search/:keyword', async (req, res) => {
    try {
        const { keyword } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        // 模糊搜索 - 使用 db 而不是 pool
        const [rows] = await db.execute(
            `SELECT * FROM CVE_2024 
             WHERE cve_id LIKE ? 
                OR description LIKE ? 
                OR vendors LIKE ? 
                OR products LIKE ?
             ORDER BY published_date DESC 
             LIMIT ? OFFSET ?`,
            [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`,
                parseInt(limit), parseInt(offset)]
        );

        // 計算總數 - 使用 db 而不是 pool
        const [countResult] = await db.execute(
            `SELECT COUNT(*) as total FROM CVE_2024 
             WHERE cve_id LIKE ? 
                OR description LIKE ? 
                OR vendors LIKE ? 
                OR products LIKE ?`,
            [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

        res.json({
            success: true,
            data: rows,
            pagination: {
                current_page: parseInt(page),
                total_items: countResult[0].total,
                items_per_page: parseInt(limit),
                total_pages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('搜索錯誤:', error);
        res.status(500).json({
            success: false,
            message: '伺服器內部錯誤'
        });
    }
});

module.exports = router;