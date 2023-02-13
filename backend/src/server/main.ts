import migrator from '../db/migrator'
import app from './app'

const port = 3201

const revert_migrations = false

async function main() {
  if (revert_migrations) {
    console.log('starting down migrations')
    await migrator.down({ to: 0 })
    console.log('finished down migrations')
  } else {
    console.log('starting up migrations')
    await migrator.up()
    console.log('finished up migrations')
  }
  app.listen(port, () => {
    console.log('STARTING BACKEND KAHANI SERVER')
    return console.log(`Express is listening at http://localhost:${port}`)
  })
}

main()
