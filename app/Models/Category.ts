import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public serviceId: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Service)
  public services: HasMany<typeof Service>
}
