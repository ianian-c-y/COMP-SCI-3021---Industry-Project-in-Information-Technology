let CVE_Case_ID = document.getElementById('CVE-ID-Number');
let resultArea = document.querySelector('.Result_Area');
let loadingIndicator = null;

// 終端機輸出函數
function terminalOutput(message) {
    // 等待終端機初始化完成
    if (typeof $ !== 'undefined' && $('.terminal').length > 0) {
        $('.terminal').append(message + '\n');
        // 滾動到底部
        $('.terminal').scrollTop($('.terminal')[0].scrollHeight);
    }
}

// 在終端機顯示命令提示符
function terminalPrompt() {
    if (typeof $ !== 'undefined' && $('.terminal').length > 0) {
        $('.terminal').append('<span class="prompt">➜</span> ');
        $('.terminal').append('<span class="path">~</span> ');
    }
}

// 清空終端機
function clearTerminal() {
    if (typeof $ !== 'undefined' && $('.terminal').length > 0) {
        $('.terminal').text('');
    }
}

// 顯示載入中狀態 (修改為終端機版本)
function showLoading() {
    terminalOutput('🔍 正在查詢 CVE 資料庫...');
}

// 隱藏載入中狀態
function hideLoading() {
    // 終端機版本不需要隱藏，只需要輸出完成訊息
}

// 清除輸入框函數
function clearInput(inputId) {
    let input = document.getElementById(inputId);
    if (input) {
        input.value = '';
        updateResult('result3', 'CVE-2024-');
        clearTerminal(); // 清空終端機而不是 resultArea
        terminalOutput('🗑️  終端機已清空');
        terminalPrompt();
    }
}

// 更新結果顯示函數
function updateResult(resultId, value) {
    let resultElement = document.getElementById(resultId);
    if (resultElement) {
        resultElement.textContent = '完整值：' + value;
    }
}

// 清除搜索結果
function clearResults() {
    clearTerminal();
}

// 顯示 CVE 詳細資料 (修改為終端機版本)
function displayCVEDetails(cveData) {
    terminalOutput('');
    terminalOutput('====================================');
    terminalOutput(`🎯 CVE ID: ${cveData.cve_id}`);
    terminalOutput('====================================');
    terminalOutput('');

    // 嚴重程度顯示
    const severityEmoji = {
        'critical': '🔴',
        'high': '🟠',
        'medium': '🟡',
        'low': '🟢',
        'unknown': '⚪'
    };

    const severity = (cveData.severity || 'unknown').toLowerCase();
    terminalOutput(`${severityEmoji[severity] || '⚪'} 嚴重程度: ${cveData.severity || 'Unknown'}`);

    if (cveData.cvss_score) {
        terminalOutput(`📊 CVSS 分數: ${cveData.cvss_score}`);
    }

    terminalOutput('');
    terminalOutput('📋 基本資訊:');
    terminalOutput(`   📅 發布日期: ${cveData.published_date || 'N/A'}`);
    terminalOutput(`   🔄 最後修改: ${cveData.last_modified || 'N/A'}`);
    terminalOutput(`   ⚡ 狀態: ${cveData.vuln_status || 'N/A'}`);
    terminalOutput(`   📏 CVSS 版本: ${cveData.cvss_version || 'N/A'}`);

    terminalOutput('');
    terminalOutput('🏢 受影響資訊:');
    terminalOutput(`   🏭 廠商: ${cveData.vendors || 'N/A'}`);
    terminalOutput(`   📦 產品: ${cveData.products || 'N/A'}`);
    terminalOutput(`   🔗 參考連結: ${cveData.reference_count || 0} 個`);

    terminalOutput('');
    terminalOutput('📝 漏洞描述:');
    terminalOutput('────────────────────────────────────');

    // 將描述分行顯示，避免過長
    const description = cveData.description || '暫無描述';
    const maxWidth = 60; // 每行最大字符數

    for (let i = 0; i < description.length; i += maxWidth) {
        terminalOutput(`   ${description.slice(i, i + maxWidth)}`);
    }

    terminalOutput('────────────────────────────────────');
    terminalOutput('');
    terminalPrompt();
}

// 顯示錯誤訊息 (修改為終端機版本)
function displayError(message) {
    terminalOutput('');
    terminalOutput('❌ 查詢失敗');
    terminalOutput('════════════════════════════════════');
    terminalOutput(`💬 錯誤訊息: ${message}`);
    terminalOutput('════════════════════════════════════');
    terminalOutput('');
    terminalPrompt();
}

// 搜索 CVE 函數
async function searchCVE() {
    let cveNumber = CVE_Case_ID.value.trim();

    if (!cveNumber) {
        terminalOutput('⚠️  請輸入 CVE 編號');
        terminalPrompt();
        return;
    }

    if (!/^\d+$/.test(cveNumber)) {
        terminalOutput('⚠️  CVE 編號只能包含數字');
        terminalPrompt();
        return;
    }

    // 清空終端機並顯示查詢開始
    clearTerminal();
    terminalOutput(`🚀 開始查詢: CVE-2024-${cveNumber}`);
    showLoading();

    try {
        const response = await fetch(`/api/cve/${cveNumber}`);
        const result = await response.json();

        if (result.success) {
            terminalOutput('✅ 查詢成功！');
            displayCVEDetails(result.data);
        } else {
            displayError(result.message);
        }

    } catch (error) {
        console.error('API 請求錯誤:', error);
        displayError('網絡連接錯誤，請稍後重試');
    }
}

// 監聽輸入事件
if (CVE_Case_ID) {
    // 初始化顯示
    updateResult('result3', 'CVE-2024-');

    // 輸入限制：只允許數字
    CVE_Case_ID.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        updateResult('result3', 'CVE-2024-' + this.value);
    });

    // Enter 鍵搜索
    CVE_Case_ID.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchCVE();
        }
    });
}

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 等待一下確保終端機已載入
    setTimeout(function() {
        terminalOutput('🎯 CVE 查詢系統已就緒');
        terminalOutput('💡 請在上方輸入 CVE 編號進行查詢');
        terminalPrompt();
    }, 1000);
});