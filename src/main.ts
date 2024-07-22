import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'reflect-metadata'

const app = await NestFactory.create(AppModule)

console.log(Bun.env.DISCORD_APP_TOKEN)
await app.listen(3000)
