export interface IntegrationEvent {
  timestamp: string;
  route: string;
  status: string;
  error_code: string;
  latency_ms: number;
  store_id: string;
  channel: string;
  order_id: string;
}

export const mockEvents: IntegrationEvent[] = [
  {
    "timestamp": "2026-04-08 18:24:08.528",
    "route": "종로점_메인라우터_080",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 303,
    "store_id": "S0012",
    "channel": "쿠팡이츠",
    "order_id": "ODR-59998"
  },
  {
    "timestamp": "2026-04-08 18:23:45.607",
    "route": "종로점_재고연동서버_035",
    "status": "실패",
    "error_code": "데이터누락_SchemaError",
    "latency_ms": 335,
    "store_id": "S0076",
    "channel": "현장키오스크",
    "order_id": "ODR-57162"
  },
  {
    "timestamp": "2026-04-08 18:22:46.029",
    "route": "여의도점_키오스크_036",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 217,
    "store_id": "S0030",
    "channel": "쿠팡이츠",
    "order_id": "ODR-43177"
  },
  {
    "timestamp": "2026-04-08 18:22:13.428",
    "route": "성수점_재고연동서버_059",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 487,
    "store_id": "S0091",
    "channel": "요기요",
    "order_id": "ODR-22293"
  },
  {
    "timestamp": "2026-04-08 18:21:31.467",
    "route": "종로점_재고연동서버_012",
    "status": "실패",
    "error_code": "데이터누락_SchemaError",
    "latency_ms": 893,
    "store_id": "S0087",
    "channel": "요기요",
    "order_id": "ODR-28263"
  },
  {
    "timestamp": "2026-04-08 18:17:56.674",
    "route": "여의도점_재고연동서버_100",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 280,
    "store_id": "S0017",
    "channel": "매장POS",
    "order_id": "ODR-11152"
  },
  {
    "timestamp": "2026-04-08 18:17:02.758",
    "route": "선릉역점_POS결제단말기_021",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 322,
    "store_id": "S0039",
    "channel": "쿠팡이츠",
    "order_id": "ODR-41410"
  },
  {
    "timestamp": "2026-04-08 18:15:36.671",
    "route": "선릉역점_재고연동서버_044",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 128,
    "store_id": "S0075",
    "channel": "쿠팡이츠",
    "order_id": "ODR-21574"
  },
  {
    "timestamp": "2026-04-08 18:13:06.718",
    "route": "강남본점_키오스크_062",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 737,
    "store_id": "S0041",
    "channel": "요기요",
    "order_id": "ODR-32272"
  },
  {
    "timestamp": "2026-04-08 18:13:04.900",
    "route": "분당점_재고연동서버_088",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 1172,
    "store_id": "S0056",
    "channel": "쿠팡이츠",
    "order_id": "ODR-98741"
  },
  {
    "timestamp": "2026-04-08 18:12:59.376",
    "route": "강남본점_POS결제단말기_076",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 766,
    "store_id": "S0071",
    "channel": "현장키오스크",
    "order_id": "ODR-57078"
  },
  {
    "timestamp": "2026-04-08 18:12:52.092",
    "route": "분당점_배달앱Gateway_095",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 543,
    "store_id": "S0068",
    "channel": "요기요",
    "order_id": "ODR-41421"
  },
  {
    "timestamp": "2026-04-08 18:10:30.919",
    "route": "선릉역점_POS결제단말기_073",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 554,
    "store_id": "S0087",
    "channel": "매장POS",
    "order_id": "ODR-60759"
  },
  {
    "timestamp": "2026-04-08 18:10:08.487",
    "route": "성수점_POS결제단말기_034",
    "status": "실패",
    "error_code": "데이터누락_SchemaError",
    "latency_ms": 1114,
    "store_id": "S0032",
    "channel": "배달의민족",
    "order_id": "ODR-13311"
  },
  {
    "timestamp": "2026-04-08 18:08:26.032",
    "route": "역삼점_키오스크_074",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 520,
    "store_id": "S0077",
    "channel": "쿠팡이츠",
    "order_id": "ODR-34530"
  },
  {
    "timestamp": "2026-04-08 18:06:54.151",
    "route": "신촌점_재고연동서버_069",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 101,
    "store_id": "S0099",
    "channel": "요기요",
    "order_id": "ODR-64721"
  },
  {
    "timestamp": "2026-04-08 18:04:55.020",
    "route": "성수점_키오스크_039",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 344,
    "store_id": "S0063",
    "channel": "매장POS",
    "order_id": "ODR-48042"
  },
  {
    "timestamp": "2026-04-08 18:03:48.991",
    "route": "선릉역점_키오스크_089",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 449,
    "store_id": "S0025",
    "channel": "현장키오스크",
    "order_id": "ODR-79192"
  },
  {
    "timestamp": "2026-04-08 18:03:07.206",
    "route": "홍대점_재고연동서버_018",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 5403,
    "store_id": "S0035",
    "channel": "쿠팡이츠",
    "order_id": "ODR-32235"
  },
  {
    "timestamp": "2026-04-08 18:01:26.863",
    "route": "성수점_키오스크_070",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 599,
    "store_id": "S0089",
    "channel": "현장키오스크",
    "order_id": "ODR-67606"
  },
  {
    "timestamp": "2026-04-08 17:58:33.005",
    "route": "판교점_POS결제단말기_032",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 940,
    "store_id": "S0093",
    "channel": "매장POS",
    "order_id": "ODR-32434"
  },
  {
    "timestamp": "2026-04-08 17:57:37.271",
    "route": "종로점_메인라우터_071",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 920,
    "store_id": "S0062",
    "channel": "현장키오스크",
    "order_id": "ODR-38841"
  },
  {
    "timestamp": "2026-04-08 17:52:33.439",
    "route": "강남본점_키오스크_047",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 360,
    "store_id": "S0075",
    "channel": "매장POS",
    "order_id": "ODR-59812"
  },
  {
    "timestamp": "2026-04-08 17:50:42.846",
    "route": "종로점_메인라우터_024",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 4664,
    "store_id": "S0090",
    "channel": "요기요",
    "order_id": "ODR-20827"
  },
  {
    "timestamp": "2026-04-08 17:49:53.711",
    "route": "신촌점_배달앱Gateway_027",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 447,
    "store_id": "S0084",
    "channel": "배달의민족",
    "order_id": "ODR-78500"
  },
  {
    "timestamp": "2026-04-08 17:42:53.589",
    "route": "홍대점_POS결제단말기_005",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 279,
    "store_id": "S0064",
    "channel": "배달의민족",
    "order_id": "ODR-89871"
  },
  {
    "timestamp": "2026-04-08 17:40:28.798",
    "route": "분당점_재고연동서버_060",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 309,
    "store_id": "S0091",
    "channel": "매장POS",
    "order_id": "ODR-70052"
  },
  {
    "timestamp": "2026-04-08 17:36:54.286",
    "route": "신촌점_POS결제단말기_040",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 476,
    "store_id": "S0092",
    "channel": "배달의민족",
    "order_id": "ODR-66484"
  },
  {
    "timestamp": "2026-04-08 17:35:50.663",
    "route": "선릉역점_키오스크_026",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 478,
    "store_id": "S0011",
    "channel": "쿠팡이츠",
    "order_id": "ODR-46022"
  },
  {
    "timestamp": "2026-04-08 17:34:53.507",
    "route": "분당점_POS결제단말기_081",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 294,
    "store_id": "S0030",
    "channel": "쿠팡이츠",
    "order_id": "ODR-26912"
  },
  {
    "timestamp": "2026-04-08 17:32:36.438",
    "route": "강남본점_POS결제단말기_096",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 855,
    "store_id": "S0031",
    "channel": "매장POS",
    "order_id": "ODR-90248"
  },
  {
    "timestamp": "2026-04-08 17:31:28.021",
    "route": "신촌점_키오스크_087",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 212,
    "store_id": "S0045",
    "channel": "매장POS",
    "order_id": "ODR-50600"
  },
  {
    "timestamp": "2026-04-08 17:31:17.128",
    "route": "홍대점_배달앱Gateway_016",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 189,
    "store_id": "S0098",
    "channel": "배달의민족",
    "order_id": "ODR-89284"
  },
  {
    "timestamp": "2026-04-08 17:23:52.703",
    "route": "여의도점_재고연동서버_079",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 201,
    "store_id": "S0049",
    "channel": "매장POS",
    "order_id": "ODR-11512"
  },
  {
    "timestamp": "2026-04-08 17:21:40.049",
    "route": "분당점_배달앱Gateway_041",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 4680,
    "store_id": "S0073",
    "channel": "매장POS",
    "order_id": "ODR-43962"
  },
  {
    "timestamp": "2026-04-08 17:19:14.753",
    "route": "성수점_메인라우터_010",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 118,
    "store_id": "S0060",
    "channel": "요기요",
    "order_id": "ODR-14761"
  },
  {
    "timestamp": "2026-04-08 17:18:05.833",
    "route": "역삼점_POS결제단말기_030",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 397,
    "store_id": "S0067",
    "channel": "배달의민족",
    "order_id": "ODR-39337"
  },
  {
    "timestamp": "2026-04-08 17:14:18.165",
    "route": "판교점_메인라우터_097",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 304,
    "store_id": "S0070",
    "channel": "매장POS",
    "order_id": "ODR-89712"
  },
  {
    "timestamp": "2026-04-08 17:13:35.458",
    "route": "강남본점_배달앱Gateway_004",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 513,
    "store_id": "S0025",
    "channel": "요기요",
    "order_id": "ODR-81386"
  },
  {
    "timestamp": "2026-04-08 17:13:03.188",
    "route": "판교점_키오스크_072",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 164,
    "store_id": "S0014",
    "channel": "현장키오스크",
    "order_id": "ODR-25823"
  },
  {
    "timestamp": "2026-04-08 17:11:45.420",
    "route": "종로점_배달앱Gateway_065",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 352,
    "store_id": "S0052",
    "channel": "배달의민족",
    "order_id": "ODR-91090"
  },
  {
    "timestamp": "2026-04-08 17:09:16.828",
    "route": "선릉역점_POS결제단말기_068",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 1112,
    "store_id": "S0015",
    "channel": "요기요",
    "order_id": "ODR-18639"
  },
  {
    "timestamp": "2026-04-08 17:08:13.010",
    "route": "선릉역점_POS결제단말기_099",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 419,
    "store_id": "S0011",
    "channel": "매장POS",
    "order_id": "ODR-29135"
  },
  {
    "timestamp": "2026-04-08 17:06:51.288",
    "route": "신촌점_메인라우터_019",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 494,
    "store_id": "S0024",
    "channel": "매장POS",
    "order_id": "ODR-82640"
  },
  {
    "timestamp": "2026-04-08 17:06:23.421",
    "route": "종로점_POS결제단말기_045",
    "status": "실패",
    "error_code": "데이터누락_SchemaError",
    "latency_ms": 306,
    "store_id": "S0024",
    "channel": "쿠팡이츠",
    "order_id": "ODR-25915"
  },
  {
    "timestamp": "2026-04-08 17:06:06.741",
    "route": "홍대점_POS결제단말기_033",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 567,
    "store_id": "S0021",
    "channel": "현장키오스크",
    "order_id": "ODR-92406"
  },
  {
    "timestamp": "2026-04-08 17:05:14.858",
    "route": "역삼점_키오스크_092",
    "status": "실패",
    "error_code": "데이터누락_SchemaError",
    "latency_ms": 683,
    "store_id": "S0033",
    "channel": "쿠팡이츠",
    "order_id": "ODR-29178"
  },
  {
    "timestamp": "2026-04-08 17:01:50.507",
    "route": "홍대점_POS결제단말기_038",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 209,
    "store_id": "S0031",
    "channel": "쿠팡이츠",
    "order_id": "ODR-46931"
  },
  {
    "timestamp": "2026-04-08 16:58:15.649",
    "route": "홍대점_POS결제단말기_017",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 822,
    "store_id": "S0056",
    "channel": "쿠팡이츠",
    "order_id": "ODR-18524"
  },
  {
    "timestamp": "2026-04-08 16:58:09.347",
    "route": "여의도점_POS결제단말기_020",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 374,
    "store_id": "S0026",
    "channel": "요기요",
    "order_id": "ODR-68336"
  },
  {
    "timestamp": "2026-04-08 16:58:06.915",
    "route": "성수점_POS결제단말기_063",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 530,
    "store_id": "S0066",
    "channel": "요기요",
    "order_id": "ODR-92230"
  },
  {
    "timestamp": "2026-04-08 16:53:44.548",
    "route": "선릉역점_배달앱Gateway_057",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 592,
    "store_id": "S0057",
    "channel": "현장키오스크",
    "order_id": "ODR-87559"
  },
  {
    "timestamp": "2026-04-08 16:53:02.110",
    "route": "신촌점_키오스크_011",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 6496,
    "store_id": "S0018",
    "channel": "매장POS",
    "order_id": "ODR-50877"
  },
  {
    "timestamp": "2026-04-08 16:52:03.858",
    "route": "신촌점_재고연동서버_037",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 575,
    "store_id": "S0020",
    "channel": "쿠팡이츠",
    "order_id": "ODR-18793"
  },
  {
    "timestamp": "2026-04-08 16:51:51.624",
    "route": "강남본점_키오스크_082",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 114,
    "store_id": "S0068",
    "channel": "현장키오스크",
    "order_id": "ODR-51417"
  },
  {
    "timestamp": "2026-04-08 16:49:13.940",
    "route": "판교점_POS결제단말기_094",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 976,
    "store_id": "S0099",
    "channel": "배달의민족",
    "order_id": "ODR-64836"
  },
  {
    "timestamp": "2026-04-08 16:49:03.829",
    "route": "신촌점_키오스크_051",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 536,
    "store_id": "S0046",
    "channel": "매장POS",
    "order_id": "ODR-44495"
  },
  {
    "timestamp": "2026-04-08 16:48:36.100",
    "route": "판교점_키오스크_008",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 151,
    "store_id": "S0096",
    "channel": "현장키오스크",
    "order_id": "ODR-60184"
  },
  {
    "timestamp": "2026-04-08 16:46:00.327",
    "route": "여의도점_POS결제단말기_022",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 375,
    "store_id": "S0016",
    "channel": "쿠팡이츠",
    "order_id": "ODR-73580"
  },
  {
    "timestamp": "2026-04-08 16:44:39.826",
    "route": "선릉역점_배달앱Gateway_002",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 537,
    "store_id": "S0010",
    "channel": "배달의민족",
    "order_id": "ODR-47703"
  },
  {
    "timestamp": "2026-04-08 16:40:02.337",
    "route": "여의도점_키오스크_009",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 150,
    "store_id": "S0050",
    "channel": "매장POS",
    "order_id": "ODR-30321"
  },
  {
    "timestamp": "2026-04-08 16:38:09.669",
    "route": "역삼점_메인라우터_054",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 542,
    "store_id": "S0055",
    "channel": "요기요",
    "order_id": "ODR-35731"
  },
  {
    "timestamp": "2026-04-08 16:37:05.056",
    "route": "신촌점_배달앱Gateway_091",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 543,
    "store_id": "S0014",
    "channel": "쿠팡이츠",
    "order_id": "ODR-39998"
  },
  {
    "timestamp": "2026-04-08 16:36:47.966",
    "route": "성수점_배달앱Gateway_056",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 363,
    "store_id": "S0066",
    "channel": "배달의민족",
    "order_id": "ODR-57540"
  },
  {
    "timestamp": "2026-04-08 16:34:35.807",
    "route": "여의도점_재고연동서버_075",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 157,
    "store_id": "S0093",
    "channel": "현장키오스크",
    "order_id": "ODR-50891"
  },
  {
    "timestamp": "2026-04-08 16:31:45.827",
    "route": "강남본점_메인라우터_083",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 1036,
    "store_id": "S0057",
    "channel": "배달의민족",
    "order_id": "ODR-51167"
  },
  {
    "timestamp": "2026-04-08 16:30:00.846",
    "route": "성수점_메인라우터_090",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 380,
    "store_id": "S0044",
    "channel": "배달의민족",
    "order_id": "ODR-63510"
  },
  {
    "timestamp": "2026-04-08 16:29:48.525",
    "route": "판교점_메인라우터_013",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 566,
    "store_id": "S0077",
    "channel": "매장POS",
    "order_id": "ODR-13916"
  },
  {
    "timestamp": "2026-04-08 16:29:03.493",
    "route": "선릉역점_배달앱Gateway_042",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 504,
    "store_id": "S0018",
    "channel": "요기요",
    "order_id": "ODR-81544"
  },
  {
    "timestamp": "2026-04-08 16:28:55.985",
    "route": "종로점_재고연동서버_077",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 1107,
    "store_id": "S0026",
    "channel": "쿠팡이츠",
    "order_id": "ODR-47480"
  },
  {
    "timestamp": "2026-04-08 16:27:58.630",
    "route": "홍대점_재고연동서버_053",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 1055,
    "store_id": "S0036",
    "channel": "현장키오스크",
    "order_id": "ODR-32244"
  },
  {
    "timestamp": "2026-04-08 16:26:52.324",
    "route": "선릉역점_배달앱Gateway_052",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 240,
    "store_id": "S0075",
    "channel": "쿠팡이츠",
    "order_id": "ODR-39031"
  },
  {
    "timestamp": "2026-04-08 16:25:09.405",
    "route": "판교점_재고연동서버_078",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 225,
    "store_id": "S0042",
    "channel": "요기요",
    "order_id": "ODR-83971"
  },
  {
    "timestamp": "2026-04-08 16:24:16.311",
    "route": "성수점_POS결제단말기_086",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 241,
    "store_id": "S0020",
    "channel": "요기요",
    "order_id": "ODR-23185"
  },
  {
    "timestamp": "2026-04-08 16:23:18.702",
    "route": "여의도점_배달앱Gateway_064",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 342,
    "store_id": "S0097",
    "channel": "매장POS",
    "order_id": "ODR-58380"
  },
  {
    "timestamp": "2026-04-08 16:11:06.053",
    "route": "강남본점_배달앱Gateway_007",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 128,
    "store_id": "S0053",
    "channel": "매장POS",
    "order_id": "ODR-35625"
  },
  {
    "timestamp": "2026-04-08 16:10:57.776",
    "route": "강남본점_재고연동서버_098",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 6715,
    "store_id": "S0013",
    "channel": "배달의민족",
    "order_id": "ODR-91126"
  },
  {
    "timestamp": "2026-04-08 16:07:53.066",
    "route": "분당점_재고연동서버_050",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 246,
    "store_id": "S0062",
    "channel": "현장키오스크",
    "order_id": "ODR-41402"
  },
  {
    "timestamp": "2026-04-08 16:06:01.922",
    "route": "종로점_키오스크_061",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 235,
    "store_id": "S0016",
    "channel": "배달의민족",
    "order_id": "ODR-60762"
  },
  {
    "timestamp": "2026-04-08 16:05:42.304",
    "route": "여의도점_배달앱Gateway_058",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 5123,
    "store_id": "S0010",
    "channel": "쿠팡이츠",
    "order_id": "ODR-81888"
  },
  {
    "timestamp": "2026-04-08 16:05:12.841",
    "route": "신촌점_재고연동서버_067",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 225,
    "store_id": "S0036",
    "channel": "현장키오스크",
    "order_id": "ODR-23570"
  },
  {
    "timestamp": "2026-04-08 16:03:24.190",
    "route": "역삼점_재고연동서버_001",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 408,
    "store_id": "S0015",
    "channel": "요기요",
    "order_id": "ODR-60234"
  },
  {
    "timestamp": "2026-04-08 16:02:43.854",
    "route": "분당점_메인라우터_085",
    "status": "실패",
    "error_code": "데이터누락_SchemaError",
    "latency_ms": 1154,
    "store_id": "S0093",
    "channel": "요기요",
    "order_id": "ODR-28181"
  },
  {
    "timestamp": "2026-04-08 16:02:15.297",
    "route": "여의도점_메인라우터_066",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 1027,
    "store_id": "S0032",
    "channel": "배달의민족",
    "order_id": "ODR-70927"
  },
  {
    "timestamp": "2026-04-08 16:02:01.877",
    "route": "종로점_메인라우터_029",
    "status": "실패",
    "error_code": "인증실패_AuthFail",
    "latency_ms": 256,
    "store_id": "S0066",
    "channel": "요기요",
    "order_id": "ODR-97219"
  },
  {
    "timestamp": "2026-04-08 16:01:38.819",
    "route": "판교점_키오스크_025",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 103,
    "store_id": "S0065",
    "channel": "쿠팡이츠",
    "order_id": "ODR-10886"
  },
  {
    "timestamp": "2026-04-08 16:01:16.378",
    "route": "선릉역점_키오스크_015",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 224,
    "store_id": "S0096",
    "channel": "쿠팡이츠",
    "order_id": "ODR-18165"
  },
  {
    "timestamp": "2026-04-08 15:58:55.856",
    "route": "홍대점_POS결제단말기_049",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 241,
    "store_id": "S0025",
    "channel": "매장POS",
    "order_id": "ODR-10889"
  },
  {
    "timestamp": "2026-04-08 15:58:44.924",
    "route": "판교점_POS결제단말기_046",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 315,
    "store_id": "S0011",
    "channel": "요기요",
    "order_id": "ODR-62780"
  },
  {
    "timestamp": "2026-04-08 15:58:03.671",
    "route": "분당점_배달앱Gateway_093",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 531,
    "store_id": "S0038",
    "channel": "쿠팡이츠",
    "order_id": "ODR-50619"
  },
  {
    "timestamp": "2026-04-08 15:57:31.448",
    "route": "홍대점_재고연동서버_014",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 572,
    "store_id": "S0078",
    "channel": "요기요",
    "order_id": "ODR-61517"
  },
  {
    "timestamp": "2026-04-08 15:53:51.146",
    "route": "홍대점_배달앱Gateway_048",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 222,
    "store_id": "S0064",
    "channel": "현장키오스크",
    "order_id": "ODR-34727"
  },
  {
    "timestamp": "2026-04-08 15:50:09.248",
    "route": "선릉역점_메인라우터_084",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 304,
    "store_id": "S0099",
    "channel": "매장POS",
    "order_id": "ODR-52227"
  },
  {
    "timestamp": "2026-04-08 15:49:40.081",
    "route": "신촌점_배달앱Gateway_023",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 203,
    "store_id": "S0041",
    "channel": "쿠팡이츠",
    "order_id": "ODR-26366"
  },
  {
    "timestamp": "2026-04-08 15:49:18.169",
    "route": "홍대점_배달앱Gateway_003",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 220,
    "store_id": "S0024",
    "channel": "요기요",
    "order_id": "ODR-32315"
  },
  {
    "timestamp": "2026-04-08 15:49:02.302",
    "route": "선릉역점_POS결제단말기_043",
    "status": "실패",
    "error_code": "응답지연_Timeout",
    "latency_ms": 2284,
    "store_id": "S0080",
    "channel": "매장POS",
    "order_id": "ODR-19779"
  },
  {
    "timestamp": "2026-04-08 15:49:00.546",
    "route": "판교점_메인라우터_055",
    "status": "실패",
    "error_code": "DBConnectionError",
    "latency_ms": 628,
    "store_id": "S0043",
    "channel": "요기요",
    "order_id": "ODR-64945"
  },
  {
    "timestamp": "2026-04-08 15:47:35.610",
    "route": "분당점_메인라우터_028",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 232,
    "store_id": "S0073",
    "channel": "쿠팡이츠",
    "order_id": "ODR-82310"
  },
  {
    "timestamp": "2026-04-08 15:46:11.911",
    "route": "분당점_메인라우터_031",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 559,
    "store_id": "S0063",
    "channel": "쿠팡이츠",
    "order_id": "ODR-66442"
  },
  {
    "timestamp": "2026-04-08 15:43:16.293",
    "route": "역삼점_키오스크_006",
    "status": "성공",
    "error_code": "정상",
    "latency_ms": 580,
    "store_id": "S0087",
    "channel": "요기요",
    "order_id": "ODR-27868"
  }
];
