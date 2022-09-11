import { Type } from "typescript";
import { Product } from "../interface/product";

export default function deleteMultiUnit<Type>(initObject: any[], element: string[]): Type[]{
    const replaceObject = initObject;
    for(let i = 0; i < element.length; i++){
        const id: string = element[i];
        for(let j = 0; j < initObject.length; j++){
            if(initObject[j].nameProduct===id || initObject[j]===id){
                if(j===0){
                    initObject.shift();
                }
                else if(j===initObject.length-1){
                    initObject.pop();
                }
                else {
                    initObject = [];
                    initObject = initObject.concat(replaceObject.slice(0, j), replaceObject.slice(j+1, replaceObject.length));
                }
                break;
            }
        }
    }

    return initObject;
}
