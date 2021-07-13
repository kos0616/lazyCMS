module.exports = `
p25_cny_id
此項目權限依附於 company/manage/lists
新增(程序)

項目	內容	說明	驗證	備註
路徑	company/manage/create			
方法	POST			
權限	新增			
參數				
p25_cny_name	公司名稱	必填,最長124字元	
p25_cny_tax_id_number	統一編號	必填,最長124字元	
p25_cny_principal_name	負責人姓名	必填,最長124字元	
p25_cny_principal_phone	負責人電話	必填,最長124字元	
p25_cny_register_address	登記地址	必填,最長124字元	
p25_cny_business_address	營業地址備註	必填,最長124字元	
p25_cny_business_memo	營業地址	必填,最長124字元	
p25_cny_memo	備註	最長124字元
`;
