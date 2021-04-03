import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['email', 'password'])

    const user = new User()
    user.email = data.email
    user.password = data.password

    await user.save()
    return user.toJSON()
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async update({ params, auth, response, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const data = request.all()

    if (user.id !== auth.user?.$attributes.id) {
      return response.status(401)
    }

    user.merge(data)
    await user.save()

    return user
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user?.$attributes.id) {
      return response.status(401)
    }
    await user.delete()
  }
}
