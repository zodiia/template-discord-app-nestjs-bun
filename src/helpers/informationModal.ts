import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders'
import { ButtonStyle, CommandInteraction } from 'discord.js'

export const CONFIRM_BUTTON = 'confirmButton'

export interface InformationModalOptions {
  title: string
  confirmLabel?: string
  confirmStyle?: ButtonStyle
}

export async function createInformationModal(
  interaction: CommandInteraction,
  { title, confirmLabel = 'Confirm', confirmStyle = ButtonStyle.Secondary }: InformationModalOptions,
) {
  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel(confirmLabel).setStyle(confirmStyle).setCustomId(CONFIRM_BUTTON),
  )
  const message = await interaction.followUp({
    ephemeral: true,
    content: title,
    components: [actionRow],
    fetchReply: true,
  })

  return message
    .awaitMessageComponent({
      time: 300 * 1000,
      filter: (it) => it.user.id === interaction.user.id && it.message.id === message.id,
    })
    .then((resp) => {
      if (!resp.isButton()) {
        throw new Error('Did not receive a ButtonInteraction from a modal.')
      }
      return resp
    })
}
