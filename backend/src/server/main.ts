import migrator from "../db/migrator"
import app from './app'

const port = 3201

async function main() {
    await migrator.up()
    app.listen(port, () => {
        console.log('STARTING BACKEND KAHANI SERVER')
        return console.log(`Express is listening at http://localhost:${port}`)
      })
}

main() 
