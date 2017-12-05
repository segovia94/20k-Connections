export const connectionTypes = [
  {
    type: 'friend',
    label: 'Friend',
    description: 'I met a new unbelieving friend!'
  },
  {
    type: 'post',
    label: 'Post',
    description: 'I had a conversation telling an unbeliever about something that\'s going on in my life or walk with God.'
  },
  {
    type: 'like',
    label: 'Like',
    description: 'I listened to an unbeliever tell me about something personal that was going on in their life and affirmed them in some way.'
  },
  {
    type: 'share',
    label: 'Share',
    description: 'I shared information that could help others know more about God or what it means to walk with Him.'
  },
  {
    type: 'comment',
    label: 'Comment',
    description: 'I gave advice or encouragement to an unbeliever about things that were going on in their life.'
  },
  {
    type: 'invite',
    label: 'Invite',
    description: 'I extended an invitation to an unbeliever or they extended an invitation to me.'
  },
  {
    type: 'other',
    label: 'Other',
    description: 'I made another kind of intentional evangelistic connection with an unbeliever.'
  }
]

export function getConnectionConfig ($type) {
  return connectionTypes.find(connectionType => connectionType.type === $type)
}
