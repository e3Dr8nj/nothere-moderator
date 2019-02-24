
//________
exports.delay=(duration)=>{ return new Promise((resolve)=>{return setTimeout(resolve,duration)}); };
exports.commands={};

exports.run =async(client,event)=>{
try{

  // if(event.t){client.console([[event.t,'blue']]);};
   
  if(event.t=='READY'){ await module.exports.delay(1000);await module.exports.onGuildCreate(client);return;};

  if(event.t =='MESSAGE_CREATE'){
           //console.log('message_create'); 
          // console.log(event.d.content);
           return module.exports.onMessage(client,event.d);
   };
//______________________TEST
     if(event.t =='MESSAGE_DELETE'){
           //console.log('message_create'); 
         // console.log(event.d.message.content);
           //return module.exports.onMessage(client,event.d);
   };
//_____________________________

  return;
}catch(err){console.log(err);};
};//exports.run end
//____________________________________ON_GUILD_CREATE__________EVENT
 module.exports.onGuildCreate=async(client)=>{try{
    await exports.delay(1000);
    console.log('onGuildCreate');
   await module.exports.setBoot(client,'command');
   let res = await  module.exports.setBoot(client,'module');
   await  module.exports.setBoot(client,'event');
   await  module.exports.setBoot(client,'boot');
   await  module.exports.setBootByFolder(client);
  
   await module.exports.setCommand(client,'command');
   await module.exports.setCommand(client,'module');
   await module.exports.setCommand(client,'event');
   await module.exports.setCommand(client,'boot');
   await module.exports.setEvent(client,'command');
   await module.exports.setEvent(client,'module');
   await module.exports.setEvent(client,'event');
   await module.exports.setEvent(client,'boot');
   await module.exports.setEventByFolder(client);
   await module.exports.setCommandByFolder(client);
   await module.exports.setEventByFolder(client);
  
    
}catch(err){console.log(err)};};//
//____________________________________________________________

//______________________________________________ON_MESSAGE___EVENT

exports.onMessage=async(client,event_d)=>{try{
   console.log('emit');
   //if(client.commands_enabled==false) return;
   if(event_d.author.id==client.user.id) return;
   
   let message = await client.channels.get(event_d.channel_id).fetchMessage(event_d.id).then(collected=>{return collected;});
   if(!message.content.startsWith(client.prefix)) return;
      let args = message.content.slice(client.prefix.length).trim().split(/ +/g);
      let cmd_name = args[0];

  if(module.exports.commands[cmd_name]){
      console.log(cmd_name+" command triggered ");
      if(message.author==client.user) return;
      module.exports.commands[cmd_name].exe(client,message,args);
    
      return;
  };

//-----------------
}catch(err){console.log(err);};};//onMessage end
//_________________________________________________________________________


//_____________________________BOOT___
//_________________SET_BOOT
module.exports.setBoot=async(client,path)=>{try{
   await exports.delay(1000);
   
   let fs = require('fs');
//----------------------
  fs.readdir("./"+path+"s/", (err, files) => {try{
  //    if (err) return console.error(err);
    files.forEach(file => {
            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];
            
             
//------------------------------
        if(!!target_module.active){ 
             if(!!target_module.boots){
                for(let key in target_module.boots){ 
                    if(target_module.boots[key].on){
                         client.console([['BOOT EXE','red'],[' .../'+path+'s/'+moduleName+'/'+key]]);
                        target_module.boots[key].run(client);
                     };//if boot is on end
                };//for end
            };//if boots is active
           };//if target_module is active
//---------------------------------


  });//for end 
    
}catch(err){  console.log(err);};
});//boot end
//--------------------
  return true;
}catch(err){console.log(err)};};//setModuleBoot end
//________________________________________________
//________________________________COMMAND_________
//_________________SET_COMMANDS

module.exports.setCommand=async(client,path)=>{try{
   await exports.delay(1000);
   let fs = require('fs');

  fs.readdir("./"+path+"s/", (err, files) => {try{
   //if (err) return console.error(err);
    files.forEach(file => {

            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];
            if(!!target_module.active){    
            
                  if(!!target_module.commands){
                      for(let key in target_module.commands){
                             let commandName = key; 
                             if(!!target_module.commands[key].on){
                                 if(!!target_module.commands[key].aliase){commandName=target_module.commands[key].aliase.slice();};
                                 module.exports.commands[commandName]={};
                                 module.exports.commands[commandName].exe=target_module.commands[key].run ;   
                                 client.console([['COMMAND SET','green'],[' .../'+path+'s/'+moduleName+'/'+commandName]]);
                              };//if on is true;
                      };//for end
                  };//if end

            };//module is active

    });//forEach end

}catch(err){console.log(err);};
});//event trigger
//--------------------
}catch(err){console.log(err)};};//setCommand end
//_____________________________________EVENT
//_____________________SET_EVENTS
module.exports.setEvent=async(client,path)=>{try{
   await exports.delay(1000);
  
   let fs = require('fs');
//----------------------
   fs.readdir("./"+path+"s/", (err, files) => {
try{

 if (err) return console.error(err);
  files.forEach(file => {try{
            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];
          if(!!target_module.active){ 
            
              if(!!target_module.events){
                  for(let key in target_module.events){  
                      if(target_module.events[key].on){
                            client.on(key, (...args) => target_module.events[key].run(client, ...args));
                        
                             client.console([['EVENT SET','green'],[' .../'+path+'s/'+moduleName+'/'+key]]);
                           };//if on end
                  };//for key
            };//if events is active
          };//if module is active
     }catch(err){console.log(err);};
    });//if end

}catch(err){console.log(err);};
});//event trigger
//--------------------
}catch(err){console.log(err)};};//setModuleEvents end
//_______________________ALL_BY_MAIN_PROFILE
//__________________EVENT_FILE
module.exports.setEventByFolder=async(client)=>{try{
      let fs = require('fs');
      fs.readdir('./events', (err,files) =>{
          files.forEach(file=>{try{
              let target_module=require(`./events/${file}`);
              let moduleName=file.split(".")[0];
              if(target_module.run&&target_module.on&&!!target_module.active){
                    client.on(moduleName, (...args) => target_module.run(client, ...args));
                   
                    client.console([['EVENT SET ','green'],[' .../events/'+moduleName+'/run']]);
               };//if target_module end
           }catch(err){console.log(err);}});//forEach end
       });//fs readdir
}catch(err){console.log(err);};};//module.exports.setEventByFolder end
//__________________COMMAND_FILE
module.exports.setCommandByFolder=async(client)=>{try{
      let fs = require('fs');
      fs.readdir('./commands', (err,files) =>{
          files.forEach(file=>{try{
              let target_module=require(`./commands/${file}`);
              let moduleName=file.split(".")[0];
              let commandName = moduleName.slice();
              if(target_module.run&&target_module.on&&!!target_module.active){ 
                   
                  if(!!target_module.aliase){commandName=target_module.aliase.slice();};
                     module.exports.commands[commandName]={};
                     module.exports.commands[commandName].exe=target_module.run ;   
                  
                    client.console([['COMMAND SET ','green'],[' .../commands/'+moduleName+'/run']]);
               };//if target_module end
           }catch(err){console.log(err);}});//forEach end
       });//fs readdir
}catch(err){console.log(err);};};//module.exports.setEventByFolder end
//__________________BOOT_FILE

module.exports.setBootByFolder=async(client)=>{try{
      let fs = require('fs');
      fs.readdir('./boots', (err,files) =>{
           files.forEach(file=>{try{
              let target_module=require(`./boots/${file}`);
              let moduleName=file.split(".")[0];
              if(target_module.run&&target_module.on&&!!target_module.active){
                    target_module.run(client);
                    
                    client.console([['BOOT EXE ','red'],[' .../boots/'+moduleName+'/run']]);
               };//if target_module end
           }catch(err){console.log(err);}});//forEach end
       });//fs readdir
}catch(err){console.log(err);};};//module.exports.setBootByFolder end
