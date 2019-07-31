import database from '../../src/database';

export default function truncate() {
  return Promise.all([
    database.connection.query('SET FOREIGN_KEY_CHECKS = 0', null, {
      raw: true,
    }),
    ...Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    }),
    database.connection.query('SET FOREIGN_KEY_CHECKS = 1', null, {
      raw: true,
    }),
  ]);
}
