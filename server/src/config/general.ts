import { Product } from "../interface/product";
import { ProductModal } from "../models/product";


//Product function
export const addType = (allType: string[], type: string[]): string[] => {
    if(allType.length===0){
        allType = type;
    }
    else {
        for(let i = 0; i < type.length; i++){
            let check: boolean = true;
            for(let j = 0; j < allType.length; j++){
                if(type[i]===allType[j]){
                    check = false;
                }
            }
            
            check&&allType.push(type[i]);
        }
    }

    return allType;
}

export const updateType = async(products: string[], type: string[]): Promise<string[]> => {
    for(let i = 0; i < products.length; i++){
        const product = await ProductModal.findById(products[i]);
        type = addType(type, product?.typeProduct!);
    }

    return type;
}

//Auth function
export const removeAndAddCart = 
    async(id: string, amount: number, state: "+" | "-") => 
{
    const product = await ProductModal.findById(id) as Product;
    if(state==="+"){
        product.amount.remainingStock += amount;
    }
    else if(state==="-"){
        product.amount.remainingStock -= amount;
    }

    await ProductModal.findByIdAndUpdate(id, product, {new: true});
}


export const checkUser = (follower: string[], id: string): boolean => {
    let check = true;
    for(let i = 0; i < follower.length; i++){
        if(follower[i]===id){
            check = false;
            break;
        }
    }

    return check;
}