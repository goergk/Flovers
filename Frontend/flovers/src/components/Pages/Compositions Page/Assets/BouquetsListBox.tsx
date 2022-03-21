import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import classes from '../Compositions.module.css';
import TextField from '@mui/material/TextField';
import { Bouquet } from '../../../../services/FloristsApi';
import { BouquetItem, Tags } from '.';
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
    bouquetsData: Bouquet[] | undefined,
    updateSingleBouquet: (bouquet_id: number) => void,
    handleOpenBouquet: () => void,
    handleOpenDelete: () => void,
    isFetching: boolean,
    isBouquetsTabReversed: boolean
}

const BouquetsListBox: React.FC<Props> = ({
    itemSearchTerm,
    setItemSearchTerm,
    bouquetsData,
    updateSingleBouquet,
    handleOpenBouquet,
    handleOpenDelete,
    isFetching,
    isBouquetsTabReversed
}) => {

    const classes_2 = useStyles();

    return (
        <div className={classes.Show_Flowers_Container}>
            <div className={classes.Show_Container_1}>
                <Tags />
            </div>
            <div className={classes.Search_Container}>
                <div>
                    <b>Search for a bouquet:&nbsp;&nbsp;</b>
                </div>
                <div>
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
                (isFetching || !bouquetsData) && !isBouquetsTabReversed
                    ?
                    <div className={classes.Loader_Container}>
                        <Loader />
                    </div>
                    :
                    <div className={classes.Show_Container_2}>
                        {
                            bouquetsData?.length! > 0
                                ?
                                <>
                                    {
                                        bouquetsData?.map((bouquet, index) => {
                                            return (
                                                <React.Fragment key={bouquet.id}>
                                                    <BouquetItem
                                                        bouquet={bouquet}
                                                        updateSingleBouquet={updateSingleBouquet}
                                                        handleOpenBouquet={handleOpenBouquet}
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
                                    No bouquets
                                </h3>
                        }
                    </div>
            }
        </div>
    )
}

export default BouquetsListBox;