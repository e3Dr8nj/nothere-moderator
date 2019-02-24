//________________________________________INITIATION_PART__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
//_____________SETTINGS
exports.active=false;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events={};// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
     ,ch_log_name:'лог-мод'
     ,sm_role_name:'Супермодератор'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.messageDelete={ on:true,  run:async(client,message)=>{try{
//if on this function triggers on deffined event
              console.log('message.deleted');
              await delay(300);
  /*
              let entry = await message.guild.fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=> audit.entries.first()).catch(err=>console.log(err));
               let executor = message.guild.members.get(entry.executor.id);
               let user = "";
               console.log(entry.createdTimestamp);
               console.log(Date.now());
               console.log(entry.createdTimestamp-Date.now());
               let sm = !!executor.roles.find(r=>r.name==module.exports.e.sm_role_name);
               if (entry.extra.channel.id === message.channel.id
               && (sm)
               && (entry.target.id === message.author.id)

               //&& (entry.createdTimestamp > (Date.now() - 5000))
               
               && (entry.extra.count >= 1)) {console.log('ok');
    } else { console.log('field');
            console.log(entry.extra.channel.id === message.channel.id);
            console.log(sm);
            console.log(entry.target.id === message.author.id);
            console.log(entry.createdTimestamp > (Date.now() - 10000));
            console.log(entry.extra.count);
      console.log(entry.createdTimestamp);
               console.log(Date.now());
            console.log(entry.createdTimestamp-Date.now());
  return;
  }
*/
  //____TEST
             //await delay(100);
              let tryes=0;
              let entry = false;
              entry=await module.exports.fetchAuditLog(client,message);console.log(tryes++); 
              if (!entry) {console.log('next');
                           return client.emit('messageDelete',message);
                           //return module.exports.events.messageDelete.run(client.message);
                           return;
                          
                          };
//____TEST
              
              let str = message.guild.members.get(entry.executor.id) ;
              str+=" удалил сообщение ";
              str+=message.author+" "+message.member.user.username+"#"+message.member.user.discriminator;
              let d=new Date(); d.setTime(entry.createdTimestamp);
              str+='\n<#'+entry.extra.channel.id+'> '+d+'\n';
             //  console.log(message.channel);
              str+=message.content;
              module.exports.log(client,message,{description:str});
}catch(err){console.log(err);};}};//
//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands.someCommand={ on:true, aliase:'aliase for that command', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              

}catch(err){console.log(err);};}};//

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
exports.log=async(client,message,action)=>{
try{ 
   let colors={blue:0x3366ff,gray:0x668099,red:0xff0000,red2:0xcc0066,green:0x339980,violet:0x6600cc,dark_blue:0x000066};
   action.color=(action.color&&colors[action.color])?action.color:'gray';
   action.name=(action.name)?action.name:'Удаление сообщения';
   let log_mod=await message.guild.channels.find(r=>r.name==module.exports.e.ch_log_name);
   
   if(!log_mod){console.log('log channel not found'); return;};
  // log_mod.send(message.member+action+"`"+role_name+"`  "+mmb);
  //let str = (all)?message.member+'\n':message.member;
   let emb={fields:[{name:action.name,value:action.description}],timestamp: new Date(),color:colors[action.color]};
   log_mod.send({embed:emb});
}catch(err){console.log(err);};
};//createRole end

//__________________________SUB_FUNCTION
module.exports.fetchAuditLog=async(client,message)=>{try{
//if on this function triggers on ready event (with some delay)
           
           let entry = await message.guild.fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=> audit.entries.first()).catch(err=>console.log(err));
               let executor = message.guild.members.get(entry.executor.id);
               let user = "";

               let sm = !!executor.roles.find(r=>r.name==module.exports.e.sm_role_name);
               if (entry.extra.channel.id === message.channel.id
               && (sm)
               && (entry.target.id === message.author.id)

               //&& (entry.createdTimestamp > (Date.now() - 5000))

               && (entry.extra.count >= 1)) {
 return entry;   } else { 
   console.log(entry.extra.channel.id === message.channel.id);
   console.log(entry.target.id === message.author.id);
   let d=new Date(); d.setTime(entry.createdTimestamp);
   console.log((entry.createdTimestamp > (Date.now() - 5000))+" "+d);
   console.log(entry.extra.count+' count');
  return false;
  }
}catch(err){console.log(err)};};//