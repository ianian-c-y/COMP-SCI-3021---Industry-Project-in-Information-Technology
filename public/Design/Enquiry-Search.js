const Main = document.querySelector('main');
const body = document.querySelector('body');
const Wait_Time = 5000
// const Wait_Time = 1
// let loadingElement = null;
let CVE_Result = null;
const Result_Area = document.getElementById('Result_Area');
let Case_ID = document.getElementById('CVE-ID-Number');
const loadingElement = document.createElement('div');
let is_loadingElement_Exist = document.getElementById('Loading');
// const Loading_Style_Set = new Set();
// Loading_Style_Set.add(`<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" /></rect><rect x="10" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"/></rect><rect x="20" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" /></rect></svg>`)
const Loading_Style_Set = new Map()
Loading_Style_Set.set(1, `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" /></rect><rect x="10" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"/></rect><rect x="20" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" /></rect></svg>`);
Loading_Style_Set.set(2, `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg>`)
Loading_Style_Set.set(3, `<svg class="loading-spinner" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.1921" height="19.9316"><g><rect height="19.9316" opacity="0" width="24.1921" x="0" y="0"></rect><path d="M11.9154 0C8.98569 0 6.32944 1.26953 4.50327 3.31055C4.10288 3.75 4.2396 4.32617 4.61069 4.58008C4.92319 4.81445 5.34311 4.83398 5.75327 4.39453C7.27671 2.70508 9.47397 1.66016 11.9154 1.66016C15.9486 1.66016 19.2982 4.53125 20.0306 8.33984L18.6537 8.33984C17.9603 8.33984 17.7845 8.80859 18.1556 9.3457L20.3431 12.4609C20.6556 12.9102 21.1244 12.9199 21.4466 12.4609L23.6341 9.35547C24.015 8.80859 23.8294 8.33984 23.1361 8.33984L21.7298 8.33984C20.9681 3.61328 16.8568 0 11.9154 0ZM11.9154 19.9219C14.8451 19.9219 17.5013 18.6523 19.3275 16.6113C19.7279 16.1621 19.5912 15.5957 19.2201 15.332C18.9076 15.1074 18.4876 15.0879 18.0775 15.5176C16.5541 17.207 14.3568 18.2617 11.9154 18.2617C7.88218 18.2617 4.53257 15.3906 3.80015 11.582L5.1771 11.582C5.87046 11.582 6.04624 11.1035 5.67515 10.5762L3.48765 7.45117C3.17515 7.01172 2.7064 7.00195 2.38413 7.45117L0.19663 10.5664C-0.184229 11.1035-0.00844799 11.582 0.694677 11.582L2.10093 11.582C2.86265 16.3086 6.97397 19.9219 11.9154 19.9219Z" fill="black" fill-opacity="0.85"></path></g></svg>`)
Loading_Style_Set.set(4, `<div id="load"><div>G</div><div>N</div><div>I</div><div>D</div><div>A</div><div>O</div><div>L</div></div><style>
        #load {
            position:absolute;
            width:600px;
            height:36px;
            left:50%;
            top:40%;
            margin-left:-300px;
            overflow:visible;
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            cursor:default;
            }
        #load div {
            position:absolute;
            width:20px;
            height:36px;
            opacity:0;
            font-family:Helvetica, Arial, sans-serif;
            animation:move 2s linear infinite;
            -o-animation:move 2s linear infinite;
            -moz-animation:move 2s linear infinite;
            -webkit-animation:move 2s linear infinite;
            transform:rotate(180deg);
            -o-transform:rotate(180deg);
            -moz-transform:rotate(180deg);
            -webkit-transform:rotate(180deg);
            color:#35C4F0;
            }
        #load div:nth-child(2) {
            animation-delay:0.2s;
            -o-animation-delay:0.2s;
            -moz-animation-delay:0.2s;
            -webkit-animation-delay:0.2s;
            }
        #load div:nth-child(3) {
            animation-delay:0.4s;
            -o-animation-delay:0.4s;
            -webkit-animation-delay:0.4s;
            -webkit-animation-delay:0.4s;
            }
        #load div:nth-child(4) {
            animation-delay:0.6s;
            -o-animation-delay:0.6s;
            -moz-animation-delay:0.6s;
            -webkit-animation-delay:0.6s;
            }
        #load div:nth-child(5) {
            animation-delay:0.8s;
            -o-animation-delay:0.8s;
            -moz-animation-delay:0.8s;
            -webkit-animation-delay:0.8s;
            }
        #load div:nth-child(6) {
            animation-delay:1s;
            -o-animation-delay:1s;
            -moz-animation-delay:1s;
            -webkit-animation-delay:1s;
            }
        #load div:nth-child(7) {
            animation-delay:1.2s;
            -o-animation-delay:1.2s;
            -moz-animation-delay:1.2s;
            -webkit-animation-delay:1.2s;
            }
        @keyframes move {
            0% {
                left:0;
                opacity:0;
                }
            35% {
                left: 41%;
                -moz-transform:rotate(0deg);
                -webkit-transform:rotate(0deg);
                -o-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            65% {
                left:59%;
                -moz-transform:rotate(0deg);
                -webkit-transform:rotate(0deg);
                -o-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            100% {
                left:100%;
                -moz-transform:rotate(-180deg);
                -webkit-transform:rotate(-180deg);
                -o-transform:rotate(-180deg);
                transform:rotate(-180deg);
                opacity:0;
                }
            }
        @-moz-keyframes move {
            0% {
                left:0;
                opacity:0;
                }
            35% {
                left:41%;
                -moz-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            65% {
                left:59%;
                -moz-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            100% {
                left:100%;
                -moz-transform:rotate(-180deg);
                transform:rotate(-180deg);
                opacity:0;
                }
            }
        @-webkit-keyframes move {
            0% {
                left:0;
                opacity:0;
                }
            35% {
                left:41%;
                -webkit-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            65% {
                left:59%;
                -webkit-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            100% {
                left:100%;
                -webkit-transform:rotate(-180deg);
                transform:rotate(-180deg);
                opacity:0;
                }
            }
        @-o-keyframes move {
            0% {
                left:0;
                opacity:0;
                }
            35% {
                left:41%;
                -o-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            65% {
                left:59%;
                -o-transform:rotate(0deg);
                transform:rotate(0deg);
                opacity:1;
                }
            100% {
                left:100%;
                -o-transform:rotate(-180deg);
                transform:rotate(-180deg);
                opacity:0;
                }
            }
    </style>`)
Loading_Style_Set.set(5, `<div class="loader"><div class="loader-inner"><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div></div></div><style>
                .loader {
                    background: #000;
                    background: radial-gradient(#222, #000);
                    bottom: 0;
                    left: 0;
                    overflow: hidden;
                    /* position: fixed; */
                    right: 0;
                    top: 0;
                    z-index: 99999;
                    }
                .loader-inner {
                    bottom: 0;
                    height: 25px;
                    left: 0;
                    margin: auto;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 50px;
                    }
                .loader-line-wrap {
                    animation:
                        spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
                ;
                    box-sizing: border-box;
                    height: 50px;
                    left: 0;
                    overflow: hidden;
                    position: absolute;
                    top: 0;
                    transform-origin: 50% 100%;
                    width: 100px;
                    }
                .loader-line {
                    border: 4px solid transparent;
                    border-radius: 100%;
                    box-sizing: border-box;
                    height: 100px;
                    left: 0;
                    margin: 0 auto;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 100px;
                    }
                .loader-line-wrap:nth-child(1) { animation-delay: -50ms; }
                .loader-line-wrap:nth-child(2) { animation-delay: -100ms; }
                .loader-line-wrap:nth-child(3) { animation-delay: -150ms; }
                .loader-line-wrap:nth-child(4) { animation-delay: -200ms; }
                .loader-line-wrap:nth-child(5) { animation-delay: -250ms; }
                .loader-line-wrap:nth-child(1) .loader-line {
                    border-color: hsl(0, 80%, 60%);
                    height: 90px;
                    width: 90px;
                    top: 7px;
                    }
                .loader-line-wrap:nth-child(2) .loader-line {
                    border-color: hsl(60, 80%, 60%);
                    height: 76px;
                    width: 76px;
                    top: 14px;
                    }
                .loader-line-wrap:nth-child(3) .loader-line {
                    border-color: hsl(120, 80%, 60%);
                    height: 62px;
                    width: 62px;
                    top: 21px;
                    }
                .loader-line-wrap:nth-child(4) .loader-line {
                    border-color: hsl(180, 80%, 60%);
                    height: 48px;
                    width: 48px;
                    top: 28px;
                    }
                .loader-line-wrap:nth-child(5) .loader-line {
                    border-color: hsl(240, 80%, 60%);
                    height: 34px;
                    width: 34px;
                    top: 35px;
                    }
                @keyframes spin {
                    0%, 15% {
                        transform: rotate(0);
                        }
                    100% {
                        transform: rotate(360deg);
                        }
                    }
            </style>`)
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
    if (resultElement) {resultElement.textContent = '完整值：' + code;}
}
async function loading() {
    console.log('loading')
    if (is_loadingElement_Exist) {is_loadingElement_Exist.remove();}
    loadingElement.id = 'Loading'
    // loadingElement.innerHTML = Loading_Style_Set.get(6)
    loadingElement.innerHTML = Loading_Style_Set.get(Math.ceil(Math.random() * Loading_Style_Set.size))
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
                    <div class="cve_content">
                        ${create_score_section(result)}
                        ${create_info_grid(result)}
                        ${create_description_section(result)}
                    </div>
                    
                `;
    }
    Result_Area.appendChild(Result_Container)
    console.log(result)
}
async function Search() {
    loading()
    // let results = await search_CVE_DB();
    // setTimeout(() => {search_results_display(results)}, Wait_Time);
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