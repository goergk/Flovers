import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Sales.module.css';
import { Flower, Bouquet } from '../../../../services/FloristsApi';
import Loader from '../../../Assets/Loader/Loader';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
    openAdd: boolean,
    loader: boolean,
    openMobileAdd: boolean,
    handleCloseAdd: () => void,
    deliveryItemsAmount: () => number,
    setSaleFlowersList: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    setSaleBouquetsList: React.Dispatch<React.SetStateAction<{
        bouquet: Bouquet;
        amount: number;
    }[] | undefined>>,
    deleteAllItemsInSale: () => void,
    deleteFlowerListElement: (index: number) => void,
    deleteSaleFlower: (flower_id: number) => void,
    saleFlowersList: Flower[] | undefined,
    saleBouquetsList: {
        bouquet: Bouquet;
        amount: number;
    }[] | undefined,
    deleteBouquetListElement: (index: number) => void,
    deleteSaleBouquet: (bouquet_id: number) => void,
    addSale: () => void
}

const ShowSaleListModal: React.FC<Props> = ({
    openAdd,
    loader,
    openMobileAdd,
    handleCloseAdd,
    deliveryItemsAmount,
    setSaleFlowersList,
    setSaleBouquetsList,
    deleteAllItemsInSale,
    deleteFlowerListElement,
    deleteSaleFlower,
    saleFlowersList,
    saleBouquetsList,
    deleteBouquetListElement,
    deleteSaleBouquet,
    addSale
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openAdd}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openAdd}>
                <div className={classes.Main_Delivery_Modal_container}>
                    {loader
                        ?
                        <Loader />
                        :

                        <div className={classes.Delivery_Modal_Container}>
                            <div className={classes.Close_Icon_container} style={openMobileAdd ? { justifyContent: 'flex-start' } : undefined}>
                                {openMobileAdd
                                    ?
                                    <KeyboardBackspaceIcon className={classes.Back_Icon} onClick={handleCloseAdd} />
                                    :
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
                                }

                            </div>
                            <h2>
                                Add new sale
                            </h2>
                            {deliveryItemsAmount() > 0
                                &&
                                <div className={classes.Delete_Icon_container}>
                                    <div className={classes.Delete_Icon_Inner_container}
                                        onClick={e => {
                                            setSaleFlowersList([]);
                                            setSaleBouquetsList([]);
                                            deleteAllItemsInSale();
                                        }}
                                    >
                                        Delete all <DeleteOutlineIcon />
                                    </div>
                                </div>
                            }
                            <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                {
                                    deliveryItemsAmount() === 0
                                        ?
                                        <h4>No items added to sale</h4>
                                        :
                                        <>
                                            {saleFlowersList?.map((flower, index) => {
                                                return (
                                                    <div className={classes.Delivery_Item_Container} key={flower.id}>
                                                        <div className={classes.Container_C1}>
                                                            <b>{index + 1}</b>
                                                        </div>
                                                        <div className={classes.Container_C2}>
                                                            {flower.name}
                                                        </div>
                                                        <div className={classes.Container_C3}>
                                                            {flower.amount}
                                                        </div>
                                                        <div className={classes.Container_C4}>
                                                            <ClearIcon className={classes.Clear_Icon}
                                                                onClick={e => {
                                                                    deleteFlowerListElement(index);
                                                                    deleteSaleFlower(flower.id);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {saleBouquetsList?.map((item, index) => {
                                                return (
                                                    <div className={classes.Delivery_Item_Container} key={item.bouquet.id}>
                                                        <div className={classes.Container_C1}>
                                                            {
                                                                saleFlowersList?.length
                                                                    ?
                                                                    <b>{index + saleFlowersList?.length! + 1}</b>
                                                                    :
                                                                    <b>{index + 1}</b>
                                                            }
                                                        </div>
                                                        <div className={classes.Container_C2}>
                                                            {item.bouquet.name}
                                                        </div>
                                                        <div className={classes.Container_C3}>
                                                            {item.amount}
                                                        </div>
                                                        <div className={classes.Container_C4}>
                                                            <ClearIcon className={classes.Clear_Icon}
                                                                onClick={e => {
                                                                    deleteBouquetListElement(index);
                                                                    deleteSaleBouquet(item.bouquet.id);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                }
                            </div>
                            {deliveryItemsAmount() > 0
                                &&
                                <button className={classes.Modal_button} onClick={addSale}>Save</button>
                            }
                        </div>
                    }
                </div>
            </Fade>
        </Modal>
    )
}

export default ShowSaleListModal