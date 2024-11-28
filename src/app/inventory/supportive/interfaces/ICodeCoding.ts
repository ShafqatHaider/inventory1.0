export class ICodeCoding{
        cid:number=0;
		eDate:Date=new Date();
		codeName:string='';
		pCateID:number=0;
		pCateName:string='';
		barcode:string='';
		code:string='';
		measureID:number=0;
		measureUnit:string='0';
		pktQty:number=0;
		qty:number=0;
		costRate:number=0;
		saleRate:number=0;
		reorderLevelQty:number=0;
		itemDescription:string='';
		companyID:number=Number(localStorage.getItem('COMPANY_ID'));
		branchID:number=Number(localStorage.getItem('BRANCH_ID'));
		operatorID:number=Number(localStorage.getItem('OPERATOR_ID'));
		brandID:number=0;
		colours:string='0';
		commPer:number=0;
		commRS:number=0;
		disPer:number=0;
		disRS:number=0;
		dpttID:number=0;
		groupID:number=0;
		packet:number=0;
		sizeRange:string='0';
		subcateID:number=0;
		vendorID:number=0;
		ifBarcode:number=0;
        n1:number=0;
        n2:number=0;
        n3:number=0;
        txt1:string='0';
        txt2:string='0';
        txt3:string='0';
		codeDetails: ICodeCodingSub[]=new Array();
}


export class ICodeCodingSub
{
	sCid:number=0;
    unitId:number=0;
    packet:number=0;
    pktQty:number=0;
    qty:number=0;
    totalQty:number=0;
    costRate:number=0;
    saleRate:number=0;
    amount:number=0;
    godownId:number=0;
    godownName:string='';
    unitName:string='';
    companyId:number=Number(localStorage.getItem('COMPANY_ID'));
	branchId:number=Number(localStorage.getItem('BRANCH_ID'));
	operatorId:number=Number(localStorage.getItem('OPERATOR_ID'));
}