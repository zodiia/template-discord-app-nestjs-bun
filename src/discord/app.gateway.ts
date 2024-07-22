import { InjectDiscordClient, On } from '@discord-nestjs/core'
import { Logger } from '@nestjs/common'
import { Events, type Client } from 'discord.js'

export class AppGateway {
  private readonly logger = new Logger(AppGateway.name)

  constructor(@InjectDiscordClient() private readonly client: Client) {}

  @On(Events.Error)
  onError(error: Error) {
    this.logger.error(`Error with the app: ${error.message}`)
  }

  @On(Events.ClientReady)
  onReady() {
    this.logger.log(`App ${this.client.user?.tag} is ready.`)
  }
}
