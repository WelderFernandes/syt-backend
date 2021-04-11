import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'
export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public categoryId: number

  @column()
  public name: string

  @column()
  public value: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => Category)
  public category: HasOne<typeof Category>

  // @hasOne(() => Category, {
  //   foreignKey: 'categoryUserId',
  // })
  // public category: HasOne<typeof Category>
}
