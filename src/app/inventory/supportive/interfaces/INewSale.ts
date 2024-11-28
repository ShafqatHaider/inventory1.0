export class INewSaleDatail {
        sMid:number=0
        barcode:string ='';
        sSid:number = 0;
        itemID:number  = 0;
        itemDescription: string = '';
        measureUnit: string = '';
        measureId: number = 0;
         packet: number= 0;
         pktQty:number = 0;
        qty:number = 0;
        rate: number= 0;
        disRS: number= 0;
        disPer:number = 0;
        netRate:number = 0;
        amount:number = 0;
        strg:string = '';
        saleType:number = 0;
        companyID = Number(localStorage.getItem("COMPANY_ID"));
        branchID = Number(localStorage.getItem("BRANCH_ID"));
        sType:string = '';
         n1: number= 0;
         n2: number= 0;
         n3: number= 0;
        lotNo:string = '';
        txt1:string = '';
        txt2:string = '';
        txt3:string = '';
        saleTaxPercent:number = 0;
        saleTaxAmount:number = 0;
}
export class INewSale {
   
        salesDetail = new Array();
        sMid :number=0;
        eDate :Date=new Date();
        billNo :string='';
        sAccID :number=0;
        billAmount :number=0;
        discount :number=0;
        storeID :number=0;
        saleType :number=0;
        sAccName :string='';
        cashRece :number=0;
        chqRece :string='';
        creditDays :number=0;
        agentID :number=0;
        agentID2 :number=0;
        biltyNo :number=0;
        goods :string='';
        biltyExp :number=0;
        contactNo :string='';
        pandi :string='';;
        remarks :string='';;
        packet :number=0;
        pktQty :number=0;
        companyID :number=0;
        operatorID :number=0;
        branchID :number=0;
        gSale :number=0;
        sReturn :number=0;
        discountUser :number=0;
        billProfit :number=0;
        isDelivered :number=0;
        n1 :number=0;
        n2 :number=0;
        n3 :number=0;
        preBal :number=0;
        stPartyId :number=0;
        stInvoiceNo :String ='';
        
        
    
}