// if (!process.env.API_URL) {
//   console.error('API URL not defined');
// }

export const BASE_PUBLIC_URL = (() => {
  switch (process.env.REACT_APP_API_DOMAIN) {
    case "local":
      return "http://localhost:3000";
    case "local2":
      return "http://localhost:3000";
    case "development":
      return "https://dev-mgr.knowbe.jp/v2";
    case "development2":
      return "https://dev2-mgr.knowbe.jp/v2";
    case "development3":
      return "https://dev3-mgr.knowbe.jp/v2";
    case "staging":
      return "https://stg-mgr.knowbe.jp/v2";
    default:
      return "https://mgr.knowbe.jp/v2";
  }
})();

export const BASE_OLD_VERSION_URL = (() => {
  switch (process.env.REACT_APP_API_DOMAIN) {
    case "local":
      return "http://localhost:3000";
    case "local2":
      return "http://localhost:3000";
    case "development":
      return "https://dev-mgr.knowbe.jp";
    case "development2":
      return "https://dev2-mgr.knowbe.jp";
    case "development3":
      return "https://dev3-mgr.knowbe.jp";
    case "staging":
      return "https://stg-mgr.knowbe.jp";
    default:
      return "https://mgr.knowbe.jp";
  }
})();

export const BASE_URL = (() => {
  console.log("base url", process.env.REACT_APP_API_DOMAIN);
  switch (process.env.REACT_APP_API_DOMAIN) {
    case "local":
      return "http://localhost";
    case "local2":
      return "http://localhost:8081";
    case "development":
      return "https://dev-api.knowbe.jp";
    case "development2":
      return "https://dev2-api.knowbe.jp";
    case "development3":
      return "https://dev3-api.knowbe.jp";
    case "staging":
      return "https://stg-api.knowbe.jp";
    default:
      return "https://api.knowbe.jp";
  }
})();
export const VERSION_URL = "/v1/mgr";
export const COMMON_VERSION_URL = "/v1"; // 学習と業務支援共通のAPI用

export const SENTRY_CONF = {
  dsn: "https://dbbfd1427f4e49e7a2cf91b5769ba57d@sentry.io/1375814"
};
