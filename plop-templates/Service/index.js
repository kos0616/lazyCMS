/** 建立 Service/*ts */
module.exports = (D) => {
  /** 清掉最後一段的 lists */
  const BASE_API = D.API.replace("/lists", "");
  const types = generateType(D.form);

  const data = {
    ...D,
    BASE_API,
    types,
  };

  const actions = [
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${data.folder}/Service/Create.ts`, //文件创建路径
      templateFile: "plop-templates/Service/Create.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${data.folder}/Service/Delete.ts`, //文件创建路径
      templateFile: "plop-templates/Service/Delete.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${data.folder}/Service/DoModify.ts`, //文件创建路径
      templateFile: "plop-templates/Service/DoModify.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${data.folder}/Service/Info.ts`, //文件创建路径
      templateFile: "plop-templates/Service/Info.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${data.folder}/Service/Lists.ts`, //文件创建路径
      templateFile: "plop-templates/Service/Lists.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${data.folder}/Service/Modify.ts`, //文件创建路径
      templateFile: "plop-templates/Service/Modify.hbs", //文件模板
      data,
    },
  ];
  return actions;
};

/**
 * 將說明轉換為 typeScript 的描述
 * @param {{key: string,
    type: string,
    required: boolean,
    id: string,
    intro: string,
    memo: string}[]} form 欄位項目
 */
function generateType(form) {
  return form
    .map((f) => [
      /** 上方註解 */
      `/** ${f.intro} ${f.memo} ${f.required ? "必填" : "選填"} */`,
      /** 下方 type script */
      `${f.id}: ${f.type};`,
    ])
    .reduce((cur, nex) => [...cur, ...nex], []);
}
