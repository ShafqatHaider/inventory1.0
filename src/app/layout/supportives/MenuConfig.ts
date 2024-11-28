export const MenuConfig={
    menuList:{
        dashboard:'',
        accounting:[
            {componentName:'Accounts',path:'/Accounts/account-index'},
            {componentName:'Daybooks',path:'/Accounts/daybook-index'},
            {componentName:'Receipts',path:'/Accounts/rbook-index'},
            {componentName:'Payments',path:'/Accounts/payment-index'},
        ],
        inventory:{},
        reporting:{

            componentName:'Reports',path:'/reports/report-index'
        }
        
        

    }
}