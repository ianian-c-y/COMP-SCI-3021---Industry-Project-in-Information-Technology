const Main = document.querySelector('main');
const body = document.querySelector('body');
const Wait_Time = 5000
// const Wait_Time = 1
let loadingElement = null;
let CVE_Result = null;
const Result_Area = document.getElementById('Result_Area');
let Case_ID = document.getElementById('CVE-ID-Number');
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
    if (resultElement) {resultElement.textContent = '完整值：' + code;}
}
async function loading() {
    console.log('loading')
    const loadingElement = document.createElement('div');
    loadingElement.id = 'Loading'
    loadingElement.innerHTML = `<svg class="loading-spinner" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.1921" height="19.9316"><g><rect height="19.9316" opacity="0" width="24.1921" x="0" y="0"></rect><path d="M11.9154 0C8.98569 0 6.32944 1.26953 4.50327 3.31055C4.10288 3.75 4.2396 4.32617 4.61069 4.58008C4.92319 4.81445 5.34311 4.83398 5.75327 4.39453C7.27671 2.70508 9.47397 1.66016 11.9154 1.66016C15.9486 1.66016 19.2982 4.53125 20.0306 8.33984L18.6537 8.33984C17.9603 8.33984 17.7845 8.80859 18.1556 9.3457L20.3431 12.4609C20.6556 12.9102 21.1244 12.9199 21.4466 12.4609L23.6341 9.35547C24.015 8.80859 23.8294 8.33984 23.1361 8.33984L21.7298 8.33984C20.9681 3.61328 16.8568 0 11.9154 0ZM11.9154 19.9219C14.8451 19.9219 17.5013 18.6523 19.3275 16.6113C19.7279 16.1621 19.5912 15.5957 19.2201 15.332C18.9076 15.1074 18.4876 15.0879 18.0775 15.5176C16.5541 17.207 14.3568 18.2617 11.9154 18.2617C7.88218 18.2617 4.53257 15.3906 3.80015 11.582L5.1771 11.582C5.87046 11.582 6.04624 11.1035 5.67515 10.5762L3.48765 7.45117C3.17515 7.01172 2.7064 7.00195 2.38413 7.45117L0.19663 10.5664C-0.184229 11.1035-0.00844799 11.582 0.694677 11.582L2.10093 11.582C2.86265 16.3086 6.97397 19.9219 11.9154 19.9219Z" fill="black" fill-opacity="0.85"></path></g></svg>`
    Result_Area.appendChild(loadingElement);
    setTimeout(() => {loadingElement.remove()}, Wait_Time);
}
async function search_CVE_DB() {
    let cveNumber = Case_ID.value.trim();
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
function search_results_display(result=null) {
    const Result_Container = document.createElement('div');
    Result_Container.id = 'Result_Container'
    if (!result) {Result_Container.innerHTML = `<div class="error_message">Unable to find relevant information</div>`;}
    else {
        Result_Container.innerHTML = `
                    <div class="cve_header">
                        <h1 class="cve_id">${result.cve_id}</h1>
                        <span class="cve_status">${result.vuln_status}</span>
                    </div>
                `;
        console.log(result)
    }
    Result_Area.appendChild(Result_Container)
    console.log(result)
}
async function Search() {
    loading()
    let results = await search_CVE_DB();
    setTimeout(() => {
        search_results_display(results)
    }, Wait_Time);
}
/* ---------------------------------------- */
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
/* ---------------------------------------- */
document.addEventListener('DOMContentLoaded', async function() {
    console.log('所有 Cookie:', document.cookie);
    update_preview('CVE-2024-1202')
});