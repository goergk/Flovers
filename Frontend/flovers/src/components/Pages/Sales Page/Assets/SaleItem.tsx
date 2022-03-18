import React from 'react';
import { Sale } from '../../../../services/FloristsApi';
import classes from '../Sales.module.css';

interface Props {
    sale: Sale,
    updateSingleDelivery: (sale_id: number) => void,
    handleOpenSale: () => void,
    index: number
}

const SaleItem: React.FC<Props> = ({
    sale,
    updateSingleDelivery,
    handleOpenSale,
    index
}) => {
    return (
        <div
            className={classes.List_Item_Container}
            key={sale.id}
            onClick={e => {
                updateSingleDelivery(sale.id);
                handleOpenSale();
            }}
        >
            <div className={classes.Show_Number}>
                <p className={classes.List_Container_Text}>
                    {index + 1}
                </p>
            </div>
            <div className={classes.Show_Name}>
                <p className={classes.List_Container_Text_First}>
                    {sale.id}
                </p>
            </div>
            <div className={classes.Show_Date}>
                <p className={classes.List_Container_Text}>
                    {sale.creation_date.toString().split('T')[0]}
                </p>
            </div>
        </div>
    )
}

export default SaleItem