import React from 'react';
import classes from '../Resources.module.css';
import { Delivery, Flower } from '../../../../services/FloristsApi';
import { FlowerItem, MoreOptionsBox, Tags } from '.';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
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
    flowersData: Flower[] | undefined,
    indexOfElement: number,
    handleOpenEdit: (flower_id: number) => void,
    setEditValues: (florist_name: string, florist_price: string) => void,
    handleOpenDelete: (flower_id: number) => void,
    handleInput: (index: number) => void,
    deliveriesData: Delivery[] | undefined,
    handleOpenDelivery: () => void,
    updateSingleDelivery: (delivery_id: number, flower_name: string) => void,
    itemSearchTerm: string,
    setItemSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    isFetching: boolean,
    isReversed: boolean
}

const FlowersListBox: React.FC<Props> = ({
    flowersData,
    indexOfElement,
    handleOpenEdit,
    setEditValues,
    handleOpenDelete,
    handleInput,
    deliveriesData,
    handleOpenDelivery,
    updateSingleDelivery,
    itemSearchTerm,
    setItemSearchTerm,
    isFetching,
    isReversed
}) => {
    const classes_2 = useStyles();

    return (
        <div className={classes.Show_Flowers_Container}>
            <div className={classes.Show_Container_1}>
                <Tags />
            </div>
            <div className={classes.Search_Container} style={{ borderBottom: 'none' }}>
                <div>
                    <b>Search for a flower:&nbsp;&nbsp;</b>
                </div>
                <div className={classes.Filter_Input}>
                    <TextField
                        id="Search"
                        label="Search Name"
                        variant="outlined"
                        size="small"
                        value={itemSearchTerm}
                        onChange={(e) => setItemSearchTerm(e.target.value)}
                        className={classes_2.root}
                    />
                </div>
            </div>
            {
                (isFetching || !flowersData) && !isReversed
                    ?
                    <div className={classes.Loader_Container}>
                        <Loader />
                    </div>
                    :
                    <div className={classes.Show_Container_2}>
                        {
                            flowersData?.length! > 0
                                ?
                                <>
                                    {
                                        flowersData?.map((flower, index) => {
                                            return (
                                                <React.Fragment key={flower.id}>
                                                    <FlowerItem
                                                        flower={flower}
                                                        indexOfElement={indexOfElement}
                                                        index={index}
                                                        handleInput={handleInput}
                                                    />
                                                    <MoreOptionsBox
                                                        flower={flower}
                                                        indexOfElement={indexOfElement}
                                                        index={index}
                                                        handleOpenEdit={handleOpenEdit}
                                                        setEditValues={setEditValues}
                                                        handleOpenDelete={handleOpenDelete}
                                                        deliveriesData={deliveriesData}
                                                        handleOpenDelivery={handleOpenDelivery}
                                                        updateSingleDelivery={updateSingleDelivery}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </>
                                :
                                <h3 style={{ fontSize: 'calc(6px + 1.2vh)' }}>
                                    No flowers
                                </h3>
                        }
                    </div>
            }
        </div>
    )
};

export default FlowersListBox;
