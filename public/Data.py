import json
import pandas as pd
import numpy as np
from datetime import datetime

# 讀取 JSON 檔案
print("📖 讀取 JSON 檔案...")
with open("nvdcve-2.0-2024.json", 'r') as f:
    data = json.load(f)

# 抽取 vulnerabilities array
vulnerabilities = data.get('vulnerabilities', [])
print(f"📊 搵到 {len(vulnerabilities)} 個 CVE 記錄")

# 準備儲存數據嘅 list
cve_records = []

# 處理每個 CVE
for vuln in vulnerabilities:
    cve = vuln.get('cve', {})

    # 抽取基本資料
    cve_id = cve.get('id', '')
    published = cve.get('published', '')
    last_modified = cve.get('lastModified', '')
    vuln_status = cve.get('vulnStatus', '')

    # 抽取描述（通常用英文）
    descriptions = cve.get('descriptions', [])
    description = ''
    for desc in descriptions:
        if desc.get('lang') == 'en':
            description = desc.get('value', '')[:1000]  # 限制長度
            break

    # 抽取 CVSS 分數（優先用 v3.1, 然後 v3.0, 最後 v2.0）
    metrics = cve.get('metrics', {})
    cvss_score = 0.0
    severity = 'NONE'
    cvss_version = ''

    # 檢查 CVSS v3.1
    if 'cvssMetricV31' in metrics and metrics['cvssMetricV31']:
        metric = metrics['cvssMetricV31'][0]
        cvss_score = metric.get('cvssData', {}).get('baseScore', 0.0)
        severity = metric.get('cvssData', {}).get('baseSeverity', 'NONE')
        cvss_version = 'v3.1'
    # 檢查 CVSS v3.0
    elif 'cvssMetricV30' in metrics and metrics['cvssMetricV30']:
        metric = metrics['cvssMetricV30'][0]
        cvss_score = metric.get('cvssData', {}).get('baseScore', 0.0)
        severity = metric.get('cvssData', {}).get('baseSeverity', 'NONE')
        cvss_version = 'v3.0'
    # 檢查 CVSS v2.0
    elif 'cvssMetricV2' in metrics and metrics['cvssMetricV2']:
        metric = metrics['cvssMetricV2'][0]
        cvss_score = metric.get('cvssData', {}).get('baseScore', 0.0)
        severity = metric.get('baseSeverity', 'NONE')
        cvss_version = 'v2.0'

    # 抽取受影響嘅產品/供應商
    configurations = cve.get('configurations', [])
    vendors = set()
    products = set()

    for config in configurations:
        nodes = config.get('nodes', [])
        for node in nodes:
            cpe_matches = node.get('cpeMatch', [])
            for cpe in cpe_matches:
                criteria = cpe.get('criteria', '')
                # CPE 格式: cpe:2.3:a:vendor:product:version:...
                parts = criteria.split(':')
                if len(parts) >= 5:
                    if parts[3]:  # vendor
                        vendors.add(parts[3])
                    if parts[4]:  # product
                        products.add(parts[4])

    # 抽取參考連結數量
    references = cve.get('references', [])
    ref_count = len(references)

    # 將數據加入 list
    cve_records.append({
        'cve_id'         : cve_id,
        'published_date' : published[:10] if published else '',  # 只保留日期部分
        'last_modified'  : last_modified[:10] if last_modified else '',
        'vuln_status'    : vuln_status,
        'description'    : description.replace('\n', ' ').replace('\r', ''),  # 移除換行
        'cvss_score'     : cvss_score,
        'severity'       : severity,
        'cvss_version'   : cvss_version,
        'vendors'        : ', '.join(list(vendors)[:5]),  # 限制最多 5 個
        'products'       : ', '.join(list(products)[:5]),
        'reference_count': ref_count
    })

# 轉換成 DataFrame
print("🔄 轉換成 DataFrame...")
df = pd.DataFrame(cve_records)

# 資料統計
print("\n📈 資料統計:")
print(f"總記錄數: {len(df)}")
print(f"有效 CVE (非 Rejected): {len(df[df['vuln_status'] != 'Rejected'])}")
print(f"高危漏洞 (CRITICAL): {len(df[df['severity'] == 'CRITICAL'])}")
print(f"高分漏洞 (>9.0): {len(df[df['cvss_score'] >= 9.0])}")

# 排序（按發佈日期，最新嘅排前面）
df = df.sort_values('published_date', ascending=False)

# 導出 CSV
output_file = 'cve_2024_clean.csv'
df.to_csv(output_file, index=False, encoding='utf-8')
print(f"\n✅ 已導出到 {output_file}")

# 額外：導出高危漏洞
critical_df = df[df['cvss_score'] >= 7.0].copy()
critical_df.to_csv('cve_2024_critical.csv'  , index=False, encoding='utf-8')
print(f"✅ 高危漏洞已導出到 cve_2024_critical.csv ({len(critical_df)} 條)")

# 顯示前 5 條記錄
print("\n📋 前 5 條記錄:")
print(df[['cve_id', 'cvss_score', 'severity', 'published_date']].head())
