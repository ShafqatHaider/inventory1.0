export const MenuConfig = {
    menuList: {
        dashboard: '',
        accounting: [
            { componentName: 'Accounts', path: '/Accounts/account-index' },
            { componentName: 'Daybooks', path: '/Accounts/daybook-index' },
            { componentName: 'Receipts', path: '/Accounts/rbook-index' },
            { componentName: 'Payments', path: '/Accounts/payment-index' },
        ],
        inventory: [
            { componentName: 'Category', path: '/inventory/category-index'},
            { componentName: 'Code', path: '/inventory/code-index' },
            { componentName: 'Purchase', path: '/inventory/purchase-index' },
            { componentName: 'Sale', path: '/inventory/sale-index' },
            { componentName: 'Sub category', path: '/inventory/subcategory-index' },
            { componentName: 'saleinvoice', path: '/saleinvoice' },
            { componentName: 'Unit', path: '/inventory/unit-index' },
            { componentName: 'Warehouse', path: '/inventory/warehouse-index' },
            { componentName: 'Type', path: '/inventory/type-index' },
            
        ],
        reporting: {
            componentName: 'Reports', path: '/reports/report-index'
        }



    }
}