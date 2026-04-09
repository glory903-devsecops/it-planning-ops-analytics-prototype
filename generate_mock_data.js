const fs = require('fs');
const path = require('path');

const NUM_RECORDS = 100;
const STORE_PREFIXES = ['강남본점', '선릉역점', '역삼점', '종로점', '여의도점', '판교점', '분당점', '성수점', '홍대점', '신촌점'];
const ASSET_TYPES = ['POS결제단말기', '메인라우터', '배달앱Gateway', '키오스크', '재고연동서버'];
const STATUSES = ['성공', '성공', '성공', '실패']; // 25% failure
const ERRORS = {
  '성공': ['정상'],
  '실패': ['응답지연_Timeout', '인증실패_AuthFail', '데이터누락_SchemaError', 'DBConnectionError']
};
const CHANNELS = ['매장POS', '배달의민족', '요기요', '쿠팡이츠', '현장키오스크'];

// We need 100 UNIQUE asset names for the 100 events
function pad(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const data = [];
const usedAssetNames = new Set();

for (let i = 0; i < NUM_RECORDS; i++) {
  const isFailure = Math.random() < 0.35; // boost failure slightly for demo pie charts
  const status = isFailure ? '실패' : '성공';
  const errorOpts = ERRORS[status];
  const error = errorOpts[Math.floor(Math.random() * errorOpts.length)];
  const store = STORE_PREFIXES[Math.floor(Math.random() * STORE_PREFIXES.length)];
  const assetType = ASSET_TYPES[Math.floor(Math.random() * ASSET_TYPES.length)];
  const channel = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
  
  // Make completely unique asset name per event row
  const assetName = `${store}_${assetType}_${pad(i+1, 3)}`;
  
  // Add some latency logic based on success/fail
  let latency = 0;
  if (status === '성공') {
    latency = Math.floor(Math.random() * 500) + 100; // 100 ~ 600 ms
  } else {
    latency = error.includes('Timeout') ? Math.floor(Math.random() * 5000) + 2000 : Math.floor(Math.random() * 1000) + 200;
  }
  
  const timestamp = new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString().replace('T', ' ').substring(0, 23);
  const orderId = `ODR-${Math.floor(Math.random() * 90000) + 10000}`;
  const storeId = `S00${Math.floor(Math.random() * 90) + 10}`;

  data.push({
    timestamp,
    route: assetName, // This replaces "POS_TO_ERP", ensuring every event maps to a distinct asset string
    status,
    error_code: error,
    latency_ms: latency,
    store_id: storeId,
    channel,
    order_id: orderId
  });
}

data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

const tsContent = `export interface IntegrationEvent {
  timestamp: string;
  route: string;
  status: string;
  error_code: string;
  latency_ms: number;
  store_id: string;
  channel: string;
  order_id: string;
}

export const mockEvents: IntegrationEvent[] = ${JSON.stringify(data, null, 2)};
`;

const outputPath = path.join(__dirname, 'frontend/src/data/mock/events.ts');
fs.writeFileSync(outputPath, tsContent);
console.log('Successfully generated Korean localized unique events.ts');
