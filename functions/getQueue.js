module.exports = (client, guildID) => {
  if (!client.queues[guildID]) client.queues[guildID] = [];
  return client.queues[guildID]
}
