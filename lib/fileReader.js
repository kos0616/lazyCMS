const fs = require("fs");
const path = require("path");
const paper = fs.readFileSync(path.resolve(__dirname, "../MD.txt"), "utf8");

/* FUTURE: DATUM 以及 object in object */
/* TODO: '3' '-2' , Y , N */
/* TODO: selector 1 2 3 4 */
/* TODO: 後續還有 switch 與 select 的選擇問題 */

/* TODO: find method that for in for loop */
/** service */
/** form */
/** *vue */

/** get NODE */
const NODE_Matcher = paper.match(/NODE_\d*/)
let NODE = 'NODE_**';
if(Array.isArray(NODE_Matcher) && NODE_Matcher.length) {
  NODE = NODE_Matcher[0];
}

/** 以關鍵字取得權限 */
const API_CONTENT = paper.match(/權限\S* \S*\/lists/)[0];
/** 再度過濾，取得 /lists */
const API = API_CONTENT.match(/\S*\/lists/)[0];

/** 取得含有關鍵字的表格內項目 */
const aviabledData = paper.match(
  /[c]{0,1}p\d*_[a-z]*_[a-z_]*\t\S*\t[\S | \t]*/gm
);
/** 將每列再切成小塊 */
const table = aviabledData.map((R) => R.split("\t").map((s) => s.trim()));

/**
 * 自動找出手動輸入的 key
 * 原理是找出 'id' 結尾的 key
 */
const keyMatcher = paper.match(/[c]{0,1}p\d*_[a-z]*_[a-z_]*id/g)
let KEY = ''
if (Array.isArray(keyMatcher) && keyMatcher.length > 0) {
  KEY = keyMatcher[0];
}

/** Main key 為 router 切換與刪除使用的 key */
console.log('\x1b[34m', `Main Key: ${KEY}`);
/** Name Key 為刪除時的預設提示 key */
console.log('\x1b[34m', `Name Key: ${table[0]}`);

/**
 * 從 table 轉譯成文字
 * 第一格固定為 內容 第二格固定為 說明 ，第三格後為驗證
 */
const rawForm = table.map((row) => {
  const [id, intro, ...res] = row;
  const memo = res.filter((R) => R).join(", ");
  return { id, intro, memo };
});

/** 開始進行欄位的格式化 */
const settedForm = rawForm.map((raw) => {
  const type = idIsNumber(raw) ? "number" : "string";
  const required = IsRequired(raw);
  const key = showKey(raw);
  const spec = {
    memo: isMemo(raw),
    options: getSelection(raw),
  };
  return { key, type, required, ...raw, spec };
});

/** 權限指定路徑 */
exports.API = API;
/** 解析過後的文件 */
exports.settedForm = settedForm;
/** 手動置入的 KEY 值 */
exports.key = KEY;
exports.NODE = NODE;

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
  const str = raw.id.replace(/[c]{0,1}p\d*_[a-z]*_/gm, "");
  return str;
}

/**
 * 檢查欄位是否為 備註
 * @param { {id:string,intro:string,memo:string} } raw 基本資料類型
 * @returns boolean
 */
function isMemo(raw) {
  /** 單從 id 名稱判斷 */
  const keyTest = raw.id.includes("_memo") || raw.id.includes("_notice");
  const MEMO_TYPES = ["備註"];
  const memoTest = MEMO_TYPES.some((T) => raw.memo.includes(T));
  return keyTest || memoTest;
}

/**
 * 取得欄位的選項
 * @param { {id:string,intro:string,memo:string} } raw 基本資料類型
 * @returns boolean
 */
function getSelection(raw) {
  /** 以句點 作為判斷的依據， 注意中文字元判斷在 regex101 無法作用 */
  const regex = new RegExp(
    /[-]{0,1}[a-zA-Z0-9]*\.[a-zA-Z0-9\u4e00-\u9fa5]*/,
    "gm"
  );
  /** 這邊會取得文件中的值與名稱 ex: ['3.啟用', '-2.停用'] */
  const result = raw.memo.match(regex);
  /** 滿足條件的話，轉成 Array<{key:string, value:string}> */
  if (Array.isArray(result) && result.length >= 2) {
    return result.map((R) => {
      const arr = R.split(".");
      return {
        key: arr[0],
        value: arr[1],
      };
    });
  }
}
