import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders'
import { ButtonInteraction, ButtonStyle, type CacheType, CommandInteraction } from 'discord.js'

export const CANCEL_BUTTON = 'cancelButton'
export const CONFIRM_BUTTON = 'confirmButton'

export interface ConfirmationModalOptions {
  title: string
  cancelLabel?: string
  cancelStyle?: ButtonStyle
  confirmLabel?: string
  confirmStyle?: ButtonStyle
}

export async function createConfirmationModal(
  interaction: CommandInteraction,
  {
    title,
    cancelLabel = 'Cancel',
    cancelStyle = ButtonStyle.Secondary,
    confirmLabel = 'Confirm',
    confirmStyle = ButtonStyle.Success,
  }: ConfirmationModalOptions,
): Promise<ButtonInteraction<CacheType>> {
  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel(cancelLabel).setStyle(cancelStyle).setCustomId(CANCEL_BUTTON),
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
