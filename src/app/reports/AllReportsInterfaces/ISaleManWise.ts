export class ISaleManWise{

    sAccId:number=0;
    saleMan:string='';
    totalBill:number=0;
    totalMargin:number=0;
    bills = new Array<Bills>();
}

export class Bills{
    smId: number=0;
    eDate: number=0;
    itemId: number=0;
    itemName: string='';
    qty: number=0;
    Rate: number=0;
    discountUser: number=0;
    amount: number=0;
    margin: number=0;
}