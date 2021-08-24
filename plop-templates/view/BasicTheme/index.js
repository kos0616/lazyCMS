/*
  form: 
  {{key: string,
  type: string,
  required: boolean,
  id: string,
  intro: string,
  memo: string,
  spec: {
    memo: boolean,
    options: {value:string, label:string}
  }}[]} */

/** 建立 router 與 *vue 檔 */
module.exports = (D) => {
  const BASE = D.API.replace(/(\/lists|\/create)/, "");
  const BASE_NAME = BASE.replace("/", "-");

  const ARR = BASE.split("/");
  const ROUTER_FIRST = ARR[0];
  const ROUTER_LAST = ARR[1];

  const data = {
    ...D,
    BASE_NAME,
    BASE,
    ROUTER_FIRST,
  };

  /* ROUTER NEED: account/manage/lists, module_account-name, cutted path, key */

  const actions = [
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/_router.ts`, //文件创建路径
      templateFile: "plop-templates/view/BasicTheme/_router.hbs", //文件模板
      data: {
        ...D,
        ROUTER_FIRST,
        ROUTER_LAST,
      },
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/create.vue`, //文件创建路径
      templateFile: "plop-templates/view/BasicTheme/create.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/info.vue`, //文件创建路径
      templateFile: "plop-templates/view/BasicTheme/info.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/lists.vue`, //文件创建路径
      templateFile: "plop-templates/view/BasicTheme/lists.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/modify.vue`, //文件创建路径
      templateFile: "plop-templates/view/BasicTheme/modify.hbs", //文件模板
      data,
    },
  ];
  return actions;
};
