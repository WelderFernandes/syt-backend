import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login')
Route.post('/user/store', 'UsersController.store')

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly().except(['store'])
  Route.resource('services', 'ServicesController').apiOnly()
}).middleware('auth')
