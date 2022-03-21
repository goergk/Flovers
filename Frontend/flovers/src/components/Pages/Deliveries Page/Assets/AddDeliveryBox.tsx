import React from 'react';
import classes from '../Deliveries.module.css';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { makeStyles } from "@material-ui/core/styles";
import { Flower, RootObject } from '../../../../services/FloristsApi';
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
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    flowersData: Flower[] | undefined,
    updateArrayOnInputChange: (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    updateDeliveryFlowers: () => void,
    setZerosInTempArray: () => void,
    tempItemsAmount: () => number,
    setFlowersData: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    Florists_data: RootObject | undefined,
    updateDeliveryList: () => void,
    handleOpenAdd: () => void,
    deliveryItemsAmount: () => number,
    isFetching: boolean,
    isFlowersTabReversed: boolean
}

const AddDeliveryBox: React.FC<Props> = ({
    searchTerm,
    setSearchTerm,
    flowersData,
    updateArrayOnInputChange,
    updateDeliveryFlowers,
    setZerosInTempArray,
    tempItemsAmount,
    setFlowersData,
    Florists_data,
    updateDeliveryList,
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
                    New Delivery
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
                            Add flowers to your new delivery:
                        </h3>
                        <div className={classes.Nested_Flower_Container} style={{ borderBottom: 'none' }}>
                            <div className={classes.Nested_Flower_Name}>
                                <b>Search for a flower:</b>
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
                                                    className={classes_2.root}
                                                />
                                            </div>
                                        </div>
                                    </ React.Fragment>)
                            })}
                        </div>
                        <button className={classes.Add_Button} type="button"
                            onClick={e => {
                                updateDeliveryFlowers();
                                setZerosInTempArray();
                                if (tempItemsAmount() > 0) {
                                    setFlowersData([]);
                                    setTimeout(function () {
                                        setFlowersData(Florists_data?.florist[0].flowers);
                                        setSearchTerm('');
                                    }, 1);
                                }
                            }}>
                            Add to list
                        </button>
                        <div className={classes.Delivery_Container} onClick={e => {
                            updateDeliveryList();
                            handleOpenAdd();
                        }}>
                            <p>
                                <b>Current Delivery (<span className={classes.Delivery_Amount}> {deliveryItemsAmount()} </span>)</b>
                            </p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AddDeliveryBox