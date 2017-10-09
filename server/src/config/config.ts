import * as path from 'path';

export default {
  port: 3000,
  publicDir:  path.join(__dirname, '../../../client/dist'),
  uploadsDir: path.join(__dirname, '../../../uploads'),
  secret: 'wow, much secret!',
  database: 'mongodb://db/server',
};
