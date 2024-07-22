import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { GatewayIntentBits } from 'discord.js'
import { DiscordAppModule } from './discord/app.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_APP_TOKEN') ?? '',
        failOnLogin: true,
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds],
        },
        registerCommandOptions: [
          configService.get('DEV_GUILD_ID') && {
            forGuild: configService.get('DEV_GUILD_ID'),
            removeCommandsBefore: true,
          },
        ],
      }),
      inject: [ConfigService],
    }),
    DiscordAppModule,
  ],
})
export class AppModule {}
