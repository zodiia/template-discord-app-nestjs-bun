import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { CommandsModule } from './commands/commands.module'
import { AppGateway } from './app.gateway'

@Module({
  imports: [DiscordModule.forFeature(), CommandsModule],
  providers: [AppGateway],
})
export class DiscordAppModule {}
