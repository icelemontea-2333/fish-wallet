import { encode,decode } from '@renderer/utils/base58'
import { utils,cmd } from '@renderer/utils/cmd-style'

//false时出错
export function save(data){
    try{
        const global = JSON.stringify(data);
        const globalBase58 = encode(global);
        const strCombine = global + globalBase58;
        const hash = utils.createPassword(strCombine);
        const content = JSON.stringify({
          global:globalBase58,
          hash
        })
        return content ?? false;
    }catch(e){
        return false;
    }
}

//false时出错
export function load(content){
    try{
      content = JSON.parse(content);
      if(content != null && content.global != null && content.hash != null){
        const globalBase58 = content.global;
        const globalJsonStr = decode(content.global);
        const strCombine = globalJsonStr + globalBase58;
        const hash = utils.createPassword(strCombine);
        if(hash != content.hash){
          return false;
        }
        const global = JSON.parse(globalJsonStr);
        return global;
      }else{
        return false;
      }
    }catch{
        return false;
    }
}