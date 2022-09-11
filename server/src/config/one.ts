export default function deleteOneUnit<Type>(initObject: any[], id: string): Type[]{
    const replaceObject = initObject;
    for(let i = 0; i < replaceObject.length; i++){
        if(replaceObject[i]===id || replaceObject[i].nameProduct===id){
            if(i===0){
                initObject.shift();
            }
            else if(i===replaceObject.length-1){
                initObject.pop();
            }
            else {
                initObject = [];
                initObject = replaceObject.concat(replaceObject.slice(0, i), replaceObject.slice(i+1, replaceObject.length));
            }
            break;
        }
    }

    return initObject;
}