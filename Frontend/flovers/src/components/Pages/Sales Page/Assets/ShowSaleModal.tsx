import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Sales.module.css';
import { Sale } from '../../../../services/FloristsApi';

interface Props {
    openSale: boolean,
    handleCloseSale: () => void,
    singleSale: Sale | undefined
}

const ShowSaleModal: React.FC<Props> = ({
    openSale,
    handleCloseSale,
    singleSale
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openSale}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openSale}>
                <div className={classes.Main_Delivery_Modal_container}>
                    <div className={classes.Delivery_Modal_Container}>
                        <div className={classes.Close_Icon_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseSale} />
                        </div>
                        <h2>
                            Sale {singleSale?.id}
                        </h2>
                        <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                            {
                                <>
                                    {
                                        singleSale?.flowers?.map((flower, index) => {
                                            return (
                                                <div className={classes.Delivery_Item_Container} key={flower.id}>
                                                    <div className={classes.Container_C1}>
                                                        <b>{index + 1}</b>
                                                    </div>
                                                    <div className={classes.Container_C2} style={{ color: 'green', fontWeight: '500' }}>
                                                        {flower.name}
                                                    </div>
                                                    <div className={classes.Container_C3}>
                                                        {flower.amount}
                                                    </div>
                                                    <div className={classes.Container_C4}>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        singleSale?.bouquets?.map((bouquetObject, index) => {
                                            return (
                                                <div className={classes.Delivery_Item_Container} key={bouquetObject.id}>
                                                    <div className={classes.Container_C1}>
                                                        {
                                                            singleSale?.flowers?.length
                                                                ?
                                                                <b>{index + singleSale?.flowers?.length! + 1}</b>
                                                                :
                                                                <b>{index + 1}</b>
                                                        }
                                                    </div>
                                                    <div className={classes.Container_C2} style={{ color: 'purple', fontWeight: '500' }}>
                                                        {bouquetObject.bouquet.name}
                                                    </div>
                                                    <div className={classes.Container_C3}>
                                                        {bouquetObject.amount}
                                                    </div>
                                                    <div className={classes.Container_C4}>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>

                            }
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ShowSaleModal;