import React from 'react';
import classes from '../Deliveries.module.css';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { Delivery } from '../../../../services/FloristsApi';
import { DeliveryItem, Tags } from '.';
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
    itemSearchTerm: string,
    setItemSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    deliveriesData: Delivery[] | undefined,
    updateSingleDelivery: (delivery_id: number) => void,
    handleOpenDelivery: () => void,
    handleOpenDelete: () => void,
    isFetching: boolean,
    isDeliveriesTabReversed: boolean
}

const DeliveriesListBox: React.FC<Props> = ({
    itemSearchTerm,
    setItemSearchTerm,
    deliveriesData,
    updateSingleDelivery,
    handleOpenDelivery,
    handleOpenDelete,
    isFetching,
    isDeliveriesTabReversed
}) => {

    const classes_2 = useStyles();

    return (
        <div className={classes.Show_Flowers_Container}>
            <div className={classes.Show_Container_1}>
                <Tags />
            </div>
            <div className={classes.Search_Container}>
                <div>
                    <b>Search for a delivery:&nbsp;&nbsp;</b>
                </div>
                <div>
                    <TextField
                        id="Search"
                        label="Search Id"
                        variant="outlined"
                        size="small"
                        value={itemSearchTerm}
                        onChange={(e) => setItemSearchTerm(e.target.value)}
                        className={classes_2.root}
                    />
                </div>
            </div>
            {
                (isFetching || !deliveriesData) && !isDeliveriesTabReversed
                    ?
                    <div className={classes.Loader_Container}>
                        <Loader />
                    </div>
                    :
                    <div className={classes.Show_Container_2}>
                        {
                            deliveriesData?.length! > 0
                                ?
                                <>
                                    {
                                        deliveriesData?.map((delivery, index) => {
                                            return (
                                                <React.Fragment key={delivery.id}>
                                                    <DeliveryItem
                                                        delivery={delivery}
                                                        updateSingleDelivery={updateSingleDelivery}
                                                        handleOpenDelivery={handleOpenDelivery}
                                                        index={index}
                                                        handleOpenDelete={handleOpenDelete}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </>
                                :
                                <h3 style={{ fontSize: 'calc(6px + 1.2vh)' }}>
                                    No deliveries
                                </h3>
                        }
                    </div>
            }
        </div>
    )
}

export default DeliveriesListBox