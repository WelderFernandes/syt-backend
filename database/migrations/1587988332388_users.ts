import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username').nullable()
      table.string('avatar').nullable()
      table.enu('type', ['normal', 'admin']).defaultTo('normal')
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.specificType('services', 'services')
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
