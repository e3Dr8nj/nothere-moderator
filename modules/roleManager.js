//________________________________________INITIATION_PART__________________________________________
//_____________SETTINGS
exports.active=false;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events=false;// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots=false;// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.someEvent={ on:true,  run:async(client,event_parametrs)=>{try{
//if on this function triggers on deffined event
              

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//__________c-1
module.exports.commands.roleHelp={ on:true, aliase:'рольхелп2', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              let px=client.prefix;
              let str='';
              str+='['+px+'рольСоздать <название роли>,<позиция>]-создать роль на заданной позиции\n';
              str+='['+px+'рольПозиция <название роли>]-показать позицию роли\n';
              str+='['+px+'рольПоменятьПозицию <название роли>,<позиция>]-поменять позицию роли\n';
              str+='['+px+'рольДать <упоминания участников>,<название ролей через запятую>]-выдать роли участникам\n';
              str+='['+px+'рольУдалить <название роли>]-удалить роль\n';
             message.channel.send(str,{code:'ini'});
}catch(err){console.log(err);};}};//
//_______c0
module.exports.commands.roleCreate={ on:true, aliase:'рольСоздать', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              args.shift(); console.log(args); 
             let args2=args.join(' ').split(',');
             let role_name = args2[0];
             let role_pos = args2[1];
              if(!role_name){message.channel.send('задайте название роли'); return;}; 
              if(!role_pos){message.channel.send('задайте позицию роли'); return;};
             
             let role = await module.exports.createRole(client,message,role_name,role_pos);
               if(role){message.channel.send('Роль создана');};
            return;
}catch(err){console.log(err);};}};//
//_______c1
module.exports.commands.changePosRole={ on:true, aliase:'рольПоменятьПозицию', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
             args.shift(); console.log(args); 
             let args2=args.join(' ').split(',');
             let role_name = args2[0];
             let role_pos = args2[1];
              if(!role_name){message.channel.send('задайте название роли'); return;}; 
              if(!role_pos){message.channel.send('задайте позицию роли'); return;}; 
              console.log(role_name+' pos '+role_pos);
             let role = await module.exports.changePosRole(client,message,role_name,role_pos);
               if(role){message.channel.send('Позиция роли изменена');};
            return;
}catch(err){console.log(err);};}};//
//_______c2
module.exports.commands.giveRole={ on:true, aliase:'рольДать', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
           if(!message.mentions.members.first()){message.channel.send('кому роль дать?'); return;};
            let mmbs = message.mentions.members.keyArray();
            let msg_cnt =message.content.split('>');
            let role_names = msg_cnt[msg_cnt.length-1].trim().split(',');
            console.log(role_names);
            for(let i=0;i<role_names.length;i++){ console.log(role_names[i]);
             
                    for(let ii=0;ii<mmbs.length;ii++){
                        try{
                            let mmb= await message.member.guild.fetchMember(mmbs[ii]).catch(err=>console.log(err));
                            console.log(mmb.user.username);
                            await module.exports.giveRole(client,message,mmb,role_names[i]);
                         }catch(err){console.log(err);};
                    };//for ii end
             
            };//for end
            message.channel.send('роли добавлены');
            return;
}catch(err){console.log(err);};}};//
//_______c3
module.exports.commands.roleShowPos={ on:true, aliase:'рольПозиция', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
             args.shift(); console.log(args); 
             //let args2=args.join(' ').split(',');
             let role_name = args.join(' ');
             if(!role_name){message.channel.send('задайте название роли'); return;}; 
             let role = await message.member.guild.roles.find(r=>r.name==role_name);
             if(!role){message.channel.send('роль не найдена'); return;};
             let role_count = message.guild.roles.keyArray().length;
             let role_pos=role_count-Number(role.position);
             message.channel.send('позиция роли '+role_pos);
            return;
}catch(err){console.log(err);};}};//
//_______c4
module.exports.commands.roleDelete={ on:true, aliase:'рольУдалить', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
             args.shift(); console.log(args);
             let role_name = args.join(' ');
             if(!role_name){message.channel.send('задайте название роли'); return;}; 
             let role = await message.member.guild.roles.find(r=>r.name==role_name);
             if(!role){message.channel.send('роль не найдена'); return;};
             let resolve = await role.delete().then(deleted=>message.channel.send('роль удалена')).catch(err=>console.log(err));
             
            return;
}catch(err){console.log(err);};}};//
//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
//______________________________SUB__FUNCTIONS
//_______SF0
exports.createRole=async(client,message,role_name,pos)=>{
try{
  
   let prmtrs=[role_name,'black'];
   let role_type='for color';
   let role_=await message.guild.createRole({
      name:prmtrs[0],
      color:prmtrs[1],
   }).then(role=>{
      //message.channel.send('роль создана');
      let role_count = message.guild.roles.keyArray().length;
      let position = (role_type=='for color')?role_count-(Number(pos)):(role_type=='special')?Math.floor((role_count-4)/2):1;
     // console.log(role_count);
      message.guild.setRolePosition(role,position,false);
      return role;
    }).catch(error=>{message.channel.send(error.message);});
    return role_;

}catch(err){console.log(err);};
};//createRole end
//______SF1
exports.changePosRole=async(client,message,role_name,pos)=>{
try{
  
   let prmtrs=[role_name,'black'];
   let role_type='for color';
   let role_=await message.guild.roles.find(r=>r.name==role_name);
   if(!role_){message.channel.send('роль не найдена'); return;};
      let role_count = message.guild.roles.keyArray().length;
      let position = (role_type=='for color')?role_count-(Number(pos)):(role_type=='special')?Math.floor((role_count-4)/2):1;
    
      message.guild.setRolePosition(role_,position,false);
     
    
    return role_;

}catch(err){console.log(err);};
};//createRole end
//_______SF2
exports.giveRole=async(client,message,mmb,role_name)=>{
try{ 
   let role_=await message.guild.roles.find(r=>r.name==role_name);
   if(!role_){message.channel.send('роль не найдена '+role_name); return;};
    await mmb.addRole(role_); message.channel.send('role add '+role_name);
    return;
}catch(err){console.log(err);};
};//createRole end

//_______SF3
exports.giveRole2=async(client,message,mmb,role_name)=>{
try{
   let role_=await message.guild.roles.find(r=>r.name==role_name);
   if(!role_){message.channel.send('роль не найдена '+role_name); return;};
    await mmb.removeRole(role_); 
}catch(err){console.log(err);};
};//createRole end