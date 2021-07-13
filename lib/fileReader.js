const paper = require("../MD");

/* DATUM 以及 object in object */
/* TODO: '3' '-2' , Y , N */
/* TODO: selector 1 2 3 4 */

/** 以關鍵字取得權限 */
const API_CONTENT = paper.match(/權限\S* \S*\/lists/)[0];
/** 再度過濾，取得 /lists */
const API = API_CONTENT.match(/\S*\/lists/)[0];

/** 取得含有關鍵字的表格內項目 */
const aviabledData = paper.match(/[c]{0,1}p\d*_[\S | \t ]*/gm);
/** 將每列再切成小塊 ** 注意 手動放入的 key 值也會被引入 ** */
const table = aviabledData.map((R) => R.split("\t").map((s) => s.trim()));

/**
 * 目前判定第一段為 主 key 值
 * 但若使用者沒有輸入，值會取消
 */
let [KEY, ...resTable] = table;
if (Array.isArray(KEY) && KEY.length !== 1) {
  console.log("使用者尚未輸入 KEY值，稍後發問。");
  KEY = "";
}
/** 假如第一個 key 並非手動輸入格式，將回復 table 資料 */
if (!KEY) {
  resTable = table;
}

/**
 * 從 table 轉譯成文字
 * 第一格固定為 內容 第二格固定為 說明 ，第三格後為驗證
 */
const rawForm = resTable.map((row) => {
  const [id, intro, ...res] = row;
  const memo = res.filter((R) => R).join(", ");
  return { id, intro, memo };
});

/** 開始進行欄位的格式化 */
const settedForm = rawForm.map((raw) => {
  const type = idIsNumber(raw) ? "number" : "string";
  const required = IsRequired(raw);
  const key = showKey(raw);
  return { key, type, required, ...raw };
});

/** 權限指定路徑 */
exports.API = API;
/** 解析過後的文件 */
exports.settedForm = settedForm;
/** 手動置入的 KEY 值 */
exports.key = KEY;

/**
 * 檢查欄位是否為 Number
 * @param { {id:string,intro:string,memo:string} } raw 基本資料類型
 * @returns boolean
 */
function idIsNumber(raw) {
  /** 單從 id 名稱判斷 */
  const keyTest = raw.id.includes("id");

  const NUMBER_TYPES = ["number", "integer", "unix"];
  /** 從驗證與備註中的關鍵字做判斷 */
  const memoTest = NUMBER_TYPES.some((T) => raw.memo.includes(T));
  return keyTest || memoTest;
}

/**
 * 檢查欄位是否為 required
 * 先檢查 nullabled, 再來是 必填 與 required 關鍵字
 * @param { {id:string,intro:string,memo:string} } raw 基本資料類型
 * @returns boolean
 */
function IsRequired(raw) {
  /** 先檢查非必填 */
  const NOT = ["nullable"];
  const notRequired = NOT.some((S) => raw.memo.includes(S));
  if (notRequired) {
    return false;
  }

  /* 再檢查必填 */
  const REQUIRED_STRINGS = ["required", "必填"];
  const required = REQUIRED_STRINGS.some((S) => raw.memo.includes(S));
  return required;
}

/**
 * 將欄位id格式化，以取得簡寫代稱
 * 方法是將 pxx_xx_ 除掉，以後方的詞作為 key
 * @param { {id:string,intro:string,memo:string} } raw 基本資料類型
 * @returns string
 */
function showKey(raw) {
  const str = raw.id.replace(/[c]{0,1}p\d*_\S*_/gm, "");
  return str;
}
