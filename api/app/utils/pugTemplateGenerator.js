const path = require('path');
const pug = require('pug');

const getTemplateByFileName = (fileName, options) => {
  const templatePath = path.resolve(__dirname, '../resources/emailTemplates', fileName);
  const compile = pug.compileFile(templatePath);

  return compile(options);
};

module.exports = getTemplateByFileName;
