import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Services from 'App/Models/Service'

export default class ServicesController {
  public async index({}: HttpContextContract) {
    const services = await Services.all()

    return services
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'value', 'description'])

    const service = new Services()

    service.name = data.name
    service.value = data.value
    service.description = data.description

    await service.save()
    return service.toJSON()
  }

  public async show({ params }: HttpContextContract) {
    const user = await Services.findOrFail(params.id)

    return user
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const service = await Services.findOrFail(params.id)

    const data = request.all()

    if (service.id !== auth.user?.$attributes.id) {
      return response.status(401)
    }

    service.merge(data)
    await service.save()

    return service
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const service = await Services.findOrFail(params.id)

    if (service.id !== auth.user?.$attributes.id) {
      return response.status(401)
    }
    await service.delete()
  }
}
