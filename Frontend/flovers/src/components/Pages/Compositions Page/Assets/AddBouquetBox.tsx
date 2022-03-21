import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import classes from '../Compositions.module.css';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
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
    updateBouquetFlowers: () => void,
    setZerosInTempArray: () => void,
    tempItemsAmount: () => number,
    setFlowersData: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    updateBouquetList: () => void,
    handleOpenAdd: () => void,
    bouquetItemsAmount: () => number,
    Florists_data: RootObject | undefined,
    isFetching: boolean,
    isFlowersTabReversed: boolean
}

const AddBouquetBox: React.FC<Props> = ({
    searchTerm,
    setSearchTerm,
    flowersData,
    updateArrayOnInputChange,
    updateBouquetFlowers,
    setZerosInTempArray,
    tempItemsAmount,
    setFlowersData,
    updateBouquetList,
    handleOpenAdd,
    bouquetItemsAmount,
    Florists_data,
    isFetching,
    isFlowersTabReversed
}) => {

    const classes_2 = useStyles();

    return (
        <div className={classes.Add_Flower_Container}>
            <div className={classes.Add_Container_1}>
                <AddBoxIcon className={classes.Icon} />
                <p>
                    New Bouquet
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
                            Add flowers to your new bouquet:
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
                                    </React.Fragment >)
                            })}
                        </div>
                        <button className={classes.Add_Button} type="button"
                            onClick={e => {
                                updateBouquetFlowers();
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
                        <div className={classes.Bouquet_Container} onClick={e => {
                            updateBouquetList();
                            handleOpenAdd();
                        }}>
                            <p>
                                <b>Current Bouquet (<span className={classes.Bouquet_Amount}> {bouquetItemsAmount()} </span>)</b>
                            </p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AddBouquetBox;