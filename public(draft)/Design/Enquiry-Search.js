const Main = document.querySelector('main');
const body = document.querySelector('body');
const Wait_Time = 5000
// const Wait_Time = 1
let loadingTimeout = null;
let CVE_Result = null;
const Result_Area = document.getElementById('Result_Area');
let Case_ID = document.getElementById('CVE-ID-Number');
const loadingElement = document.createElement('div');
let is_loadingElement_Exist = document.getElementById('Loading');
const Loading_Style_Set = new Map()
Loading_Style_Set.set(1, `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" /></rect><rect x="10" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"/></rect><rect x="20" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" /></rect></svg>`);
Loading_Style_Set.set(2, `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg>`)
Loading_Style_Set.set(3, `<svg class="loading-spinner" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.1921" height="19.9316"><g><rect height="19.9316" opacity="0" width="24.1921" x="0" y="0"></rect><path d="M11.9154 0C8.98569 0 6.32944 1.26953 4.50327 3.31055C4.10288 3.75 4.2396 4.32617 4.61069 4.58008C4.92319 4.81445 5.34311 4.83398 5.75327 4.39453C7.27671 2.70508 9.47397 1.66016 11.9154 1.66016C15.9486 1.66016 19.2982 4.53125 20.0306 8.33984L18.6537 8.33984C17.9603 8.33984 17.7845 8.80859 18.1556 9.3457L20.3431 12.4609C20.6556 12.9102 21.1244 12.9199 21.4466 12.4609L23.6341 9.35547C24.015 8.80859 23.8294 8.33984 23.1361 8.33984L21.7298 8.33984C20.9681 3.61328 16.8568 0 11.9154 0ZM11.9154 19.9219C14.8451 19.9219 17.5013 18.6523 19.3275 16.6113C19.7279 16.1621 19.5912 15.5957 19.2201 15.332C18.9076 15.1074 18.4876 15.0879 18.0775 15.5176C16.5541 17.207 14.3568 18.2617 11.9154 18.2617C7.88218 18.2617 4.53257 15.3906 3.80015 11.582L5.1771 11.582C5.87046 11.582 6.04624 11.1035 5.67515 10.5762L3.48765 7.45117C3.17515 7.01172 2.7064 7.00195 2.38413 7.45117L0.19663 10.5664C-0.184229 11.1035-0.00844799 11.582 0.694677 11.582L2.10093 11.582C2.86265 16.3086 6.97397 19.9219 11.9154 19.9219Z" fill="black" fill-opacity="0.85"></path></g></svg><style> .loading-spinner {animation        : spin 1s linear infinite; transform-origin : center;}@keyframes spin {from {transform : rotate(0deg);}to {transform : rotate(360deg);}}@keyframes spin-ease {0% {transform : rotate(0deg);}50% {transform : rotate(180deg);}100% {transform : rotate(360deg);}}@keyframes pulse {from {opacity   : 0.6;transform : scale(0.9) rotate(var(--rotation, 0deg));} to {opacity   : 1;transform : scale(1.1) rotate(var(--rotation, 0deg));}}</style>`)
Loading_Style_Set.set(4, `<div id="load"><div>G</div><div>N</div><div>I</div><div>D</div><div>A</div><div>O</div><div>L</div></div><style>#load{position:absolute;width:600px;height:36px;left:50%;top:40%;margin-left:-300px;overflow:visible;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;} #load div {position:absolute; width:20px; height:36px; opacity:0; font-family:Helvetica, Arial, sans-serif; animation:move 2s linear infinite; -o-animation:move 2s linear infinite; -moz-animation:move 2s linear infinite; -webkit-animation:move 2s linear infinite; transform:rotate(180deg); -o-transform:rotate(180deg); -moz-transform:rotate(180deg); -webkit-transform:rotate(180deg); color:#35C4F0;} #load div:nth-child(2) {animation-delay:0.2s; -o-animation-delay:0.2s; -moz-animation-delay:0.2s; -webkit-animation-delay:0.2s;} #load div:nth-child(3) {animation-delay:0.4s; -o-animation-delay:0.4s; -webkit-animation-delay:0.4s; -webkit-animation-delay:0.4s;} #load div:nth-child(4) {animation-delay:0.6s;-o-animation-delay:0.6s;-moz-animation-delay:0.6s;-webkit-animation-delay:0.6s;} #load div:nth-child(5) {animation-delay:0.8s; -o-animation-delay:0.8s; -moz-animation-delay:0.8s;-webkit-animation-delay:0.8s;} #load div:nth-child(6) {animation-delay:1s;-o-animation-delay:1s;-moz-animation-delay:1s;-webkit-animation-delay:1s;} #load div:nth-child(7) {animation-delay:1.2s;-o-animation-delay:1.2s;-moz-animation-delay:1.2s;-webkit-animation-delay:1.2s;} @keyframes move {0% {left:0;opacity:0;}35% {left:41%;-moz-transform:rotate(0deg);-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}65%{left:59%;-moz-transform:rotate(0deg);-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}100%{left:100%;-moz-transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-o-transform:rotate(-180deg);transform:rotate(-180deg);opacity:0;}}@-moz-keyframes move {0% {left:0;opacity:0;}35%{left:41%;-moz-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}65%{left:59%;-moz-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}100%{left:100%;-moz-transform:rotate(-180deg);transform:rotate(-180deg);opacity:0;}}@-webkit-keyframes move {0%{left:0;opacity:0;}35%{left:41%;-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}65%{left:59%;-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}100%{left:100%;-webkit-transform:rotate(-180deg);transform:rotate(-180deg);opacity:0;}}@-o-keyframes move {0%{left:0;opacity:0;}35%{left:41%;-o-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}65%{left:59%;-o-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}100%{left:100%;-o-transform:rotate(-180deg);transform:rotate(-180deg);opacity:0;}}</style>`)
Loading_Style_Set.set(5, `<div class="loader"><div class="loader-inner"><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div></div></div><style> .loader {background: #000;background: radial-gradient(#222, #000);bottom: 0;left: 0;overflow: hidden;right: 0;top: 0;z-index: 99999;} .loader-inner {bottom: 0;height: 25px;left: 0;margin: auto;position: absolute;right: 0;top: 0;width: 50px;} .loader-line-wrap {animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite; box-sizing: border-box;height: 50px;left: 0;overflow: hidden;position: absolute;top: 0;transform-origin: 50% 100%;width: 100px;} .loader-line {border: 4px solid transparent;border-radius: 100%; box-sizing: border-box;height: 100px; left: 0;margin: 0 auto; position: absolute; right: 0; top: 0; width: 100px;} .loader-line-wrap:nth-child(1) { animation-delay: -50ms; } .loader-line-wrap:nth-child(2) { animation-delay: -100ms; } .loader-line-wrap:nth-child(3) { animation-delay: -150ms; } .loader-line-wrap:nth-child(4) { animation-delay: -200ms; } .loader-line-wrap:nth-child(5) { animation-delay: -250ms; } .loader-line-wrap:nth-child(1) .loader-line {border-color: hsl(0, 80%, 60%);height: 90px;width: 90px;top: 7px;} .loader-line-wrap:nth-child(2) .loader-line {border-color: hsl(60, 80%, 60%);height: 76px;width: 76px;top: 14px;} .loader-line-wrap:nth-child(3) .loader-line {border-color: hsl(120, 80%, 60%);height: 62px;width: 62px;top: 21px;} .loader-line-wrap:nth-child(4) .loader-line {border-color: hsl(180, 80%, 60%);height: 48px;width: 48px;top: 28px;}.loader-line-wrap:nth-child(5) .loader-line {border-color: hsl(240, 80%, 60%);height: 34px;width: 34px;top: 35px;}@keyframes spin {0%, 15% {transform: rotate(0);}100% {transform: rotate(360deg);}}</style>`)
Loading_Style_Set.set(6, `<div class="Loading-container-"><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><style>.ball {width: 10px; height: 10px; margin: 10px auto; border-radius: 50px; --background-dot: black;}.ball:nth-child(1) {background: var(--background-dot); -webkit-animation: right 1s infinite ease-in-out; -moz-animation: right 1s infinite ease-in-out; animation: right 1s infinite ease-in-out;}.ball:nth-child(2) {background: var(--background-dot);-webkit-animation: left 1.1s infinite ease-in-out;-moz-animation: left 1.1s infinite ease-in-out;animation: left 1.1s infinite ease-in-out;}.ball:nth-child(3) {background: var(--background-dot); -webkit-animation: right 1.05s infinite ease-in-out; -moz-animation: right 1.05s infinite ease-in-out; animation: right 1.05s infinite ease-in-out;}.ball:nth-child(4) {background: var(--background-dot);-webkit-animation: left 1.15s infinite ease-in-out;-moz-animation: left 1.15s infinite ease-in-out;animation: left 1.15s infinite ease-in-out;}.ball:nth-child(5) {background: var(--background-dot);-webkit-animation: right 1.1s infinite ease-in-out;-moz-animation: right 1.1s infinite ease-in-out;animation: right 1.1s infinite ease-in-out;}.ball:nth-child(6) {background: var(--background-dot);-webkit-animation: left 1.05s infinite ease-in-out;-moz-animation: left 1.05s infinite ease-in-out;animation: left 1.05s infinite ease-in-out;}.ball:nth-child(7) {background: var(--background-dot);-webkit-animation: right 1s infinite ease-in-out;-moz-animation: right 1s infinite ease-in-out;animation: right 1s infinite ease-in-out;}@-webkit-keyframes right{0% {-webkit-transform: translate(-15px)} 50% {-webkit-transform: translate(15px)} 100% {-webkit-transform: translate(-15px)}}  @-webkit-keyframes left {0% {-webkit-transform: translate(15px)} 50% {-webkit-transform: translate(-15px)} 100% {-webkit-transform: translate(15px)}}  @-moz-keyframes right {0% {-moz-transform: translate(-15px)}50% {-moz-transform: translate(15px)}100% {-moz-transform: translate(-15px)}}  @-moz-keyframes left {0% {-moz-transform: translate(15px)} 50% {-moz-transform: translate(-15px)} 100% {-moz-transform: translate(15px)}}  @keyframes right {0% {transform: translate(-15px)} 50% {transform: translate(15px)} 100% {transform: translate(-15px);}}  @keyframes left {0% {transform: translate(15px);} 50% {transform: translate(-15px);} 100% {transform: translate(15px);}}.Loading-container- {height: inherit;scale: 0.5;}</style><div class="container">`)

/* ---------------------------------------- */
function clear_search() {
    let input = document.getElementById('CVE-ID-Number');
    if (input) {
        input.value = '';
        updateResult('result3', 'CVE-2024-');
    }
}

function update_preview(code) {
    let resultElement = document.getElementById('Results-ID-Preview');
    if (resultElement) {
        resultElement.textContent = 'ID:：' + code;
    }
}

async function loading() {
    console.log('loading')
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
    }
    if (is_loadingElement_Exist) {
        is_loadingElement_Exist.remove();
    }
    loadingElement.id = 'Loading'
    loadingElement.style.maxWidth = "fit-content"
    loadingElement.style.justifySelf = "center"
    // loadingElement.innerHTML = Loading_Style_Set.get(1)
    loadingElement.innerHTML = Loading_Style_Set.get(Math.ceil(Math.random() * Loading_Style_Set.size))
    Result_Area.appendChild(loadingElement);
    loadingTimeout = setTimeout(() => {
        if (loadingElement && loadingElement.parentNode) {
            loadingElement.remove();
        }
        loadingTimeout = null;
    }, Wait_Time);
}

async function search_CVE_DB(value = null) {
    let cveNumber = Case_ID.value.trim();
    if (value) {
        cveNumber = value
    }

    let CVE_Result = null;
    if (!cveNumber) {
        return;
    }
    if (!/^\d+$/.test(cveNumber)) {
        // terminalOutput('⚠️  CVE 編號只能包含數字');
        return;
    }
    try {
        const response = await fetch(`/api/cve/${cveNumber}`);
        let result = await response.json();
        if (result.success) {
            CVE_Result = result.data
        } else {
            CVE_Result = null
        }
    } catch (error) {
        console.error('API 請求錯誤:', error);
    } finally {
        return CVE_Result
    }
    return CVE_Result
}

// ---------------------------------------- */
async function loadCVETemplate() {
    try {
        const response = await fetch('/public/Design/CVE-Results.html');
        return await response.text();
    } catch (error) {
        console.error('載入 CVE 模板失敗:', error);
        return null;
    }
}

function createSVGGauge(score) {
    const percentage = (score / 10) * 100;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDasharray = (percentage / 100) * circumference;

    return `
        <svg width="120" height="120" class="gauge-svg">
            <circle cx="60" cy="60" r="45" 
                stroke="#e9ecef" stroke-width="8" fill="none"/>
            <circle cx="60" cy="60" r="45" 
                stroke="${getScoreColor(score)}" 
                stroke-width="8" 
                fill="none"
                stroke-dasharray="${strokeDasharray} ${circumference}"
                stroke-dashoffset="${circumference * 0.25}"
                transform="rotate(-90 60 60)"
                style="transition: stroke-dasharray 1s ease-out"/>
            <text x="60" y="55" text-anchor="middle" 
                font-size="18" font-weight="bold">${score}</text>
            <text x="60" y="75" text-anchor="middle" 
                font-size="10" fill="#666">CVSS</text>
        </svg>
    `;
}

function getScoreColor(score) {
    if (score >= 9.0) return '#dc3545';
    if (score >= 7.0) return '#fd7e14';
    if (score >= 4.0) return '#ffc107';
    if (score > 0) return '#28a745';
    return '#6c757d';
}

function formatCVEData(result) {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-AU', {
            weekday: "long",
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const formatDate_Short = (dateStr) => {return new Date(dateStr).toLocaleDateString('en-AU');};
    const getSeverityClass = (severity) => {return severity.toLowerCase();};
    const getStatusClass = (status) => {
        if (status.includes('Analyzed')) return 'analyzed';
        if (status.includes('Awaiting')) return 'awaiting';
        if (status.includes('Rejected')) return 'rejected';
        return '';
    };
    const cvss_graph = createSVGGauge(score = result.cvss_score)
    const threatLevels = {'Critical': 'high', 'High': 'high', 'Medium': 'medium', 'Low': 'low'};
    const trendingLevel = result.trending_score > 70 ? 'high' : result.trending_score > 40 ? 'moderate' : 'low';
    const getThreatLevelClass = (level) => {
        if (level === 'Critical' || level === 'High') return 'high';
        if (level === 'Medium') return 'medium';
        return 'low';
    };

    return {
        cve_id: result.cve_id,
        description: result.description,
        published_date: formatDate(result.published_date),
        published_date_short: formatDate_Short(result.published_date),
        last_modified: formatDate_Short(result.last_modified),
        formatted_date: new Date().toLocaleDateString('en-AU'),
        cvss_score: result.cvss_score,
        cvss_score_graph: cvss_graph,
        severity: result.severity,
        severity_class: getSeverityClass(result.severity),
        cvss_version: result.cvss_version,
        vuln_status: result.vuln_status,
        status_class: getStatusClass(result.vuln_status),
        vendors: result.vendors || 'Unspecified',
        products: result.products || 'Unspecified',
        reference_count: result.reference_count,
        attack_vector: result.attack_vector || 'N/A',
        attack_vector_class: (result.attack_vector || '').toLowerCase(),
        attack_complexity: result.attack_complexity || 'N/A',
        exploitability_score: result.exploitability_score || 0,
        exploitability_percent: ((result.exploitability_score || 0) / 10 * 100).toFixed(0),
        impact_score: result.impact_score || 0,
        impact_percent: ((result.impact_score || 0) / 10 * 100).toFixed(0),
        cwe_id: result.cwe_id || 'N/A',
        tags: result.tags || '',
        patch_status: result.patch_available ? '✓ Available' : '✗ Not Available',
        threat_level: result.threat_level || 'Unknown',
        exploit_status: result.exploit_available ? 'Available' : 'Not Found',
        exploit_class: result.exploit_available ? 'danger' : '',
        trending_score: result.trending_score || 0,
        trending_level: trendingLevel,
        affected_platforms: result.affected_platforms || '{}',
        vulnerability_categories: result.vulnerability_categories || '',
        threat_level_class: getThreatLevelClass(result.threat_level || 'Unknown')
    };
}

function createPlatformChart(platformData) {
    const chart = document.getElementById('platformChart');
    const legend = document.getElementById('platformLegend');
    if (!chart || !platformData) return;

    const data = JSON.parse(platformData);
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    let currentAngle = 0;

    chart.innerHTML = '';
    legend.innerHTML = '';

    // 創建SVG圓餅圖
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    svg.setAttribute('viewBox', '0 0 200 200');

    Object.entries(data).forEach(([platform, count], index) => {
        const percentage = count / total;
        const angle = percentage * 360;

        // 創建圓餅切片
        const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const startAngle = currentAngle * Math.PI / 180;
        const endAngle = (currentAngle + angle) * Math.PI / 180;

        const x1 = 100 + 90 * Math.cos(startAngle);
        const y1 = 100 + 90 * Math.sin(startAngle);
        const x2 = 100 + 90 * Math.cos(endAngle);
        const y2 = 100 + 90 * Math.sin(endAngle);

        const largeArc = angle > 180 ? 1 : 0;
        const pathData = `M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`;

        slice.setAttribute('d', pathData);
        slice.setAttribute('fill', colors[index % colors.length]);
        slice.style.transition = 'transform 0.3s';
        slice.style.cursor = 'pointer';

        slice.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transformOrigin = '100px 100px';
        });
        slice.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });

        svg.appendChild(slice);

        // 創建圖例
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background: ${colors[index % colors.length]}"></div>
            <span>${platform} (${count})</span>
        `;
        legend.appendChild(legendItem);

        currentAngle += angle;
    });

    chart.appendChild(svg);
}

function createTagCloud(categories) {
    const cloud = document.getElementById('tagCloud');
    if (!cloud || !categories) return;

    const tags = categories.split(',').map(t => t.trim()).filter(t => t);
    const sizes = ['small', 'medium', 'large'];

    cloud.innerHTML = tags.map((tag, index) => {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        return `<span class="tag ${size}">${tag}</span>`;
    }).join('');
}

/* ---------------------------------------- */
function createTagCloud(categories) {
    const cloud = document.getElementById('tagCloud');
    if (!cloud || !categories) return;

    const tags = categories.split(',').map(t => t.trim()).filter(t => t);
    const sizes = ['small', 'medium', 'large'];

    cloud.innerHTML = tags.map((tag, index) => {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        return `<span class="tag ${size}">${tag}</span>`;
    }).join('');
}

function createRadarChart(scores) {
    const chart = document.getElementById('radarChart');
    if (!chart) return;

    const dimensions = [
        {label: 'CVSS', value: scores.cvss || 0},
        {label: 'Exploitability', value: scores.exploitability || 0},
        {label: 'Impact', value: scores.impact || 0},
        {label: 'Trending', value: (scores.trending || 0) / 10},
        {label: 'Complexity', value: scores.complexity || 5}
    ];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '300');
    svg.setAttribute('viewBox', '0 0 300 300');

    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;
    const angleStep = (Math.PI * 2) / dimensions.length;

    // 畫背景網格
    for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius / 5) * i;
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = dimensions.map((_, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
        polygon.setAttribute('points', points);
        polygon.setAttribute('fill', 'none');
        polygon.setAttribute('stroke', '#ddd');
        polygon.setAttribute('stroke-width', '1');
        svg.appendChild(polygon);
    }

    // 畫軸線和標籤
    dimensions.forEach((dim, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = centerX + maxRadius * Math.cos(angle);
        const y = centerY + maxRadius * Math.sin(angle);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#ddd');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const labelX = centerX + (maxRadius + 20) * Math.cos(angle);
        const labelY = centerY + (maxRadius + 20) * Math.sin(angle);
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.textContent = dim.label;
        svg.appendChild(text);
    });

    // 畫數據多邊形
    const dataPoints = dimensions.map((dim, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (dim.value / 10) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataPolygon.setAttribute('points', dataPoints);
    dataPolygon.setAttribute('fill', 'rgba(220, 53, 69, 0.3)');
    dataPolygon.setAttribute('stroke', '#dc3545');
    dataPolygon.setAttribute('stroke-width', '2');
    svg.appendChild(dataPolygon);

    chart.appendChild(svg);
}

function initCVETimeline(publishedDate, modifiedDate) {
    const timeline = document.getElementById('cveTimeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    const pubMonth = new Date(publishedDate).getMonth() + 1;
    const modMonth = new Date(modifiedDate).getMonth() + 1;

    for (let i = 1; i <= 12; i++) {
        const li = document.createElement('li');
        li.setAttribute('data-month', i);

        const month = document.createElement('div');
        month.className = 'month';
        // month.textContent = i + '月';

        if (i === pubMonth) {
            li.classList.add('published');
        }
        if (i === modMonth && modMonth !== pubMonth) {
            li.classList.add('modified');
        }
        if (i === modMonth && modMonth === pubMonth) {
            li.classList.add('published', 'modified');
        }

        li.appendChild(month);
        timeline.appendChild(li);
    }
}

async function search_results_display(result = null) {
    const is_Result_Container_Exist = document.getElementById('Result_Container');
    if (is_Result_Container_Exist) {
        is_Result_Container_Exist.remove();
    }
    const Result_Container = document.createElement('div');
    Result_Container.id = 'Result_Container';

    if (!result) {
        // Use the 403-style error page from Testing-5.html
        Result_Container.innerHTML = `
       
<!-- include the svg assets later used in the project -->
<svg style="display: none;">
    <symbol id="keyhole" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458333 26.458334"><g transform="translate(0 -270.542)"><circle cx="13.229" cy="279.141" r="8.599" fill="#f1eedb" paint-order="stroke fill markers"></circle><path d="M10.516 283.271h5.427c1.164 0 1.768.861 2.102 1.802l3.59 10.125c.334.94-.937 1.802-2.102 1.802H6.926c-1.165 0-2.437-.861-2.103-1.802l3.59-10.125c.334-.94.938-1.802 2.103-1.802z" fill="#f1eedb" paint-order="stroke fill markers"></path><circle r="6.06" cy="279.141" cx="13.229" fill="#282b24" paint-order="stroke fill markers"></circle><path d="M11.502 283.76h3.455c.741 0 1.126.733 1.338 1.534l2.286 8.614c.213.8-.597 1.534-1.338 1.534H9.216c-.742 0-1.551-.733-1.339-1.534l2.286-8.614c.212-.8.597-1.534 1.339-1.534z" fill="#282b24" paint-order="stroke fill markers"></path></g></symbol>
    <symbol id="key" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458333 26.458334"><circle cx="13.229" cy="279.141" r="8.599" paint-order="stroke fill markers" transform="matrix(0 -.76923 .7499 0 -202.882 23.405)" fill="#f1eedb"></circle><circle r="8.599" cy="279.141" cx="13.229" paint-order="stroke fill markers" transform="matrix(0 -.5887 .57392 0 -153.756 21.017)" fill="#282b24"></circle><path fill="#f1eedb" paint-order="stroke fill markers" d="M12.03 12.13h14.428v2.2H12.03z"></path><path fill="#f1eedb" paint-order="stroke fill markers" d="M18.147 12.13h2.895v6.772h-2.895zM22.113 12.13h2.716v5.065h-2.716z"></path></symbol>
    <symbol id="ghost" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458333 26.458334"><g transform="translate(0 -270.542)"><path d="M4.63 279.293c0-4.833 3.85-8.751 8.6-8.751 4.748 0 8.598 3.918 8.598 8.75H13.23zM4.725 279.293h16.914c.052 0 .19.043.19.096l-.095 14.329c0 .026-.011.05-.028.068a.093.093 0 0 1-.067.028c-.881 0-1.235-1.68-2.114-1.616-.995.072-1.12 2.082-2.114 2.154-.88.064-1.233-1.615-2.115-1.615-.881 0-1.233 1.615-2.114 1.615-.881 0-1.233-1.615-2.114-1.615-.882 0-1.236 1.679-2.115 1.615-.994-.072-1.12-2.082-2.114-2.154-.88-.063-1.41 1.077-2.114 1.616-.021.016-.05-.01-.067-.028a.097.097 0 0 1-.028-.068v-14.33c0-.052.042-.095.095-.095z" fill="#f1eedb" paint-order="stroke fill markers"></path><path d="M15.453 281.27a1.987 1.94 0 0 1-.994 1.68 1.987 1.94 0 0 1-1.987 0 1.987 1.94 0 0 1-.994-1.68h1.988z" fill="#282b24" paint-order="stroke fill markers"></path><g fill="#282b24" transform="matrix(1 0 0 1.0177 .283 -5.653)"><ellipse cx="10.205" cy="278.668" rx="1.231" ry="1.181" paint-order="stroke fill markers"></ellipse><ellipse ry="1.181" rx="1.231" cy="278.668" cx="16.159" paint-order="stroke fill markers"></ellipse><ellipse ry=".331" rx=".853" cy="280.936" cx="10.205" opacity=".5" paint-order="stroke fill markers"></ellipse><ellipse cx="16.159" cy="280.936" rx=".853" ry=".331" opacity=".5" paint-order="stroke fill markers"></ellipse></g><ellipse ry=".614" rx="8.082" cy="296.386" cx="13.229" opacity=".1" fill="#f1eedb" paint-order="stroke fill markers"></ellipse></g></symbol>

</svg>

<!-- include in a container a heading, paragraph and svg for the keyhole -->
<div class="container">
    <h1>403</h1>
    <p>access not granted</p>
    <svg class="keyhole" style="animation-play-state: running;">
        <use href="#keyhole"></use>
    </svg>
</div>

<!-- outside of the container, to have them absolute positioned in relation to the body, include an svg for the key and one for the ghost -->
<svg class="key" style="animation-play-state: running; pointer-events: none; left: -106.333px; top: 27px;">
    <use href="#key"></use>
</svg>

<!--
  ! nest the svg in a vi, give the svg and vi the same class
  the div and svg behave differently when translating the element through the transform property, giving a nice distance between the text (included with a pseudo element on the div) and the svg
-->
<div class="ghost">
    <svg class="ghost">
        <use href="#ghost"></use>
    </svg>
</div>

<script id="rendered-js">
    // target the elements in the DOM used in the project

    /**
     * svg for the key and keyhole
     * div nesting the ghost
     * heading and paragraph
     */
    const key = document.querySelector(".key");
    const keyhole = document.querySelector(".keyhole");
    const ghost = document.querySelector(".ghost");

    const heading = document.querySelector("h1");
    const paragraph = document.querySelector("p");


    // for the length of the timout, consider the --animation-duration custom property and add a small delay
    // retrieve properties on the root element
    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);
    // retrieve the animation-duration custom property
    // ! this is specified as "40s", in seconds, so parse the number and includ it in milliseconds
    const animationDuration = parseInt(rootStyles.getPropertyValue("--animation-duration")) * 100;
    let keyTimer = animationDuration * 9 / 8;


    // retrieve the dimensions of the key (to have the key exactly where the cursor would lie)
    const keyBox = key.getBoundingClientRect();
    // console.log(keyBox);


    // KEY & KEYHOLE ANIMATION
    // include a timeout with the specified time frame
    const timeoutID = setTimeout(() => {
        // after the specified time, change the cursor as to seemingly grab the key
        key.parentElement.parentElement.style.cursor = "grab";

        // introduce the key and keyhole svg elements by triggering the paused-by-default animation
        key.style.animationPlayState = "running";
        keyhole.style.animationPlayState = "running";

        // ! pointer-events set to none on the key to allow for a mouseover event on the keyhole
        // the key is indeed used in stead of the normal cursor and would overlap on top of everything
        key.style.pointerEvents = "none";

        // when the cursor hovers anywhere in the window, call a function to update the position of the key and have it match the cursor
        window.addEventListener("mousemove", updateKeyPosition);

        // when the cursor hovers on the keyhole, call a function to grant access and remove present listeners
        keyhole.addEventListener("mouseover", grantAccess);

        clearTimeout(timeoutID);
    }, keyTimer);


    // define the function which updates the position of the absolute-positioned key according to the mouse coordinates (and the keys own dimensions)
    const updateKeyPosition = e => {
        let x = e.clientX;
        let y = e.clientY;
        key.style.left = x - keyBox.width / 1.5;
        key.style.top = y - keyBox.height / 2;
    };

    // define the function which notifies the user of the grant access
    const grantAccess = () => {
        // restore the cursor
        key.parentElement.parentElement.style.cursor = "default";

        // change the text of the heading and paragraph elements
        heading.textContent = '🎉 yay 🎉';
        paragraph.textContent = 'access granted';

        // remove the svg elements for the key and keywhole from the flow of the document
        keyhole.style.display = "none";
        key.style.display = "none";

        // remove the event listeners, most notably the one on the window
        window.removeEventListener("mousemove", updateKeyPosition);
        keyhole.removeEventListener("mouseover", grantAccess);
    };
    //# sourceURL=pen.js
</script>



        `;
    } else {
        const template = await loadCVETemplate();
        if (template) {
            const formattedData = formatCVEData(result);
            let processedHTML = template;
            Object.keys(formattedData).forEach(key => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                processedHTML = processedHTML.replace(regex, formattedData[key]);
            });
            Result_Container.innerHTML = processedHTML;
            setTimeout(() => {
                initCVETimeline(result.published_date, result.last_modified);
                createPlatformChart(result.affected_platforms);
                createTagCloud(result.vulnerability_categories);
                createRadarChart({
                    cvss: result.cvss_score,
                    exploitability: result.exploitability_score,
                    impact: result.impact_score,
                    trending: result.trending_score,
                    complexity: result.attack_complexity === 'Low' ? 3 : 7
                });
            }, 100);
        } else {
            Result_Container.innerHTML = `<div class="error_message">Cannot find relevant information</div>`;
        }
    }
    Result_Area.appendChild(Result_Container);
    console.log(result);
}

async function Search() {
    const is_Result_Container_Exist = document.getElementById('Result_Container');
    if (is_Result_Container_Exist) {
        is_Result_Container_Exist.remove();
    }
    loading()
    try {
        let results = await search_CVE_DB();
        console.log(results);
        setTimeout(async () => {
            if (loadingElement && loadingElement.parentNode) {
                loadingElement.remove();
            }
            await search_results_display(results);
        }, Wait_Time);
    } catch (error) {
        if (loadingElement && loadingElement.parentNode) {
            loadingElement.remove();
        }
    }
}

// ---------------------------------------- */
if (Case_ID) {
    Case_ID.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        update_preview('CVE-2024-' + this.value);
    });
    Case_ID.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            Search()
        }
    });
}

// ---------------------------------------- */
const showBtn = document.getElementById('cveShowBtn');
const copyBtn = document.getElementById('cveCopyBtn');
const refList = document.getElementById('cveRefList');
const notification = document.getElementById('cveCopyNotif');
function initCVEReferences() {
    let cveExpanded = false;

    if (!showBtn || !copyBtn || !refList || !notification) {
        console.error('CVE Reference elements not found!');
        return;
    }

    // Toggle展开/收起
    showBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        cveExpanded = !cveExpanded;

        if (cveExpanded) {
            refList.classList.add('cve-expanded');
            showBtn.textContent = 'Hide all';
        } else {
            refList.classList.remove('cve-expanded');
            showBtn.textContent = 'Show all';
        }
    };

    // 复制引用
    copyBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        const refs = `[1] NVD - General
    https://nvd.nist.gov/vuln/detail/CVE-2024-1001

[2] VDB-252270 | Totolink N200RE /cgi-bin/cstecgi.cgi main stack-based overflow
    https://vuldb.com/?id.252270

[3] VDB-252270 | Totolink N200RE Exploit Publication
    https://vuldb.com/?id.252270

[4] CVE-2024-1001 - Totolink Vendor Information
    https://vuldb.com/?vendor.totolink

[5] CVE Details - Totolink N200RE Firmware
    https://www.cvedetails.com/product/77039/Totolink-N200re-Firmware.html

[6] CWE-121: Stack-based Buffer Overflow
    https://cwe.mitre.org/data/definitions/121.html`;

        // 尝试复制
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(refs).then(function () {
                showNotification();
            }).catch(function (err) {
                fallbackCopy(refs);
            });
        } else {
            fallbackCopy(refs);
        }
    };

    // 备用复制方法
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showNotification();
        } catch (err) {
            alert('Copy failed. Please copy manually.');
        }

        document.body.removeChild(textarea);
    }

    // 显示通知
    function showNotification() {
        notification.classList.add('cve-show');
        setTimeout(function () {
            notification.classList.remove('cve-show');
        }, 2000);
    }

    console.log('✓ CVE References initialized successfully');
}

window.addEventListener('load', function () {
    if (!document.getElementById('cveShowBtn').onclick) {
        initCVEReferences();
    }
});

/* ---------------------------------------- */
document.addEventListener('DOMContentLoaded', async function () {
    console.log('所有 Cookie:', document.cookie);
    update_preview('CVE-2024-1000')
    let results = await search_CVE_DB(value = 1001);
    await search_results_display(results);
});

// ---------------------------------------- */
function renderMessage(type, {title, detail, actions = []}) {
    const wrap = document.createElement('div');
    wrap.className = `msg ${type}`;
    wrap.innerHTML = `
    <div>
      <div class="title">${title}</div>
      <div class="detail">${detail || ''}</div>
    </div>
    <div class="actions"></div>
  `;
    const actionsBox = wrap.querySelector('.actions');
    actions.forEach(({label, onClick}) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = label;
        btn.addEventListener('click', onClick);
        actionsBox.appendChild(btn);
    });
    return wrap;
}

// Auto Adjust Webpage Size
function adjustViewportSize() {
    const Screen_Width = document.documentElement.clientWidth;
    const Screen_Height = document.documentElement.clientHeight;

    document.documentElement.style.setProperty('--WIDTH', `${Screen_Width}px`);
    document.documentElement.style.setProperty('--HEIGHT', `${Screen_Height}px`);
}

document.addEventListener('DOMContentLoaded', adjustViewportSize);
document.addEventListener('DOMContentLoaded', initCVEReferences);
window.addEventListener('resize', adjustViewportSize);
window.addEventListener('orientationchange', () => {setTimeout(adjustViewportSize, 100);});
window.addEventListener('load', () => {
    if (!document.getElementById('cveShowBtn').onclick) {
        initCVEReferences();
    }
});
/* ---------------------------------------- */

