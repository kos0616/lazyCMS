/** 取得文件轉換過來的值 */
const inputs = require("./lib/fileReader");
const API = inputs.API.trim();
const form = inputs.settedForm;
const key = inputs.key;
const folder = API.split("/")[1]; /* 過濾出 folder 的路徑 */

/** 整理問題 */
const setPrompts = require("./lib/setPrompts");
const Service = require("./plop-templates/Service/index");
const view = require("./plop-templates/view/index");

const FOLDER = {
  description: "API 文件轉為資料夾並且輸出",
  prompts: [...setPrompts(API, form, key)],
  actions: (data) => {
    /** 印出欄位 */
    console.log("\n");
    console.table(form);

    if (data.confirm === false)
      throw new Error("使用者確認欄位錯誤，中斷操作!");

    const res = { API, ...data, folder, key, form };

    const actions = [...Service(res), ...view(res)];
    return actions;
  },
};

module.exports = function (plop) {
  plop.setGenerator("FOLDER", FOLDER);
};
