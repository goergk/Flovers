import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import classes from '../Compositions.module.css';
import { Flower, RootObject } from '../../../../services/FloristsApi';

interface Props {
    openMobileAdd: boolean,
    handleCloseMobileAdd: () => void,
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    flowersData: Flower[] | undefined,
    updateArrayOnInputChange: (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    updateBouquetFlowers: () => void,
    setZerosInTempArray: () => void,
    tempItemsAmount: () => number,
    setFlowersData: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    Florists_data: RootObject | undefined,
    updateBouquetList: () => void,
    handleOpenAdd: () => void,
    bouquetItemsAmount: () => number
}

const AddBouquetModal: React.FC<Props> = ({
    openMobileAdd,
    handleCloseMobileAdd,
    searchTerm,
    setSearchTerm,
    flowersData,
    updateArrayOnInputChange,
    updateBouquetFlowers,
    setZerosInTempArray,
    tempItemsAmount,
    setFlowersData,
    Florists_data,
    updateBouquetList,
    handleOpenAdd,
    bouquetItemsAmount
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
                <div className={classes.Mobile_Bouquet_Modal_container}>
                    <div className={classes.Bouquet_Modal_Container}>
                        <div className={classes.Close_Icon_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseMobileAdd} />
                        </div>
                        <h2>
                            Add flowers to bouquet
                        </h2>
                        <div className={classes.Bouquet_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                            <div className={classes.Nested_Flower_Container}>
                                <div className={classes.Nested_Flower_Name}>
                                    <b>Search for a flower:</b>
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
                            {flowersData?.map((flower, index) => {
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
                                                        updateArrayOnInputChange(flower.id, e);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </React.Fragment>)
                            })}
                        </div>
                        <button className={classes.Add_Button} type="button"
                            onClick={e => {
                                updateBouquetFlowers();
                                setZerosInTempArray();
                                if (tempItemsAmount() > 0) {
                                    setFlowersData([]);
                                    setTimeout(function () {
                                        let tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers));
                                        tempArr = tempArr!.reverse();
                                        setFlowersData(tempArr);
                                        setSearchTerm('');
                                    }, 1);
                                }
                            }}>
                            Add to list
                        </button>
                        <div className={classes.Bouquet_Container}
                            onClick={e => {
                                updateBouquetList();
                                handleOpenAdd();
                            }}>
                            <p>
                                <b>Current Bouquet (<span className={classes.Bouquet_Amount}> {bouquetItemsAmount()} </span>)</b>
                            </p>
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default AddBouquetModal