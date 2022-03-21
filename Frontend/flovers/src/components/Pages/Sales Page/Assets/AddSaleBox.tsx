import React from 'react';
import classes from '../Sales.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { Bouquet, Flower, RootObject } from '../../../../services/FloristsApi';
import Loader from '../../../Assets/Loader/Loader';

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d97979"
        },
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            color: "#d97979"
        },
        "& .MuiInputLabel-outlined": {
            color: "white"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#d97979"
        },
        marginBottom: ".2em"
    }
});

interface Props {
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
    Florists_data: RootObject | undefined,
    updateSaleList: () => void,
    handleOpenAdd: () => void,
    deliveryItemsAmount: () => number,
    isFetching: boolean,
    isFlowersTabReversed: boolean
}

const AddSaleBox: React.FC<Props> = ({
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
    Florists_data,
    updateSaleList,
    handleOpenAdd,
    deliveryItemsAmount,
    isFetching,
    isFlowersTabReversed
}) => {

    const classes_2 = useStyles();

    return (
        <div className={classes.Add_Flower_Container}>
            <div className={classes.Add_Container_1}>
                <AddBoxIcon className={classes.Icon} />
                <p>
                    New Sale
                </p>
            </div>
            {
                (isFetching || !flowersData) && !isFlowersTabReversed
                    ?
                    <div className={classes.Loader_Container}>
                        <Loader />
                    </div>
                    :
                    <div className={classes.Add_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                        <h3>
                            Add products to new sale:
                        </h3>
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
                        <div className={classes.Nested_Flower_Container} style={{ borderBottom: 'none' }}>
                            <div className={classes.Nested_Flower_Name}>
                                {switch_
                                    ?
                                    <b>Search for a flower:</b>
                                    :
                                    <b>Search for a bouquet:</b>
                                }
                            </div>
                            <div className={classes.Nested_Flower_Input} style={{ marginRight: '1.1em' }}>
                                <TextField
                                    id="Search"
                                    label="Search Name"
                                    variant="outlined"
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={classes_2.root}
                                />
                            </div>
                        </div>
                        <div className={classes.Add_Flowers_List}>
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
                                                            className={classes_2.root}
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
                                                            className={classes_2.root}
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
            }
        </div>
    )
}

export default AddSaleBox