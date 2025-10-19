const Main = document.querySelector('main');
const body = document.querySelector('body');
// const Wait_Time = 5000
const Wait_Time = 1
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
    if (resultElement) {resultElement.textContent = 'ID:：' + code;}
}
async function loading() {
    console.log('loading')
    if (loadingTimeout) {clearTimeout(loadingTimeout);}
    if (is_loadingElement_Exist) {is_loadingElement_Exist.remove();}
    loadingElement.id = 'Loading'
    loadingElement.style.maxWidth = "fit-content"
    loadingElement.style.justifySelf = "center"
    // loadingElement.innerHTML = Loading_Style_Set.get(1)
    loadingElement.innerHTML = Loading_Style_Set.get(Math.ceil(Math.random() * Loading_Style_Set.size))
    Result_Area.appendChild(loadingElement);
    loadingTimeout = setTimeout(() => {
        if (loadingElement && loadingElement.parentNode) { loadingElement.remove();}
        loadingTimeout = null;
    }, Wait_Time);
}
async function search_CVE_DB(value=null) {
    let cveNumber = Case_ID.value.trim();
    if (value) {cveNumber = value}

    let CVE_Result = null;
    if (!cveNumber) {return;}
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
        const response = await fetch('../HTML/CVE-Results.html');
        return await response.text();
    } catch (error) {
        console.error('載入 CVE 模板失敗:', error);
        return null;
    }
}
function createSVGGauge(score) {
    const getScoreColor = (s) => {
        if (s >= 9.0) return '#dc3545';
        if (s >= 7.0) return '#fd7e14';
        if (s >= 4.0) return '#ffc107';
        if (s > 0) return '#28a745';
        return '#6c757d';
    };

    const color = getScoreColor(score);
    const percentage = (score / 10) * 100;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDasharray = (percentage / 100) * circumference;

    return `
        <svg viewBox="0 0 120 120" class="gauge-svg">
            <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color}" stop-opacity="0.7" />
                    <stop offset="100%" stop-color="${color}" stop-opacity="1" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="45" stroke="#e9ecef" stroke-width="12" fill="none"/>
            <circle cx="60" cy="60" r="45" 
                stroke="url(#gaugeGradient)"
                stroke-width="12" 
                fill="none"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                transform="rotate(-90 60 60)">
                <animate attributeName="stroke-dashoffset" from="${circumference}" to="${circumference - strokeDasharray}" dur="1.5s" fill="freeze" begin="0.2s" calcMode="spline" keyTimes="0; 1" keySplines="0.25 1 0.5 1"/>
            </circle>
            <text x="60" y="65" text-anchor="middle" font-size="24" font-weight="bold" fill="${color}">${score}</text>
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
    const formatDate = (dateStr) => {return new Date(dateStr).toLocaleDateString('en-AU', {weekday: "long", year: 'numeric', month: 'long', day: 'numeric'});};
    const formatDate_Short = (dateStr) => {return new Date(dateStr).toLocaleDateString('en-AU');};
    const getSeverityClass = (severity) => {return severity.toLowerCase();};
    const getStatusClass = (status) => {
        if (status.includes('Analyzed')) return 'analyzed';
        if (status.includes('Awaiting')) return 'awaiting';
        if (status.includes('Rejected')) return 'rejected';
        return '';
    };
    const cvss_graph = createSVGGauge(score=result.cvss_score)
    const threatLevels = { 'Critical': 'high', 'High': 'high', 'Medium': 'medium', 'Low': 'low' };
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

        slice.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transformOrigin = '100px 100px';
        });
        slice.addEventListener('mouseleave', function() {
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
        { label: 'CVSS', value: scores.cvss || 0 },
        { label: 'Exploitability', value: scores.exploitability || 0 },
        { label: 'Impact', value: scores.impact || 0 },
        { label: 'Trending', value: (scores.trending || 0) / 10 },
        { label: 'Complexity', value: 10 - (scores.complexity || 5) } // Invert complexity: low complexity = high score
    ];
    const svg_size = 750
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${svg_size} ${svg_size}`);

    // Add definitions for gradient and filter
    svg.innerHTML = `
        <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="rgba(220, 53, 69, 0.4)" />
                <stop offset="100%" stop-color="rgba(220, 53, 69, 0.1)" />
            </radialGradient>
            <filter id="glow">
                <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#dc3545" />
            </filter>
        </defs>
    `;

    const centerX = svg_size/2;
    const centerY = svg_size/2;
    const maxRadius = svg_size*0.3;
    const angleStep = (Math.PI * 2) / dimensions.length;

    // Draw background grid
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
        polygon.setAttribute('stroke', '#ccc');
        polygon.setAttribute('stroke-width', i === 5 ? '1.5' : '0.5');
        svg.appendChild(polygon);
    }

    // Draw axis lines and labels
    dimensions.forEach((dim, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x2 = centerX + maxRadius * Math.cos(angle);
        const y2 = centerY + maxRadius * Math.sin(angle);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX); line.setAttribute('y1', centerY);
        line.setAttribute('x2', x2); line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#ddd'); svg.appendChild(line);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', centerX + (maxRadius + 15) * Math.cos(angle));
        text.setAttribute('y', centerY + (maxRadius + 15) * Math.sin(angle));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', 'xx-large');
        text.setAttribute('fill', '#333');
        text.classList = "Radar-Chart-Text"
        text.textContent = dim.label; svg.appendChild(text);
    });

    // Draw data polygon
    const dataPoints = dimensions.map((dim, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (dim.value / 10) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return {x, y};
    });

    const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataPolygon.setAttribute('points', dataPoints.map(p => `${p.x},${p.y}`).join(' '));
    dataPolygon.setAttribute('fill', 'url(#radarGradient)');
    dataPolygon.setAttribute('stroke', '#dc3545');
    dataPolygon.setAttribute('stroke-width', '2');
    dataPolygon.style.filter = 'url(#glow)';
    svg.appendChild(dataPolygon);

    // Draw data points
    dataPoints.forEach(p => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y);
        circle.setAttribute('r', '4'); circle.setAttribute('fill', '#dc3545');
        circle.setAttribute('stroke', 'white'); circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);
    });

    chart.innerHTML = '';
    chart.appendChild(svg);
}

function initCVETimeline(publishedDate, modifiedDate) {
    const timeline = document.getElementById('cveTimeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    const pubMonth = new Date(publishedDate).getMonth() + 1;
    const modMonth = new Date(modifiedDate).getMonth() + 1;
    const Mouth_Names = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    };

    for (let i = 1; i <= 12; i++) {
        const li = document.createElement('li');
        li.setAttribute('data-month', i);

        const month = document.createElement('div');
        month.className = 'month Time-line-mouth';
        // month.textContent = i + '';
        month.textContent = Mouth_Names[i];
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
    if (is_Result_Container_Exist) {is_Result_Container_Exist.remove();}
    const Result_Container = document.createElement('div');
    Result_Container.id = 'Result_Container';
    if (!result) {Result_Container.innerHTML = `<div class="error_message">Cannot find relevant information</div>`;} else {
        displayReferences(result);
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
            }, 100);
            setTimeout(() => {
                initCVETimeline(result.published_date, result.last_modified);

                // 初始化新的視覺化
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
        } else {Result_Container.innerHTML = `<div class="error_message">Cannot find relevant information</div>`;}
    }
    Result_Area.appendChild(Result_Container);
    console.log(result);
}
async function Search() {
    const is_Result_Container_Exist = document.getElementById('Result_Container');
    if (is_Result_Container_Exist) {is_Result_Container_Exist.remove();}
    loading()
    try {
        let results = await search_CVE_DB();
        console.log(results);
        setTimeout(async () => {
            if (loadingElement && loadingElement.parentNode) {loadingElement.remove();}
            await search_results_display(results);
        }, Wait_Time);
    } catch (error) {if (loadingElement && loadingElement.parentNode) {loadingElement.remove();}}
}
// 顯示參考文獻
function displayReferences_(result) {
    const refWindow = document.getElementById('ref-Window');
    if (!refWindow || !result) return;

    const cveId = result.cve_id;
    const cveNumber = cveId.replace('CVE-2024-', '');
    const cweId = result.cwe_id || 'N/A';

    const references = `
        <div class="ref-content">
            <h4>Reference Resource:</h4>
            <div class="ref-item">
                <span class="ref-number">[1]</span>
                <div class="ref-details">
                    <div class="ref-title">NVD - General</div>
                    <a href="https://nvd.nist.gov/vuln/detail/${cveId}" target="_blank">
                        https://nvd.nist.gov/vuln/detail/${cveId}
                    </a>
                </div>
            </div>
            <div class="ref-item">
                <span class="ref-number">[2]</span>
                <div class="ref-details">
                    <div class="ref-title">${cveId} - Vendor Information</div>
                    <a href="https://vuldb.com/?id.${cveNumber}" target="_blank">
                        https://vuldb.com/?id.${cveNumber}
                    </a>
                </div>
            </div>
            ${cweId !== 'N/A' ? `
            <div class="ref-item">
                <span class="ref-number">[3]</span>
                <div class="ref-details">
                    <div class="ref-title">${cweId} - Common Weakness Enumeration</div>
                    <a href="https://cwe.mitre.org/data/definitions/${cweId.replace('CWE-', '')}.html" target="_blank">
                        https://cwe.mitre.org/data/definitions/${cweId.replace('CWE-', '')}.html
                    </a>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    refWindow.innerHTML = references;
}
/* ======================================== */
let currentCVEData = null;
let cveChatHistory = [];
function displayReferences(result) {
    const refWindow = document.getElementById('ref-Window');
    if (!refWindow || !result) return;

    const cveId = result.cve_id;
    const cveNumber = cveId.replace('CVE-2024-', '');
    const cweId = result.cwe_id || 'N/A';

    const references = `
        <div class="cve-references-section">
            <h4>Reference Resources:</h4>
            <div class="ref-item">
                <span class="ref-number">[1]</span>
                <div class="ref-details">
                    <div class="ref-title">NVD - General</div>
                    <a href="https://nvd.nist.gov/vuln/detail/${cveId}" target="_blank">
                        https://nvd.nist.gov/vuln/detail/${cveId}
                    </a>
                </div>
            </div>
            <div class="ref-item">
                <span class="ref-number">[2]</span>
                <div class="ref-details">
                    <div class="ref-title">${cveId} - Vendor Information</div>
                    <a href="https://vuldb.com/?id.${cveNumber}" target="_blank">
                        https://vuldb.com/?id.${cveNumber}
                    </a>
                </div>
            </div>
            ${cweId !== 'N/A' ? `
            <div class="ref-item">
                <span class="ref-number">[3]</span>
                <div class="ref-details">
                    <div class="ref-title">${cweId} - Common Weakness Enumeration</div>
                    <a href="https://cwe.mitre.org/data/definitions/${cweId.replace('CWE-', '')}.html" target="_blank">
                        https://cwe.mitre.org/data/definitions/${cweId.replace('CWE-', '')}.html
                    </a>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    const refSection = refWindow.querySelector('.cve-references-section');
    if (refSection) {
        refSection.innerHTML = references;
    }

    // Add initial system message
    appendCVEMessage('system', `I can help you analyze ${cveId}. Ask me anything about this vulnerability!`);
}
async function sendCVEMessage() {
    const input = document.getElementById('cve-chat-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to chat
    appendCVEMessage('user', message);
    input.value = '';

    // Add loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.className = 'cve-message cve-loading';
    loadingElement.textContent = 'Claude is thinking...';
    document.getElementById('cve-chatbox').appendChild(loadingElement);

    try {
        // Prepare context with CVE data
        const contextMessage = currentCVEData ?
            `Context: Discussing ${currentCVEData.cve_id}${currentCVEData.description ? ` - ${currentCVEData.description}` : ''}` : '';

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: contextMessage + '\n\nUser question: ' + message,
                role: 'Default',
                chatroomId: null, // No chatroom storage
                model: 'claude-3-5-sonnet-20240620',
                temporary: true // Flag for temporary chat
            })
        });

        if (!response.ok) {
            throw new Error('Server error: ' + response.status);
        }

        const data = await response.json();

        // Remove loading indicator
        loadingElement.remove();

        // Add Claude's response
        appendCVEMessage('claude', data.response);

    } catch (error) {
        console.error('CVE Chat Error:', error);
        loadingElement.remove();
        appendCVEMessage('system', 'Error: Could not get response. Please try again.');
    }
}
function appendCVEMessage(sender, message) {
    const chatbox = document.getElementById('cve-chatbox');
    const messageElement = document.createElement('div');
    messageElement.className = `cve-message cve-${sender}-message`;

    const bubbleElement = document.createElement('div');
    bubbleElement.className = 'cve-message-bubble';

    if (sender === 'user') {
        bubbleElement.innerHTML = marked.parse(message);
    } else {
        // Typewriter effect for Claude/system messages
        typeWriterCVE(message, bubbleElement);
    }

    messageElement.appendChild(bubbleElement);

    // Add copy button for Claude messages
    if (sender === 'claude') {
        const copyButton = document.createElement('button');
        copyButton.className = 'cve-copy-button';
        copyButton.onclick = function() {
            navigator.clipboard.writeText(message).then(() => {
                copyButton.classList.add('copied');
                setTimeout(() => copyButton.classList.remove('copied'), 2000);
            });
        };
        messageElement.appendChild(copyButton);
    }

    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;

    // Store in history
    cveChatHistory.push({ sender, message, timestamp: Date.now() });
}
function typeWriterCVE(text, element, index = 0) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        document.getElementById('cve-chatbox').scrollTop =
            document.getElementById('cve-chatbox').scrollHeight;
        setTimeout(() => typeWriterCVE(text, element, index + 1), 10);
    } else {
        element.innerHTML = marked.parse(text);
        element.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const cveInput = document.getElementById('cve-chat-input');
    if (cveInput) {
        cveInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                sendCVEMessage();
            }
        });
    }
});

/* ======================================== */

// ---------------------------------------- */
if (Case_ID) {
    Case_ID.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        update_preview('CVE-2024-' + this.value);
    });
    Case_ID.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            Search()
        }
    });
}
// ---------------------------------------- */
document.addEventListener('DOMContentLoaded', async function() {
    console.log('所有 Cookie:', document.cookie);
    update_preview('CVE-2024-1000')
    let results = await search_CVE_DB(value=1001);
    await search_results_display(results);
});
// ---------------------------------------- */
// Auto Adjust Webpage Size
function adjustViewportSize() {
    const Screen_Width = document.documentElement.clientWidth;
    const Screen_Height = document.documentElement.clientHeight;

    document.documentElement.style.setProperty('--WIDTH', `${Screen_Width}px`);
    document.documentElement.style.setProperty('--HEIGHT', `${Screen_Height}px`);
}
document.addEventListener('DOMContentLoaded', adjustViewportSize);
window.addEventListener('resize', adjustViewportSize);
window.addEventListener('orientationchange', () => {setTimeout(adjustViewportSize, 100);});
// 切換參考資料窗口
document.addEventListener('DOMContentLoaded', function() {
    const refButton = document.getElementById('Ref');
    const refWindow = document.getElementById('ref-Window');

    if (refButton && refWindow) {
        refButton.addEventListener('click', function(e) {
            e.stopPropagation();
            refWindow.classList.toggle('ref-Window-Active');
        });

        // 點擊窗口外部關閉
        document.addEventListener('click', function(e) {
            if (!refWindow.contains(e.target) && !refButton.contains(e.target)) {
                refWindow.classList.remove('ref-Window-Active');
            }
        });
    }
});
/* ---------------------------------------- */