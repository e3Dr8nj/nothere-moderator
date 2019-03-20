//________________________________________INITIATION_PART__________________________________________
//_____________SETTINGS
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events=false;// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots=false;// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 

const aliase ={
  'адепты хаоса':{name:'адепты хаоса',add:true,remove:true}
  ,'временная роль':{name:'временная роль',add:false,remove:true}
  ,'странники':{name:'странники', add:true,remove:true}
  ,'лампочка':{name:'💡',add:true, remove:true}
  ,'звездочка':{name:'✴',add:true, remove:true}
  ,'кто все эти люди':{name:'кто все эти люди',add:true,remove:true}
  ,'модератор':{name:'модератор',add:false,remove:true}
  ,'сумеречные':{name:'сумеречные',add:false,remove:true}
};

const self_roles ={
  'dj':{name:'dj',add:true,remove:true}
  ,'пинг':{name:'💥',add:true,remove:true}
 ,'токсик':{name:'☠',add:true,remove:true}
 ,'craig':{name:'craig', add:true,remove:true}
  ,'викторина':{name:'v', add:true,remove:true}
 // ,'лампочка':{name:'💡',add:true, remove:true}
 // ,'звездочка':{name:'✴',add:true, remove:true}
 // ,'кто все эти люди':{name:'кто все эти люди',add:true,remove:true}
 // ,'модератор':{name:'модератор',add:false,remove:true}
 // ,'сумеречные':{name:'сумеречные',add:false,remove:true}
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
let total_log='';
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.someEvent={ on:true,  run:async(client,event_parametrs)=>{try{
//if on this function triggers on deffined event
              

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//__________c0
module.exports.commands.roleHelp={ on:true, aliase:'рольхелп', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              let isAble=await module.exports.isAble(client,message);
              let str =''; let px=client.prefix;
  /*
              str+='['+px+'роль +роль1] взять роль1\n';
              str+='['+px+'роль -роль1] снять роль1\n';
              str+='['+px+'роль +роль1,-роль2]\n*взять роль1 снять роль2\n';
              str+='  +/-DJ\n  +/-craig\n  +/-токсик\n +/-пинг\n +/-викторина\n';
  */
              if(isAble){
                  str+='['+px+'роль @nick1 +роль1,-роль2,-роль3]\n';
                  str+='['+px+'роль @nick1 @nick2 +роль1,+роль2,-роль3]\n*+выдать роль -снять роль \n';
                  str+='  +/-Адепты Хаоса\n  +/-Кто все эти люди\n  +/-Странники\n  -Временная роль\n  +/-Лампочка\n  +/-Звездочка\n';
                  str+='  -Модератор\n  -Сумеречные\n';
              };//isAble true;
              if(!isAble) {return;};
              message.channel.send(str,{code:'ini'});
}catch(err){console.log(err);};}};//
//_______c1
module.exports.commands.manipuleRole={ on:true, aliase:'роль', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
           total_log='';
           if(!message.mentions.members.first()){
             
             return module.exports.selfRoles(client,message);
           };//selfroles mode
           let isAble=await module.exports.isAble(client,message);
           if(!isAble) {
             message.channel.send(message.member+' недостаточно прав');
             return false;}
           
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
                            if(r_n.startsWith('-')){
                                r_n=r_n.slice(1); 
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.removeRole(client,message,mmb,r_n,aliase); 
                            }else if(r_n.startsWith('+')){
                                r_n=r_n.slice(1); 
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.giveRole(client,message,mmb,r_n,aliase); 
                            }else{
                                r_n=r_n.slice(1);
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.giveRole(client,message,mmb,r_n,aliase); 
                            };
                         }catch(err){console.log(err);};
                    };//for ii end
             
            };//for end
           // message.channel.send('ок');
             module.exports.log(client,message,{description:total_log,color:'blue'},true);
             total_log='';
             return;
}catch(err){console.log(err);};}};//

//_______c

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
//______________________________SUB__FUNCTIONS
//_______SF0

//_______SF1
exports.giveRole=async(client,message,mmb,role_name,aliase)=>{
try{ 
   role_name=role_name.toLowerCase();
   if(!aliase[role_name]||aliase[role_name].add===false) {
        message.channel.send(role_name+' - роль неверно указана, или недоступна для данной манипуляции. \\'+client.prefix+'рольхелп');
        return;
   };
   role_name=aliase[role_name].name.toLowerCase();
   let role_=await message.guild.roles.find(r=>r.name.toLowerCase()==role_name);
   if(!role_){message.channel.send(role_name+' роль не найдена '); return;};
   if(mmb.roles.get(role_.id)) {return;};
   await mmb.addRole(role_); 
   message.channel.send(role_.name+' роль добавлена '+mmb.user.username);
   //await module.exports.log(client,message, {name:'Управление ролями', description:' выдал роль  `'+role_.name+'`  '+mmb+' '+mmb.user.username+mmb.user.discriminator,color:'blue'});
  total_log+=message.member+' выдал роль  `'+role_.name+'` '+mmb+' '+mmb.user.username+mmb.user.discriminator+'\n';
  return;
}catch(err){console.log(err);};
};//createRole end
//_______SF2
exports.removeRole=async(client,message,mmb,role_name,aliase)=>{
try{ 
   role_name=role_name.toLowerCase();
   if(!aliase[role_name]||aliase[role_name].remove===false) {message.channel.send(role_name+' роль не доступна для данной манипуляций или не существует'); return;};
   role_name=aliase[role_name].name.toLowerCase();
   let role_=await message.guild.roles.find(r=>r.name.toLowerCase()==role_name);
   if(!role_){message.channel.send(role_name+' роль не найдена '); return;};
   if(!mmb.roles.get(role_.id)) {return;};
    await mmb.removeRole(role_); message.channel.send(role_.name+' роль снята c '+mmb.user.username);
    //await module.exports.log(client,message, {name:'Управление ролями', description:' снял роль  `'+role_.name+'` с '+mmb+' '+mmb.user.username+mmb.user.discriminator,color:'blue'});
   total_log+=message.member+' снял роль  `'+role_.name+'` с '+mmb+' '+mmb.user.username+mmb.user.discriminator+'\n';
    return;
}catch(err){console.log(err);};
};//createRole end
//_______SF3
exports.isAble=async(client,message)=>{
try{ 
   //return true;
   if(message.member.user.id==message.guild.owner.id) return true;
   let role_=await message.guild.roles.find(r=>r.name==module.exports.e.sm_role_name);
   if(!role_){message.channel.send('роль не найдена '+module.exports.e.sm_role_name); return false;};
   if(message.member.roles.find(r=>r.name==module.exports.e.sm_role_name)){return true;};
    //message.channel.send(message.member+' недостаточно прав');
    return false;
}catch(err){console.log(err);};
};//createRole end
//_______SF4
exports.log=async(client,message,action)=>{
try{ 
   let colors={blue:0x3366ff};
   action.name=(action.name)?action.name:'Управление ролями';
   let log_mod=await message.guild.channels.find(r=>r.name==module.exports.e.ch_log_name);
   if(!log_mod){console.log('log channel not found'); return;};
  // log_mod.send(message.member+action+"`"+role_name+"`  "+mmb);
  //let str = (all)?message.member+'\n':message.member;
   if(!action.description) return;
   let emb={fields:[{name:action.name,value:action.description}],timestamp: new Date(),color:colors[action.color]};
   log_mod.send({embed:emb});
}catch(err){console.log(err);};
};//createRole end
//______________sf5
exports.selfRoles=async(client,message)=>{
try{ 
   let str = message.content.split(' '); str.shift(); str=str.join(' ');
   let rls_arr=(str.indexOf(',')!=-1)?str.split(','):[str];
   console.log(rls_arr);
   rls_arr.map(e=>{
       if(e.startsWith('-')){
              module.exports.removeRole(client,message,message.member,e.slice(1),self_roles);
             return;
       };//if -
         if(e.startsWith('+')){
             module.exports.giveRole(client,message,message.member,e.slice(1),self_roles);
             return;
       };//if -
             module.exports.giveRole(client,message,message.member,e,self_roles);
             return;
   });//map end
   total_log='';
   return;
}catch(err){console.log(err);};
};//createRole end
//(node:279) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 guildMemberUpdate listeners added. Use emitter.setMaxListeners() to increase limit

