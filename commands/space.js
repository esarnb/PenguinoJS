
module.exports.run = (client, msg, args) => {
  msg.channel.send(space);
  msg.delete({timeout: 100});
}

module.exports.info = {
  name: "space",
  help: "Pastes in lines of spaces to visually clear the chat upwards.",
  categ: "Tools",
  owner: false,
  admin: true,
  issue: false
}

var space = `​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
​​
`;
