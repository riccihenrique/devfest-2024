/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('tb_contas_correntes', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    cliente_id: {
      type: 'int',
      notNull: true,
      references: 'tb_clientes',
    },
    numero: {
      type: 'int',
      notNull: true,
    },
    digito: {
      type: 'int',
      notNull: true,
    },
    agencia: {
      type: 'int',
      notNull: true,
    },
    criado_em: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    deletado_em: {
      type: 'timestamp',
      notNull: false,
    },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('tb_contas_correntes');
};