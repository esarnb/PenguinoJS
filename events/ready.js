module.exports = (client) => {
  console.log(client.colors.cyan(`${client.user.tag} logged in with ${client.guilds.size} Guilds!`));
}
