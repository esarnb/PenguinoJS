module.exports = (client, oldState, newState) => {
    let inVC = newState.guild.me.voice
    if (inVC.connection && inVC.channel.members.size < 2 ) inVC.channel.leave()
}