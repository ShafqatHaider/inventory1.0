import { Injectable } from "@angular/core";
import { AccountConfigurations } from "../AccountConfigurations";
import { IAccounts } from "../interfaces/IAccount";
import { IRBook } from "../interfaces/IRbook";
import { IPayment } from "../interfaces/IPayment";
import { IDayBook } from "../interfaces/IDaybook";
import { InventoryConfigurations } from "../../../inventory/supportive/InventoryConfigurations";
import { ICategory } from "../../../inventory/supportive/interfaces/ICategory";

@Injectable({
    providedIn: 'root'
})

export class TransactionService{


config= AccountConfigurations;
inventoryConfig= InventoryConfigurations;


resetAccountObj(){
    this.config.accounts.model=new IAccounts();
}

resetRbookObj(){
    this.config.receipt.model=new IRBook();
}

resetPaymentObj(){
    this.config.payment.model=new IPayment();
}

resetDaybookObj(){
    this.config.daybook.model=new IDayBook();
}
isSaved():number{
    return this.config.accounts.model.accID;
}
resetCategoryObj(){
    this.inventoryConfig.category.model=new ICategory();
}
}