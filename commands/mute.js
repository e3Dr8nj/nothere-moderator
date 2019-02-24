//________________________________________INITIATION_PART__________________________________________
let ph={};
ph.unmute=['размуть','потом','нит <:28:402137551961325598>','размутил','Сам размуть, я устал..'];
ph.warn=['За следующее нарушение будет мут. <:34:402137690318962688>  '];
ph.mute=['Рандомный объект замучен.'];
//_____________SETTINGS
//ORIGINAL VERSON
const sqlite = require('../modules/aa-sqlite');
//const sqlite = require('aa-sqlite');
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)

exports.events={};// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
exports.delay=async(duration)=>{ await new Promise( resolve=>setTimeout(resolve,duration)  ); };
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     ch_log_name:'лог-мод'
    ,bd_name:'BD_muted2.bd'
    ,table_name:'table_11' 
    ,min_tag_time: 10*1000*60
    ,mute_role_name:'Muted'
    ,moderator_name:'Модератор'
    ,super_moderator_name:'Супермодератор'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
let limiter=10*24*60*60*1000;
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.someEvent={ on:true,  run:async(client,event_parametrs)=>{try{
//if on this function triggers on deffined event
              

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART________________________________________________
//______________________c-2
module.exports.commands.muteWarn={ on:true, aliase:'варн!', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
             
             let allow_warn=await module.exports.check(client,message,message.member,'actor');
              
              let super_moderator_role = message.member.guild.roles.find(r=>r.name==module.exports.e.super_moderator_name);
              if(!!super_moderator_role&&message.member.roles.get(super_moderator_role.id)){allow_warn=true;};
              if(!allow_warn) {return message.channel.send(message.member+' У вас недостаточно прав, лалка');};
             let mmb = message.mentions.members.first();
              if(!mmb){
                   //let rnd = Math.floor(Math.random()*ph.warn.length);           
                   message.channel.send( 'Незнание закона не освобождает от ответственности. <#301319871981944834>'); return;
              };
              let rnd = Math.floor(Math.random()*ph.warn.length);           
                    message.channel.send(mmb+" "+ph.warn[rnd]);
                    await module.exports.log(client,message,{name:'Предупреждение',description:' предупредил '+mmb+' '+mmb.user.username+mmb.user.discriminator+' ',color:'red2'});
              return;        

}catch(err){console.log(err);};}};//

//______________________c-1
module.exports.commands.muteHelp={ on:true, aliase:'мутхелп', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              let prefix='\\';
              let str=prefix+'[мутхелп]-инфо \n';
              str+=prefix+'[бот-лалка]-самомут на рнд. время (30м-3ч) \n';
              str+=prefix+'[размуть <участник сервера>]-размут \n';
              str+=prefix+'[помолчика <участник сервера> (1д 10ч 30м)* --<причина>]-мут/временный* \n';
              str+=prefix+'[варн!<участник сервера> --<причина>]-варн участнику сервера \n';
              str+=prefix+'пс:Команды работают и без упоминаний, но это не точно.';
              message.channel.send(str,{code:'ini'});
              
              return;        

}catch(err){console.log(err);};}};//

//______________________c0
module.exports.commands.selfmute={ on:true, aliase:'бот-лалка', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              let emoji = message.guild.emojis.get('402137670345687050');
              if(!!emoji)  await message.react(emoji); 
              let rnd_time=Math.ceil(Math.random()*18+3)*10*60*1000; 
             //message.channel.send(rnd_time);
              let mmb = message.member;
                let rnd = Math.floor(Math.random()*3);
                if(rnd==0) return message.channel.send(mmb+' сам лалка');
                if(rnd==1) return message.channel.send(mmb+' уфф');
              //if(!mmb){message.channel.send('щас буду мутить, мля'); return;};
              message.channel.send(mmb+' Замучен на '+Number(rnd_time)/(60*1000)+' минут'); 
              //return;
              let current_time = new Date().getTime();
              let terminal_time=current_time+rnd_time;
              let time = terminal_time;
              await module.exports.insertMmbRoles(client,message,mmb,time);
           
              await module.exports.log(client,message,{name:'Оскорбление бота',description:mmb.user.username+mmb.user.discriminator +' оскорбил бота и был за это замучен на '+Number(rnd_time)/(60*1000)+' минут',color:'violet'});
              return;        

}catch(err){console.log(err);};}};//
//_______________________c1
module.exports.commands.unmute={ on:true, aliase:'размуть', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              
             let allow_unmute=await module.exports.check(client,message,message.member,'actor');
             
              let super_moderator_role = message.member.guild.roles.find(r=>r.name==module.exports.e.super_moderator_name);
              if(!!super_moderator_role&&message.member.roles.get(super_moderator_role.id)){allow_unmute=true;};
              if(!allow_unmute) {return message.channel.send('У вас недостаточно прав, лалка');};
              
              let mmb = message.mentions.members.first();
             if(!mmb){
                    let rnd = Math.floor(Math.random()*ph.unmute.length);           
                    message.channel.send(ph.unmute[rnd]); return;
          };//if mmb to unmute is not defined
             // message.channel.send('И пусть бы дальше познавали пустотность бытия.. <:33:402137670345687050> ');
              message.channel.send(mmb+' Снимается печать немоты. <:43:402137908334821376> ');
              await module.exports.delay(1000);
              message.channel.send(' Происходит восстановление ролей доступа.');
              let resolve = await module.exports.unmute(client,message,mmb.user.id,0);
              if(resolve=='apsend') return message.channel.send(mmb+' Объект не найден среди замученных..');;
              
              //await module.exports.delay(1000);
              message.channel.send(' Дождитесь полной интеграции.');
              
              await module.exports.log(client,message,{name:'Размут',description:' размутил '+mmb+' '+mmb.user.username+mmb.user.discriminator,color:'green'});
              return;  



}catch(err){console.log(err);};}};//
//______________________c2
module.exports.commands.timemute={ on:true, aliase:'помолчика', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              let allow_mute=await module.exports.check(client,message,message.member,'actor');

              let super_moderator_role = message.member.guild.roles.find(r=>r.name==module.exports.e.super_moderator_name);
              if(!!super_moderator_role&&message.member.roles.get(super_moderator_role.id)){allow_mute=true;};

              if(!allow_mute) {return message.channel.send('У вас недостаточно прав, лалка');};
              let mmb = message.mentions.members.first();
              if(!mmb){
                //message.channel.send('Укажите жертву'); return;
                let rnd = Math.floor(Math.random()*2);
                 if(rnd==0){message.channel.send('Рандомный объект замучен'); return;};
                 message.channel.send(message.member+' Снимаются роли доступа');
                 await module.exports.insertMmbRoles(client,message,message.member,2*1000*60);
                message.channel.send(' Накладывается печать немоты 🤐');
                await module.exports.delay(2*1000*60);
                       // return module.exports.commands.unmute.run(client,message,mmb,0);
                      return module.exports.unmute(client,message,message.member.user.id,0);
              };
              let allow_be_muted=await module.exports.check(client,message,mmb,'acted');//--
             
              //message.reply(!!allow_be_muted);
              if(!!super_moderator_role&&message.member.roles.get(super_moderator_role.id)){allow_be_muted=true;};
              
              if(message.guild.owner.id==message.member.user.id){allow_be_muted=true;};
              //if(!!super_moderator_role&&mmb.roles.get(super_moderator_role.id)){allow_be_muted=false;};
              if(!allow_be_muted) {return message.channel.send('У вас недостаточно прав, лалка');};
              //return;
              let base_part=message.content.split('>')[1];
              if(base_part.indexOf('--')!=-1) base_part=base_part.split('--')[0];
              args=base_part.trim().split(' ');
              //args=args.slice(2);
              if(args.length==0){
                      //message.channel.send(mmb+' вечный мут, мля!'); 
                      message.channel.send(mmb+' Снимаются роли доступа');
                      await module.exports.insertMmbRoles(client,message,mmb,limiter);
                      
                     //await module.exports.delay(1000);
                     message.channel.send(' Объект замучен на ∞ время.');
                    
                      return;
              };//if no args 
              let times = 0; let n = 0; let time_str='';
              for(let i=0;i<args.length;i++){
                     n=0;
                    if(args[i].endsWith('м')){  n = parseInt(args[i]); n=n*1000*60; times+=n; console.log(n+' '+'minutes');  };
                    if(args[i].endsWith('ч')){  n = parseInt(args[i]); n=n*1000*60*60; times+=n; console.log(n+' '+'hourses');  };
                    if(args[i].endsWith('д')){  n = parseInt(args[i]); n=n*1000*60*60*24; times+=n; console.log(n+' '+'days'); };
              };//for end
              if(Number.isNaN(times)){message.reply('Не верно указанное время, или не добавлено -- два дефиса после ника нарушителя.'); return;};
             
             message.channel.send(mmb+' Снимаются роли доступа.');
             let more=false;
             if(Number(times)>limiter) {times=limiter;more=true;}; 
  
              let current_time = new Date().getTime();
              let terminal_time=current_time+times;
              let time = terminal_time;
              let limit = module.exports.e.min_tag_time;

              await module.exports.insertMmbRoles(client,message,mmb,time);
              message.channel.send(' Накладывается печать немоты 🤐');
              base_part=(base_part!=' ')?base_part:'неопределенное время';
              let a_time=(more)?'||10д||':'';
              await module.exports.log(client,message,{name:'Мут',description:' замутил на '+base_part+a_time+' '+mmb+' '+mmb.user.username+mmb.user.discriminator,color:'red'});
              if(Number(times)<=limit){
                        console.log('les then limite run timer');
                        await module.exports.delay(times);
                       // return module.exports.commands.unmute.run(client,message,mmb,0);
                      return module.exports.unmute(client,message,mmb.user.id,0);
              };//if less end
              if(Number(times)>limit){
                        console.log('more then limite break');
                        return;
              };//if more end
                
}catch(err){console.log(err);};}};//
//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
               let bool = true;
               while(bool){  
                    await module.exports.checkBD(client);
                    await module.exports.delay(module.exports.e.min_tag_time);
               };
}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
//_______________________________________SUB_FUNCTION_______________________
//___________sf0
 exports.insertMmbRoles=async(client,message,mmb,time)=>{try{
           //let sqlite = require('../modules/aa-sqlite');
           let bd_name = module.exports.e.bd_name;
           let table_name = module.exports.e.table_name;
           let mmb_id=mmb.user.id;
           let roles_key_arr = await mmb.roles.keyArray().slice();
           let roles=roles_key_arr.join(',');
           //let time=1000;
           let resolve={};
           await sqlite.open(`./${bd_name}`).catch(err=>console.log(err));
           resolve = await sqlite.get(`SELECT * FROM ${table_name} WHERE user_id=='${mmb_id}' `).then(raw=>{return (raw)?'has':'apsend';}).catch(err=>console.log(err));
         
          if(!resolve){
                 console.log('no table');
                 resolve = await sqlite.run(`CREATE TABLE IF NOT EXISTS ${table_name} (user_id TEXT PRIMARY KEY,roles_ids TEXT,time TEXT) `).then(r=>{return true;}).catch(err=>console.log(err));
                 
                  if(!resolve){console.log('table does not created return');return;};
                  if(resolve){console.log('table created'); };//resolve end
                  resolve = await sqlite.run(`INSERT INTO ${table_name} (user_id,roles_ids,time) VALUES('${mmb_id}','${roles}','${time}') `).then(r=>{console.log('mmb add into table');return true;}).catch(err=>console.log(err));
                  
           }else if(resolve=='apsend'){
                  resolve = await sqlite.run(`INSERT INTO ${table_name} (user_id,roles_ids,time) VALUES('${mmb_id}','${roles}','${time}') `).then(r=>{console.log('mmb add into table');return true;}).catch(err=>console.log(err)); 
           }else if(resolve=='has'){
                  resolve = await sqlite.run(`UPDATE  ${table_name} SET time=='${time}' WHERE user_id=='${mmb_id}'  `).then(r=>console.log('mmb info update')).catch(err=>console.log(err));
            };//if end   
           let table = await sqlite.all(`SELECT * FROM ${table_name} `).then(raw=>{return raw;}).catch(err=>console.log(err));
           console.log(table);
//_________________________
/*
           let date = new Date().getTime();
           console.log(date);
           let mute_time = 5*60*1000;
           let date2=date+mute_time;
           console.log(date2);
*/
//_________________________
//delete roles from mmb
           let role={};
           for (let i=0;i<roles_key_arr.length;i++){
              role =await mmb.guild.roles.get(roles_key_arr[i]);  
              await module.exports.delay(3*1000);   
              if(role.name!='@everyone') {try{
                await mmb.removeRole(role);
              }catch(err){console.log(err);};
              }//if not everyone
           };//for end
           //message.reply('all roles removed from mmb');
           await module.exports.roleMute(client,mmb,'add');

}catch(err){console.log(err);};};//insertMmbRoles end
//_____________sf1
exports.unmute=async(client,message,mmbID,time)=>{try{
          console.log('unmute after '+time);
          await module.exports.delay(time+(1000*10));
          let mmb = await client.guilds.get(client.SERVER_ID).members.get(mmbID);
          if(!mmb) {console.log('no mmb'); return;};
          await module.exports.roleMute(client,mmb,'remove');
          console.log('unmuting member '+mmb.user.username);
          //let sqlite = require('../modules/aa-sqlite');
          let bd_name = module.exports.e.bd_name;
          let table_name = module.exports.e.table_name;
          let mmb_id=mmb.user.id;
          let resolve={};
          await sqlite.open(`./${bd_name}`).catch(err=>{console.log(err);});
          resolve = await sqlite.get(`SELECT * FROM ${table_name} WHERE user_id=='${mmb_id}'`).then(raw=>{
              if(raw){console.log('mmb present in table');return raw;}else{console.log('mmb is apsend in table'); return 'apsend';};
           }).catch(err=>{console.log(err);}) ; 

          console.log(resolve);   
          if(resolve=='apsend') return resolve;
          if(!resolve)  {console.log('table do not exists'); return false;};                                                                                         if(resolve=='apsend'){return;};        
          let roles_key_arr = resolve.roles_ids.split(',');
          
          let role={};
           for (let i=0;i<roles_key_arr.length;i++){
              role =await mmb.guild.roles.get(roles_key_arr[i]);  
              await module.exports.delay(3*1000);   
              if(role.name!='@everyone') await mmb.addRole(role);
           };//for end
          
           console.log('all roles recovered to mmb');
           resolve = await sqlite.run(`DELETE FROM ${table_name} WHERE user_id=='${mmb_id}'`).then(r=>{console.log('record deleted');}).catch(err=>console.log(err));
           let table = await sqlite.all(`SELECT * FROM ${table_name} `).then(raw=>{return raw;}).catch(err=>console.log(err));
           console.log(table);
           
//roles recovery
//delete record from table          

}catch(err){console.log(err);};};//getRolesMmb end
//__________________sf2

//_____________sf1
exports.checkBD=async(client)=>{try{
          //let sqlite = require('../modules/aa-sqlite');
          let bd_name = module.exports.e.bd_name;
          let table_name = module.exports.e.table_name;
      
          let resolve={};
          await sqlite.open(`./${bd_name}`).catch(err=>{console.log(err);});
          let table = await sqlite.all(`SELECT * FROM ${table_name} `).then(raw=>{return raw;}).catch(err=>console.log(err));
          //console.log(table);
          //let time_arr=[];
          let current_time=new Date().getTime();
          let i_time=0; let tag=0;
          for(let i=0;i<table.length;i++){
              i_time=table[i].time;
              tag=Number(i_time)-Number(current_time);
              console.log('current time '+current_time+' table time '+i_time+' tag '+tag); 
              
              //console.log( 'time ' +table[i].time );
              
              
             
              if(tag<=module.exports.e.min_tag_time ){ tag=(tag>=0)?tag:0; 
                    //let mmb = await client.guilds.get(client.SERVER_ID).members.get(table[i].user_id);                                
                     module.exports.unmute(client,{},table[i].user_id,tag);
                     console.log('READY TO UNMUTE');
              };
                 
           };//for end

}catch(err){console.log(err);};};//getRolesMmb end

//_______________sf2
exports.roleMute=async(client,mmb,action)=>{try{

         let role = mmb.guild.roles.find(r=>r.name==module.exports.e.mute_role_name);
         if(!role) {console.log('there are not that role'); return;};
         await module.exports.delay(3*1000);
         (action=="add")?mmb.addRole(role):mmb.removeRole(role);

}catch(err){console.log(err);};};//exports roleMute end

exports.check=async(client,message,mmb,person)=>{try{
         
         

         if(mmb.guild.owner.id==mmb.user.id&&person=='acted') {
           //message.channel.send('Owner cannot be muted 0');
           return false;};
         if(mmb.guild.owner.id==mmb.user.id&&person=='actor') {
           //message.channel.send('Owner 1');
           return true;};
         if(person=='acted'&&mmb.user.id==client.user.id){ 
           //message.channel.send('I am bot cannot be muted 0');
           return false;};
         if(person=='acted'&&mmb.user.bot==true){ 
           //message.channel.send('Bot cannot be muted 0');
           return false;};
         let role = mmb.guild.roles.find(r=>r.name==module.exports.e.moderator_name);
         if(!role) {message.channel.send('Необходимо создать роль "Модератор", только люди с этой ролью и владелец сервера могут использовать мутить'); return false;};
         if(mmb.roles.get(role.id)&&person=='actor'){
           //message.channel.send('Moderator 1');
           return true;};
         if(mmb.roles.get(role.id)&&person=='acted'){
           //message.channel.send('Moderator cannot be muted 0');
           return false;};
        if(person=='actor') {
          //message.channel.send('Модеры зовут меня пуся, но ты зови меня - Робокоп. 0'); 
          return false;};
         if(person=='acted'){return true;};
         return ;

}catch(err){console.log(err);};};//exports roleMute end
//_________SF
exports.log=async(client,message,action,role_name,mmb)=>{
try{ 
   let colors={blue:0x3366ff,gray:0x668099,red:0xff0000,red2:0xcc0066,green:0x339980,violet:0x6600cc,dark_blue:0x000066};
   action.color=(action.color&&colors[action.color])?action.color:'dark_blue';
   let cose='';
   if(message.content.indexOf('--')!=-1) {cose = '\n причина: '+message.content.split('--')[1];}; 
   let log_mod=await message.guild.channels.find(r=>r.name==module.exports.e.ch_log_name);
   if(!log_mod){console.log('log channel not found'); return;};
  // log_mod.send(message.member+action+"`"+role_name+"`  "+mmb);
   let emb={fields:[{name:action.name,value:message.member+action.description+cose}],timestamp: new Date(),color:colors[action.color]};
   log_mod.send({embed:emb});
}catch(err){console.log(err);};
};//log end
