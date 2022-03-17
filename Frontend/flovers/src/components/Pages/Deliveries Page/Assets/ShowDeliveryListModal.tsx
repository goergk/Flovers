import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import Loader from '../../../Assets/Loader/Loader';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';
import classes from '../Deliveries.module.css';
import { Flower } from '../../../../services/FloristsApi';

interface Props {
    openAdd: boolean,
    loader: boolean,
    openMobileAdd: boolean,
    handleCloseAdd: () => void,
    deliveryItemsAmount: () => number,
    setDeliveryList: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    setZerosInDeliveryArray: () => void,
    deliveryList: Flower[] | undefined,
    deleteListElement: (index: number) => void,
    deleteDeliveryFlower: (flower_id: number) => void,
    addDelivery: () => void
}

const ShowDeliveryListModal: React.FC<Props> = ({
    openAdd,
    loader,
    openMobileAdd,
    handleCloseAdd,
    deliveryItemsAmount,
    setDeliveryList,
    setZerosInDeliveryArray,
    deliveryList,
    deleteListElement,
    deleteDeliveryFlower,
    addDelivery
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
                                Add new delivery
                            </h2>
                            {deliveryItemsAmount() > 0
                                &&
                                <div className={classes.Delete_Icon_container}>
                                    <div className={classes.Delete_Icon_Inner_container}
                                        onClick={e => {
                                            setDeliveryList([]);
                                            setZerosInDeliveryArray();
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
                                        <h4>No flowers added to delivery</h4>
                                        :
                                        deliveryList?.map((flower, index) => {
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
                                                                deleteListElement(index);
                                                                deleteDeliveryFlower(flower.id);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            {deliveryItemsAmount() > 0
                                &&
                                <button className={classes.Modal_button} onClick={addDelivery}>Save</button>
                            }
                        </div>
                    }
                </div>
            </Fade>
        </Modal>
    )
}

export default ShowDeliveryListModal