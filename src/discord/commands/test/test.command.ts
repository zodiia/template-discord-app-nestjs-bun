import { SlashCommandPipe } from '@discord-nestjs/common'
import { Command, Handler, IA, Param, ParamType } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import type { CommandInteraction, User } from 'discord.js'

class TestCommandInteraction {
  @Param({ description: 'Someone', type: ParamType.USER, required: false })
  user?: User
}

@Command({
  name: 'test',
  description: 'Test command',
  include: [],
})
@Injectable()
export class TestCommand {
  @Handler()
  async onCommand(@IA() interaction: CommandInteraction, @IA(SlashCommandPipe) dto: TestCommandInteraction) {
    const user = dto.user ?? interaction.user

    interaction.reply({
      content: `Hello, ${user.toString()}!`,
    })
  }
}
