const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('./DataBase');
const { v4: uuidv4 } = require('uuid');


const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const Claude_Model = {
    Haiku_3: "claude-3-haiku-20240307",
    Sonnet_3: "claude-3-sonnet-20240229",
    Sonnet_3_5: "claude-3-5-sonnet-20240620",
};
router.post('/cve-chat', async (req, res) => {
    try {
        const { message, cveData, history } = req.body;

        console.log('CVE Chat request:', {
            messageLength: message?.length,
            hasCveData: !!cveData,
            historyLength: history?.length
        });

        // System prompt for English-speaking users
        const systemPrompt = `You are a professional cybersecurity expert specializing in CVE (Common Vulnerabilities and Exposures) analysis.

Your responsibilities:
1. Answer questions in clear, professional English
2. Provide accurate technical analysis
3. Explain potential impacts and risks of vulnerabilities
4. Offer practical remediation recommendations
5. If questions go beyond CVE scope, politely redirect to relevant topics

When responding:
- Use clear, well-structured answers
- Highlight critical information
- Use bullet points or numbered lists when appropriate
- Avoid overly technical jargon, or explain it clearly when necessary
- Be concise but comprehensive
- Prioritize actionable insights for security teams`;

        // Build message history
        const apiMessages = [];

        // Add recent history (keep last 5 conversation turns = 10 messages)
        if (history && history.length > 0) {
            const recentHistory = history.slice(-10);
            recentHistory.forEach(msg => {
                apiMessages.push({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content
                });
            });
        }

        // Add current message
        apiMessages.push({
            role: 'user',
            content: message
        });

        // Call Claude API
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: Claude_Model.Sonnet_3_5,
            max_tokens: 2048,
            system: systemPrompt,
            messages: apiMessages,
            temperature: 0.7 // Balanced creativity and accuracy
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            }
        });

        const claudeResponse = response.data.content[0].text;

        console.log('CVE Chat response generated successfully');

        res.json({
            success: true,
            response: claudeResponse
        });

    } catch (error) {
        console.error('CVE Chat error:', error);
        console.error('Error response:', error.response?.data);

        res.status(500).json({
            success: false,
            error: 'An error occurred while processing your request',
            details: error.message
        });
    }
});
module.exports = router;