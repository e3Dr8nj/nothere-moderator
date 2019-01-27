//________________________________________INITIATION_PART__________________________________________
//_____________SETTINGS
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events=false;// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots=false;// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 

const aliase ={
  'Адепты Хаоса':{name:'Адепты Хаоса',add:true,remove:true}
  ,'Временная роль':{name:'Временная роль',add:true,remove:true}
  ,'Уже почти!':{name:'Уже почти!', add:true,remove:true}
  ,'Лампочка':{name:'Лампочка',add:true, remove:true}
  ,'*':{name:'*',add:true, remove:true}
  ,'Кто все эти люди':{name:'Кто все эти люди',add:true,remove:true}
  ,'Модератор':{name:'Модратор',add:false,remove:true}
  ,'Сумеречные':{name:'Сумеречные',add:false,remove:true}

  
};

exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
     ,sm_role_name:'Супермодератор'
     ,ch_log_name:'лог-мод'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.someEvent={ on:true,  run:async(client,event_parametrs)=>{try{
//if on this function triggers on deffined event
              

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//__________c-1
module.exports.commands.roleHelp={ on:true, aliase:'рольхелп', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              let px=client.prefix;
              let str='';
              str+='['+px+'cнять <@nick1><@nick2> <роль1>,<роль2>]- снять роли \n';
              str+='['+px+'выдать <@nick1><@nick2> <роль1>,<роль2>]- выдать роли \n';
             // str+='['+px+'поменять <@nick> <роль1>,<роль2>]- поменять роли \n';
              str+='роль (снять дать) \n';
              str+='Адепты Хаоса (++)\n Кто все эти люди (++) \n Уже почти (++)\n Лампочка (++)\n * (++)\n';
              str+='Модератор (+-)\n Сумеречные (+-) \n';
            //  str+='['+px+'рольПозиция <название роли>]-\n';
            // str+='['+px+'рольПоменятьПозицию <название роли>,<позиция>]-поменять позицию роли\n';
            // str+='['+px+'рольДать <упоминания участников>,<название ролей через запятую>]-выдать роли участникам\n';
            //  str+='['+px+'рольУдалить <название роли>]-удалить роль\n';
             message.channel.send(str,{code:'ini'});
}catch(err){console.log(err);};}};//
//_______c0
module.exports.commands.giveRole={ on:true, aliase:'выдать', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
           let isAble=await module.exports.isAble(client,message);
           if(!isAble) return false;
           if(!message.mentions.members.first()){message.channel.send('кому роль выдать?мля'); return;};
            let mmbs = message.mentions.members.keyArray();
            let msg_cnt =message.content.split('>');
            let role_names = msg_cnt[msg_cnt.length-1].trim().split(',');
            console.log(role_names);
            for(let i=0;i<role_names.length;i++){ console.log(role_names[i]);
             
                    for(let ii=0;ii<mmbs.length;ii++){
                        try{
                            let mmb= await message.member.guild.fetchMember(mmbs[ii]).catch(err=>console.log(err));
                            console.log(mmb.user.username);
                            let r_n = (role_names[i].startsWith(' '))?role_names[i].slice(1):role_names[i];
                            await module.exports.giveRole(client,message,mmb,r_n);
                         }catch(err){console.log(err);};
                    };//for ii end
             
            };//for end
           // message.channel.send('ок');
            return;
}catch(err){console.log(err);};}};//

//_______c2
module.exports.commands.removeRole={ on:true, aliase:'снять', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
           let isAble=await module.exports.isAble(client,message);
           if(!isAble) return false;
           if(!message.mentions.members.first()){message.channel.send('у кого роли снимать?мля'); return;};
            let mmbs = message.mentions.members.keyArray();
            let msg_cnt =message.content.split('>');
            let role_names = msg_cnt[msg_cnt.length-1].trim().split(',');
            console.log(role_names);
            for(let i=0;i<role_names.length;i++){ console.log(role_names[i]);
             
                    for(let ii=0;ii<mmbs.length;ii++){
                        try{
                            let mmb= await message.member.guild.fetchMember(mmbs[ii]).catch(err=>console.log(err));
                            console.log(mmb.user.username);
                            let r_n = (role_names[i].startsWith(' '))?role_names[i].slice(1):role_names[i];
                            await module.exports.removeRole(client,message,mmb,r_n);
                         }catch(err){console.log(err);};
                    };//for ii end
             
            };//for end
            //message.channel.send('роли сняты или добавлены (но это не точно)');
           
            return;
}catch(err){console.log(err);};}};//
//_______c3

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
//______________________________SUB__FUNCTIONS
//_______SF0

//_______SF1
exports.giveRole=async(client,message,mmb,role_name)=>{
try{ 
  
   if(!aliase[role_name]||aliase[role_name].add===false) {
        message.channel.send(role_name+' роль не доступна для данной манипуляций или не существует');
        return;
   };
   role_name=aliase[role_name].name;
   let role_=await message.guild.roles.find(r=>r.name==role_name);
   if(!role_){message.channel.send(role_name+'роль не найдена '+role_name); return;};
   await mmb.addRole(role_); 
   message.channel.send(role_name+' роль добавлена '+mmb.user.username);
   await module.exports.log(client,message,' выдал роль: ',role_name,mmb);
   return;
}catch(err){console.log(err);};
};//createRole end
//_______SF2
exports.removeRole=async(client,message,mmb,role_name)=>{
try{ 
  
   if(!aliase[role_name]||aliase[role_name].remove===false) {message.channel.send(role_name+' роль не доступна для данной манипуляций или не существует'); return;};
   role_name=aliase[role_name].name;
   let role_=await message.guild.roles.find(r=>r.name==role_name);
   if(!role_){message.channel.send(role_name+'роль не найдена '+role_name); return;};
    await mmb.removeRole(role_); message.channel.send(role_name+' роль снята c '+mmb.user.username);
    await module.exports.log(client,message,' снял роль: ',role_name,mmb);
    return;
}catch(err){console.log(err);};
};//createRole end
//_______SF3
exports.isAble=async(client,message)=>{
try{ 
   return true;
   if(message.member.user.id==message.guild.owner.id) return true;
   let role_=await message.guild.roles.find(r=>r.name==module.exports.e.sm_role_name);
   if(!role_){message.channel.send('роль не найдена '+module.exports.e.sm_role_name); return false;};
   if(message.member.roles.find(r=>r.name==module.exports.e.sm_role_name)){return true;};
    message.channel.send(message.member+' не достаточно прав');
    return false;
}catch(err){console.log(err);};
};//createRole end
//_______SF4
exports.log=async(client,message,action,role_name,mmb)=>{
try{ 
   
   
   let log_mod=await message.guild.channels.find(r=>r.name==module.exports.e.ch_log_name);
   if(!log_mod){console.log('log channel not found'); return;};
   log_mod.send(message.member+action+"`"+role_name+"`  "+mmb);
   
}catch(err){console.log(err);};
};//createRole end



