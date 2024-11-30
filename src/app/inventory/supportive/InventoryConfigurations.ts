import { environment } from "../../../environment/environment";
import { ICategory } from "./interfaces/ICategory";
import { ICodeCoding } from "./interfaces/ICodeCoding";
import { ICodeEType } from "./interfaces/ICodeEType";
import { INewSale } from "./interfaces/INewSale";
import { IPurchase } from "./interfaces/IPurchase";
import { ISubCate } from "./interfaces/ISubcategory";
import { IUnits } from "./interfaces/IUnits";
import { IWarehouse } from "./interfaces/IWarehouse";

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
        data: [],
        model:new ISubCate(),
        endpoints:{
            create:`${environment.baseApiUrl}CodeCodingCategory/create`,
            getAll:`${environment.baseApiUrl}CodeCodingCategory/GetAllCategories/${environment.companyId}`,
            getById:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/GetCateById/${environment.companyId}/${param}`,
            delete:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/Delete/${environment.companyId}/${param}`
        },
    },
    code: {
        data: [],
        model:new ICodeCoding(),
        endpoints:{
            create:`${environment.baseApiUrl}CodeCodingCategory/create`,
            getAll:`${environment.baseApiUrl}CodeCodingCategory/GetAllCategories/${environment.companyId}`,
            getById:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/GetCateById/${environment.companyId}/${param}`,
            delete:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/Delete/${environment.companyId}/${param}`
        },
    },
    units: {
        data: [],
        model: new IUnits(),
        endpoints:{
            create:`${environment.baseApiUrl}Measurements/create`,
            getAll:`${environment.baseApiUrl}Measurements/GetAllUnits/${environment.companyId}`,
            getById:(param:any)=>`${environment.baseApiUrl}Measurements/GetUnitById/${param}/${environment.companyId}`,
            delete:(param:any)=>`${environment.baseApiUrl}Measurements/Delete/${param}/${environment.companyId}`
        },
    

    },
    sale: {
        data: [],
        model:new INewSale(),
        endpoints:{
            create:`${environment.baseApiUrl}Sale/createSale`,
            getAll:`${environment.baseApiUrl}Sale/GetAllSales/${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}Sale/GetSaleById/${environment.companyId}/${param}`,
            delete:(param:any)=>`${environment.baseApiUrl}Sale/Delete/${environment.companyId}/${param}`
        },
    

    },
    puchase: {
        data: [],
        model:new IPurchase(),
         endpoints:{
            create:`${environment.baseApiUrl}Purchases/createPurchase`,
            getAll:`${environment.baseApiUrl}Purchases/GetAllPurchase/${environment.companyId}/${environment.branchId}`,
            getById:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/GetCateById/${environment.companyId}/${param}`,
            delete:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/Delete/${environment.companyId}/${param}`
        },
    
    },
    types: {
        data: [],
        model:new ICodeEType(),
      endpoints:{
            create:`${environment.baseApiUrl}CodeType/create`,
            getAll:`${environment.baseApiUrl}CodeType/GetAllEtypes/${environment.companyId}`,
            // getById:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/GetCateById/${environment.companyId}/${param}`,
            // delete:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/Delete/${environment.companyId}/${param}`
        },
    
    },
    warehouse: {
        data: [],
        model:new IWarehouse(),
        endpoints:{
            create:`${environment.baseApiUrl}CodeCodingCategory/create`,
            getAll:`${environment.baseApiUrl}CodeCodingCategory/GetAllCategories/${environment.companyId}`,
            getById:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/GetCateById/${environment.companyId}/${param}`,
            delete:(param:any)=>`${environment.baseApiUrl}CodeCodingCategory/Delete/${environment.companyId}/${param}`
        }
    }
}