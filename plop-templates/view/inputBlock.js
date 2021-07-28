/** input 共用區塊的子片段 */
module.exports = 
`{{#if this.spec.options.length}}
<el-select
  v-model="form[inputForm.{{this.key}}.id]"
  :placeholder="$i18n.global.t(inputForm.{{this.key}}.label)"
>
  <el-option
    v-for="(item, i) in inputForm.{{this.key}}.options"
    :key="\`{{this.key}}_\${i}\`"
    :label="$i18n.global.t(item.label)"
    :value="item.value"
  />
</el-select>
{{else}}
<el-input
  v-model="form[inputForm.{{this.key}}.id]"
  :placeholder="$i18n.global.t(inputForm.{{this.key}}.label)"
  {{#if this.spec.memo}}
  type="textarea"
  {{/if}}
/>
{{/if}}
`;