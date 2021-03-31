import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }

  public async create({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'remember_me_token'])

    const user = new User()
    user.email = data.email
    user.password = data.password

    await user.save()
    return user.toJSON()
  }

  public async show({}: HttpContextContract) {}
}
