//________________________________________INITIATION_PART__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
//_____________SETTINGS
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events={};// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
exports.events_primitive={};//
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      some_phase:['on_lang0','on_lang1']
  
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'
    ,channel_log_name:'1'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
const fs = require('fs');
//_________________________________________EVENTS_PART_________________________________________________
//_______________________e0(first event)
module.exports.events.message={ on:true,  run:async(client,message)=>{try{
//if on this function triggers on deffined event
// code for event            
         // console.log('message dsfs'); 
          if(message.author.id===client.user.id) return;
          if(message.author.bot) return;
          let file=require('./bad_words_source.js');
          let bad_words=file.bad_words;
          let find = false;
          if(message.channel.type=='dm') {return;}
         // if(message.content.same(bad_words)) message.reply('dfsf');
          for(let i=0;i<bad_words.length;i++){
                 //if(message.content.indexOf(bad_words[i])!=-1){message.reply('detected');break;};
                 message.content=" "+message.content+" ";
                 if(message.content.toLowerCase().indexOf(bad_words[i])!=-1){
                    let w = bad_words[i];
                    message.content=message.content.replace(w,'**'+bad_words[i]+'**');
                    find=true;
                  };//
           };//
           if(!find)  return;
            let chnl_log = message.guild.channels.find(ch=>ch.name==module.exports.e.channel_log_name);
            let link="https://discordapp.com/channels/"+message.guild.id+"/"+message.channel.id+"/"+message.id;
          //let str=message.channel+" "+message.content
     
         let user_info=message.member.user.tag+' '+message.member.nickname;
        let str = "<@"+message.member.id+">"+":"+message.content.trim()+" [link]("+link+")";
  if(chnl_log) await chnl_log.send({embed:{fields:[{name:user_info+" "+message.channel.name,value:str}]}});
           //await  message.delete();

           return;
}catch(err){console.log(err);};}};//
//_______________________e1(next event)
// ...
//_________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//______________________c0(first command)
module.exports.commands.someCommand={ on:true, aliase:'aliase_for_command', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              message.reply('test');
// code for command
}catch(err){console.log(err);};}};//
//_____________________c1(next command)
// ...
//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
//____________________b0(first boots)
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//
//____________________b1(next boot)
// code for boot
//___________________________________________BOOTS_PART_END______________________________________________
//____________________SUB_FUNCTION
//______sb0
module.exports.sub_commands=async(client,message,mmb)=>{try{
// code for sub commands        
}catch(err){console.log(err);};};//
//______sb1
/*
//______________________________EVENTS PRIMITIVE
//__E0
module.exports.events_primitive.MESSAGE_DELETE={ on:true,  run:async(client,event)=>{try{
          
           console.log('MESSAGE DELETE PRIMITIVE');
}catch(err){console.log(err);};}};//
*/
//_____________________________ADDITIONS

//let bad_words=['уфф','лол'];
let back=['Ругаться матом - не гостипримно и не по транссерфингу!','Маты засоряют чакры!','Инфантил!','Это не конструктивно, лучше линукс установи чем ругаться'];
//___________