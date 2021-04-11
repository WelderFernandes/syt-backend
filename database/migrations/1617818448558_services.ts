import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Services extends BaseSchema {
  protected tableName = 'services'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('day').nullable()
      table.string('hour').nullable()
      table.string('runtime').nullable()
      table.enum('reservation', ['Yes', 'No']).defaultTo('No')
      table.decimal('value')
      table.text('description')
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable()
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('category_id')
        .references('id')
        .inTable('categories')
        .notNullable()
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
