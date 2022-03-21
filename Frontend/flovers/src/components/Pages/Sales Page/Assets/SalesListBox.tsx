import React from 'react';
import classes from '../Sales.module.css';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import { Sale } from '../../../../services/FloristsApi';
import { SaleItem, Tags } from '.';
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
    salesData: Sale[] | undefined,
    updateSingleDelivery: (sale_id: number) => void,
    handleOpenSale: () => void,
    isFetching: boolean,
    isSalesTabReversed: boolean
}

const SalesListBox: React.FC<Props> = ({
    itemSearchTerm,
    setItemSearchTerm,
    salesData,
    updateSingleDelivery,
    handleOpenSale,
    isFetching,
    isSalesTabReversed
}) => {

    const classes_2 = useStyles();

    return (
        <div className={classes.Show_Flowers_Container}>
            <div className={classes.Show_Container_1}>
                <Tags />
            </div>
            <div className={classes.Search_Container}>
                <div>
                    <b>Search for a sale:&nbsp;&nbsp;</b>
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
                (isFetching || !salesData) && !isSalesTabReversed
                    ?
                    <div className={classes.Loader_Container}>
                        <Loader />
                    </div>
                    :
                    <div className={classes.Show_Container_2}>
                        {
                            salesData?.length! > 0
                                ?
                                <>
                                    {
                                        salesData?.map((sale, index) => {
                                            return (
                                                <React.Fragment key={sale.id}>
                                                    <SaleItem
                                                        sale={sale}
                                                        updateSingleDelivery={updateSingleDelivery}
                                                        handleOpenSale={handleOpenSale}
                                                        index={index}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </>
                                :
                                <h3 style={{ fontSize: 'calc(6px + 1.2vh)' }}>
                                    No sales
                                </h3>
                        }
                    </div>
            }
        </div>
    )
}

export default SalesListBox