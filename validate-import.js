const { importUsers } = require('./src/import-users');

importUsers('src/data/users.xlsx')
  .then((users) => {
    console.log('Imported:', users.length);
    console.log(users.slice(0, 2));
  })
  .catch((e) => {
    console.error('ERR', e);
    process.exit(1);
  });
