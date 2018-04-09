
//=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
function getListOfUsers() {
  var arrayUsers = client.users.map(x => x.id);
  let obj = {
    users: []
  }

  new Promise(function(resolve1, reject) {
    for (thisUser of arrayUsers) {
      let userDat = {
        userid: thisUser,
        ConsiderAnOwner: false
      }
      obj.users.push(userDat);
    }
    resolve1();
  }).then(() => {
    new Promise(function(resolve2, reject) {
      for (thisGuy of obj.users) {
        //emp
        if (thisGuy.userid == client.config.ownerid) {
          thisGuy.ConsiderAnOwner = true;
        }
        //moist
        if (thisGuy.userid == "184157133187710977") {
          thisGuy.ConsiderAnOwner = true;
        }
        //jondor
        if (thisGuy.userid == "135148181683044352") {
          thisGuy.ConsiderAnOwner = true;
        }
        /*
        //chipped
        if (thisGuy.userid == client.config.ownerid) {
          thisGuy.ConsiderAnOwner = true;
        }
        //jondor
        if (thisGuy.userid == client.config.ownerid) {
          thisGuy.ConsiderAnOwner = true;
        }
        //weeb
        if (thisGuy.userid == client.config.ownerid) {
          thisGuy.ConsiderAnOwner = true;
        }
        */
      }
      resolve2();
    }).then(() => {
      new Promise(function(resolve3, reject) {
      client.redis.set(`UserData`, JSON.stringify(obj), function (err, reply) {
        if (err) console.log(`Error 3: ${err}`);
      })
      client.redis.get(`UserData`, function (err, reply) {
        // console.log(reply);
      })
      resolve3();
    });
    })
  })
}
