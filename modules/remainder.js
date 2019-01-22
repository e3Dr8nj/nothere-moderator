//________________________________________INITIATION_PART__________________________________________
//_____________SETTINGS
const sqlite = require('../modules/aa-sqlite');
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
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
     bd_name:'BD_bump.bd'
    ,table_name:'table_2' 
    ,tag_time:1000*60*60*4
     //,tag_time:1000*60*2
    ,chnl_name:'🔌spam-b♻t'
    ,role_name : '💥'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.message={ on:true,  run:async(client,message)=>{try{
//if on this function triggers on deffined event
             
              //if(message.author==client.user) return;
              if(!message.channel.name.startsWith(module.exports.e.chnl_name)) return;
              if(message.content.startsWith('!bump')){
                    let emoji = message.guild.emojis.get('402137551961325598');
                    if(!!emoji) await message.react(emoji); 
                    return;
               };
              if(!message.embeds[0]) return;
              if(message.embeds[0].description.startsWith(':alarm_clock: Next bump point will be available')){
      
                  message.channel.send('<:23:402137284213866496>'); 
                  return;
               };
              if(message.embeds[0].description.startsWith(':white_check_mark: Server bumped!')){
           //if(message.content.startsWith('S')){
//put data next bump time to db
// change channel name
//set awaiter to change channel name


                
               
                let time = new Date();
                let delay_time=module.exports.e.tag_time;
                let msc=time.getTime()+delay_time;
                let newTime = new Date(msc);
                let newTime2 = new Date(msc+1000*60*60*3);
                let time_msc=newTime.getTime();
                console.log(newTime.toString());
                await  module.exports.changeChnlName(client,message.channel,'default');
                module.exports.insertTime(client,message,time_msc);
                module.exports.setAwaiter(client,message.channel,delay_time);
                return;
                };

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands.someCommand={ on:true, aliase:'bumped', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
             let emb={description:':white_check_mark: Server bumped!'};
              message.channel.send({embed:emb});

}catch(err){console.log(err);};}};//

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
          await delay(2*1000);
          let b_channel=client.guilds.get(client.SERVER_ID).channels.find(ch=>ch.name.startsWith(module.exports.e.chnl_name));
          if(!b_channel){console.log('no channel'); return;};
          await module.exports.checkBD(client);

}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
//_______________________________________SUB_FUNCTION_______________________
//___________sf0
 exports.insertTime=async(client,message,time)=>{try{
          
           let bd_name = module.exports.e.bd_name;
           let table_name = module.exports.e.table_name;
           let resolve={};
           await sqlite.open(`./${bd_name}`).catch(err=>console.log(err));
           resolve = await sqlite.get(`SELECT * FROM ${table_name} WHERE name=='bump_time' `).then(raw=>{return (raw)?'has':'apsend';}).catch(err=>console.log(err));
         
          if(!resolve){
                 console.log('no table');
                 resolve = await sqlite.run(`CREATE TABLE IF NOT EXISTS ${table_name} (name TEXT PRIMARY KEY, value TEXT)  `).then(r=>{return true;}).catch(err=>console.log(err));
                 
                  if(!resolve){console.log('table does not created return');return;};
                  if(resolve){console.log('table created'); };//resolve end
                  resolve = await sqlite.run(`INSERT INTO ${table_name} (name,value) VALUES('bump_time','${time}') `).then(r=>{console.log('bump_time value add into table');return true;}).catch(err=>console.log(err));
                  
           }else if(resolve=='apsend'){
                  resolve = await sqlite.run(`INSERT INTO ${table_name} (name,value) VALUES('bump_time','${time}') `).then(r=>{console.log('bump_time value add into table');return true;}).catch(err=>console.log(err)); 
           }else if(resolve=='has'){
                  resolve = await sqlite.run(`UPDATE  ${table_name} SET value=='${time}' WHERE name=='bump_time'  `).then(r=>console.log('bump_time value update')).catch(err=>console.log(err));
            };//if end   
           let table = await sqlite.all(`SELECT * FROM ${table_name} `).then(raw=>{return raw;}).catch(err=>console.log(err));
           console.log(table);
//_________________________



}catch(err){console.log(err);};};//insertTime end

//_____________sf1
exports.checkBD=async(client)=>{try{
         
          let bd_name = module.exports.e.bd_name;
          let table_name = module.exports.e.table_name;
      
          let resolve={};
          await sqlite.open(`./${bd_name}`).catch(err=>{console.log(err);});
          let table = await sqlite.get(`SELECT * FROM ${table_name} WHERE name=='bump_time'`).then(raw=>{return raw;}).catch(err=>console.log(err));
          
          let current_time=new Date().getTime();
          let i_time=0; let tag=0;
//------
         
              i_time=table.value;
              tag=Number(i_time)-Number(current_time);
              console.log('current time '+current_time+' table time '+i_time+' tag '+tag); 
              
              //console.log( 'time ' +table[i].time );
              let chnl = await client.guilds.get(client.SERVER_ID).channels.find(ch=>ch.name.startsWith(module.exports.e.chnl_name));
              
             
              if(tag<=0){ 
                console.log('time is out');     
                return await  module.exports.changeChnlName(client,chnl,'past');
              };
               if(tag>0){ 
                console.log('time is not come ');     
                return  module.exports.setAwaiter(client,chnl,tag);
              };  
             return;
//------------
}catch(err){console.log(err);};};//getCheckBD end

//___________sf2
 exports.changeChnlName=async(client,chnl,newTime)=>{try{ console.log(newTime);
                let str='';
                 if(newTime=='default'){
                 str=module.exports.e.chnl_name;
                 //chnl.send('го бампить!');
                }else if(newTime=='past'){
                 str=module.exports.e.chnl_name+'❗bump';
                 let role = client.guilds.get(client.SERVER_ID).roles.find(r=>r.name==module.exports.e.role_name);
                 role=(!role)?'':role;
chnl.send(role+' го бампить!<:28:402137551961325598>');
                }else{
                    let hours = newTime.getHours(); hours=(hours>9)?hours:'0'+hours;
                    let minutes = newTime.getMinutes(); minutes=(minutes>9)?minutes:'0'+minutes;
                    let time_str = hours+'-'+minutes;
                    console.log(time_str);
                    str=time_str.toString();
                };
                chnl.edit({name:str});
               
}catch(err){console.log(err);};};// exports.changeChnlName end
//___________sf2
 exports.setAwaiter=async(client,chnl,time)=>{try{
                time=(time!=0)?time:1000;
                await delay(time);
                return module.exports.changeChnlName(client,chnl,'past');
}catch(err){console.log(err);};};// exports.setAwaiter end

//draper pressure laura brehm

//draper pressure laura brehm
