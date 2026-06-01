const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'langs.csv');

// 自定义 CSV 解析器（支持双引号包裹、逗号和换行符转义）
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++; // 跳过下一个引号
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && next === '\n') i++;
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

try {
  const content = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(content).filter(r => r.length > 0 && r[0].trim() !== '');
  
  if (rows.length === 0) {
    throw new Error('CSV 文件为空或解析失败');
  }

  // 首行为表头，必须包含 "zh-CN" 作为主键
  const headers = rows[0].map(h => h.trim());
  const keyIndex = headers.indexOf('zh-CN');
  if (keyIndex === -1) {
    throw new Error('CSV 文件必须包含 "zh-CN" 列作为主键');
  }

  // 收集所有需要输出的语言列
  const languages = headers;
  
  // 初始化结果对象
  const translations = {};
  languages.forEach(lang => {
    translations[lang] = {};
  });

  // 填充数据
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const key = row[keyIndex];
    if (!key) continue;

    // 填充每种语言的对应值
    languages.forEach(lang => {
      const langIndex = headers.indexOf(lang);
      const val = row[langIndex];
      if (lang === 'zh-CN') {
        translations[lang][key] = key; // 中文始终映射为其自身作为键值
      } else {
        translations[lang][key] = val ? val.trim() : key; // 其它语言缺省使用中文
      }
    });
  }

  // 写入 JSON 档
  Object.keys(translations).forEach(lang => {
    const data = translations[lang];
    const jsonPath = path.join(__dirname, `${lang}.json`);

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Generated JSON: ${jsonPath}`);
  });

  console.log('Translations generated successfully!');
} catch (error) {
  console.error('Error generating translations:', error);
  process.exit(1);
}
