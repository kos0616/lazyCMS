/**
 * 依 File Reader 的答案，整理出需要額外問的問題
 * @param {string} API 權限需求的路徑，同時也視為基礎 API
 * @param { {id:string,intro:string,memo:string} } settedForm 格式化的說明書
 */
module.exports = function getPrompts(API, settedForm, key) {
  const prompts = [type_ASK];
/*   if (Array.isArray(settedForm) && settedForm.length > 0) {
    prompts.push(P_inputs(settedForm));
  } */
  if (!API) prompts.push(P_API());
  if (!key) prompts.push(P_key());

  return prompts;
};

/** 詢問產生器的模式 */
const type_ASK = {
  type: 'list',
  name: 'themeType',
  message: '選擇產出樣式',
  choices: ['Basic', 'Dialog']
}

/** 要求輸入 API */
function P_API() {
  return {
    type: "input",
    name: "API",
    message:
      "文件內沒有找到 權限依附路徑 (ex: account/manage/lists)，請手動輸入", // 交互提示
  };
}
/* 直接秀畫面確認 Y N 即可，失敗就不理睬 */

/**
 * 要求檢查欄位的正確性
 * @param { {id:string,intro:string,memo:string,key:string,type:string,required:boolean}[] } inputs 格式化的說明書
 * @returns
 */
/* function P_inputs(inputs) {
  // 將格式化欄位顯示給使用者作確認
  const options = inputs
    .map(
      (I) =>
        `${I.id} | ${I.intro} | ${I.memo} | key: ${I.key} | type: ${I.type} | required: ${I.required}`
    )
    .join("\n");

  return {
    type: "confirm",
    message: `\n${options}\n請確認欄位`,
    name: "confirm",
  };
} */

function P_key() {
  return {
    type: "input",
    name: "key",
    message: "主要的 key id (ex: p3_ant_id)",
  };
}
