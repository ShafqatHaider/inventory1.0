import { environment } from "../../../environment/environment";
import { ICategory } from "./interfaces/ICategory";

export const InventoryConfigurations = {
    category: {
        data: [],
        model:new ICategory(),
        endpoints:{
            create:`${environment.baseApiUrl}CodeCodingCategory/create`,
            getAll:`${environment.baseApiUrl}CodeCodingCategory/GetAllCategories/${environment.companyId}`,
            getById:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/GetCateById/${environment.companyId}/${param}`,
            delete:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/Delete/${environment.companyId}/${param}`
        },
    },
    subcategory: {
        data: []
    },
    code: {
        data: []
    },
    units: {
        data: []
    },
    sale: {
        data: [],
        
    },
    puchase:{
        data:[]
    },
    types:{
        data:[]
    }
}