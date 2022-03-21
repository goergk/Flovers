import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import classes from '../Sales.module.css';
import { Flower, RootObject, Bouquet } from '../../../../services/FloristsApi';
import Alert from '../../../Assets/Alert/Alert';

interface Props {
    openMobileAdd: boolean,
    handleCloseMobileAdd: () => void,
    switch_: boolean,
    setSwitch: React.Dispatch<React.SetStateAction<boolean>>,
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    flowersData: Flower[] | undefined,
    updateFlowersArrayOnInputChange: (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    BouquetsData: Bouquet[] | undefined,
    updateBouquetsArrayOnInputChange: (bouquet_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    updateSaleFlowers: () => void,
    updateSaleBouquets: () => void,
    setZerosInFlowersTempArray: () => void,
    setZerosInBouquetsTempArray: () => void,
    tempItemsAmount: () => number,
    setFlowersData: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    setBouquetsData: React.Dispatch<React.SetStateAction<Bouquet[] | undefined>>,
    updateSaleList: () => void,
    handleOpenAdd: () => void,
    deliveryItemsAmount: () => number,
    Florists_data: RootObject | undefined,
    showAddAlert: boolean,
    showNotEnoughAlert: boolean
}

const AddSaleModal: React.FC<Props> = ({
    openMobileAdd,
    handleCloseMobileAdd,
    switch_,
    setSwitch,
    searchTerm,
    setSearchTerm,
    flowersData,
    updateFlowersArrayOnInputChange,
    BouquetsData,
    updateBouquetsArrayOnInputChange,
    updateSaleFlowers,
    updateSaleBouquets,
    setZerosInFlowersTempArray,
    setZerosInBouquetsTempArray,
    tempItemsAmount,
    setFlowersData,
    setBouquetsData,
    updateSaleList,
    handleOpenAdd,
    deliveryItemsAmount,
    Florists_data,
    showAddAlert,
    showNotEnoughAlert
}) => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        if (width > 999) { handleCloseMobileAdd() }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openMobileAdd}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openMobileAdd}>
                <div className={classes.Mobile_Delivery_Modal_container}>
                    {
                        showNotEnoughAlert &&
                        <Alert message="Not enough flowers to add product" />
                    }
                    <div className={classes.Delivery_Modal_Container}>
                        <div className={classes.Close_Icon_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseMobileAdd} />
                        </div>
                        <h2>
                            Add flowers to sale
                        </h2>
                        <div className={classes.Switch_Container}>
                            <div
                                className={switch_ ? classes.Nested_Switch_Container_Active : classes.Nested_Switch_Container}
                                style={{ borderRight: '1px solid gray' }}
                                onClick={e => setSwitch(true)}
                            >
                                Flowers
                            </div>
                            <div
                                className={!switch_ ? classes.Nested_Switch_Container_Active : classes.Nested_Switch_Container}
                                onClick={e => setSwitch(false)}
                            >
                                Bouquets
                            </div>
                        </div>
                        <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                            <div className={classes.Nested_Flower_Container}>
                                <div className={classes.Nested_Flower_Name}>
                                    {
                                        switch_
                                            ?
                                            <b>Search for a flower:</b>
                                            :
                                            <b>Search for a bouquet:</b>
                                    }

                                </div>
                                <div className={classes.Nested_Flower_Input} style={{ marginRight: '0.2em' }}>
                                    <TextField
                                        id="Search"
                                        label="Search Name"
                                        variant="outlined"
                                        size="small"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            {
                                switch_
                                    ?
                                    flowersData?.map((flower, index) => {
                                        return (
                                            <React.Fragment key={flower.id}>
                                                <div className={classes.Nested_Flower_Container} key={flower.id}>
                                                    <div className={classes.Nested_Flower_Name}>
                                                        {flower.name}
                                                    </div>
                                                    <div className={classes.Nested_Flower_Input} style={{ marginRight: '0.2em' }}>
                                                        <TextField
                                                            id="Amount"
                                                            label="Amount"
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            onChange={(e) => {
                                                                updateFlowersArrayOnInputChange(flower.id, e);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </React.Fragment>)
                                    })
                                    :
                                    BouquetsData?.map((bouquet, index) => {
                                        return (
                                            <React.Fragment key={bouquet.id}>
                                                <div className={classes.Nested_Flower_Container} key={bouquet.id}>
                                                    <div className={classes.Nested_Flower_Name}>
                                                        {bouquet.name}
                                                    </div>
                                                    <div className={classes.Nested_Flower_Input} style={{ marginRight: '0.2em' }}>
                                                        <TextField
                                                            id="Amount"
                                                            label="Amount"
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            onChange={(e) => {
                                                                updateBouquetsArrayOnInputChange(bouquet.id, e);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </React.Fragment>)
                                    })
                            }
                        </div>
                        <button className={classes.Add_Button} type="button"
                            onClick={e => {
                                if (switch_) {
                                    updateSaleFlowers();
                                } else {
                                    updateSaleBouquets();
                                }
                                setZerosInFlowersTempArray();
                                setZerosInBouquetsTempArray();
                                if (tempItemsAmount() > 0) {
                                    setFlowersData([]);
                                    setBouquetsData([]);
                                    setTimeout(function () {
                                        let tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers));
                                        tempArr = tempArr!.reverse();
                                        let tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets));
                                        tempArr_1 = tempArr_1!.reverse();
                                        setFlowersData(tempArr);
                                        setBouquetsData(tempArr_1);
                                        setSearchTerm('');
                                    }, 1);
                                }
                            }}>
                            Add to list
                        </button>
                        <div className={classes.Delivery_Container} onClick={e => {
                            updateSaleList();
                            handleOpenAdd();
                        }}>
                            <p>
                                <b>Current Sale (<span className={classes.Delivery_Amount}> {deliveryItemsAmount()} </span>)</b>
                            </p>
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default AddSaleModal