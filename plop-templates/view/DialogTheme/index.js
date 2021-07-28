/* {{key: string,
  type: string,
  required: boolean,
  id: string,
  intro: string,
  memo: string}[]} */

/** 建立 router 與 *vue 檔 */
module.exports = (D) => {
  const BASE = D.API.replace("/lists", "");
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
      templateFile: "plop-templates/view/Basic/_router.hbs", //文件模板
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
      templateFile: "plop-templates/view/Basic/create.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/info.vue`, //文件创建路径
      templateFile: "plop-templates/view/Basic/info.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/lists.vue`, //文件创建路径
      templateFile: "plop-templates/view/Basic/lists.hbs", //文件模板
      data,
    },
    {
      type: "add", //类型创建模板文件
      force: true, // 檔案重複時，強制覆蓋
      path: `dist/${D.folder}/modify.vue`, //文件创建路径
      templateFile: "plop-templates/view/Basic/modify.hbs", //文件模板
      data,
    },
  ];
  return actions;
};
