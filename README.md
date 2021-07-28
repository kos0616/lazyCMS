# 文件轉換器

可將後端純文字文件轉換為基本的模組包。

## 指令

Install

`yarn`

Run

`yarn plop`

## 輸入

1. 打開 MD.txt
2. 貼上文件中的 Create ，須包含 "此項目權限依附--- /lists" 及 表格內容
3. 表格內的 **第一筆 ID** 會自動成為刪除時 **顯示的名稱** ex: 你確定要刪除 `{{ form.p3_ape_name }}` 嗎?
4. 在最上方**手動輸入**主要 `id` ，格式是 `pxx_xx_id` (即 info 與 modify 的 `request id`)，因為 Create 文件裡沒有 `id`

## 輸出

1. 輸出內容都在 `/dist` 內
2. 可直接使用的項目有 `Service`  `*vue` `form.ts`
3. `_locale.json` `_router.ts` 不能直接使用，需要**手動加入**

## 未來功能

1. Select options in typescript form and vue
