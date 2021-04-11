import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await Category.all()

    return categories
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'description'])
    const category = new Category()

    category.name = data.name
    category.description = data.description

    await category.save()
    return category.toJSON()
  }

  public async show({ params }: HttpContextContract) {
    const category = await Category.query()
      .preload('services')
      .has('services')
      .where('id', '=', params.id)
    return category
  }

  public async update({ params, request }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    const data = request.all()

    category.merge(data)
    await category.save()

    return category
  }

  public async destroy({ params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
  }
}
