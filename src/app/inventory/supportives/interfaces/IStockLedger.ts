export class IBrandLedgerInputs {
    brandID: number;
    fromDate: Date ;
    toDate: Date;
    branchID: Number;
    folio: string ;
    
    constructor() {
        this.brandID = 0;
        this.fromDate = new Date(-30);
        this.toDate = new Date();
        this.branchID = Number(localStorage.getItem("BRANCH_ID"));
        this.folio = "";
       
        
    }
}
export class IBrandLedgerFolioLookUp{
    
    folio  : string;
        
        constructor(){
        
        
            this.folio ="";
          
        }
    }

export class IBrandLedger{
        
        brandname:string;
		 season :string="";
		 dpttName :string="";
		 categoryName :string="";
		 subCategoryName:string="";
		 color :string="";
		 sizes :string="";
		 narat :string="";
		 naratU :string="";
		 lG_Date : Date;
		 folio :string="";
		 qtyIn : number;
		 qtyOut :number;
		 billRate :number=0;
		 saleRate :number=0;
		 costRate :number=0;
		 branchid :number=0;
		 branchName: string="";
		 fDate :Date=new Date;
		 tDate :Date=new Date;
		 thanIn :number=0;
		 thanOut :number=0;
		 avgsalerate:number=0;
         balance:number;
         constructor() {
            this.lG_Date= new Date();
            this.qtyIn = 0;
            this.qtyOut=0;
            this.brandname="";
            this.balance=0;
        
        }
}
export class IBrandledAllLookup
{
brandID: number;
BrandName: string;

constructor(){
    this.brandID=0;
    this.BrandName="";
    
}
}