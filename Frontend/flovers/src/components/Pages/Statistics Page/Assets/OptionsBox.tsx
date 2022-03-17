import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import classes from '../Stats.module.css';
import { makeStyles } from "@material-ui/core/styles";
import { Bouquet, Flower } from '../../../../services/FloristsApi';

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d97979"
        },
        "& .MuiOutlinedInput-input": {
            color: "gray"
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            color: "#d97979"
        },
        "& .MuiInputLabel-outlined": {
            color: "gray"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#d97979"
        },
        marginBottom: "1em",
        "& .MuiSvgIcon-root": {
            color: "gray"
        },
        "& .css-113ntv0-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator": {
            color: "#d97979"
        },
        paper: {
            backgroundColor: "red"
        }
    }
});

interface Props {
    width: number,
    resetFlowerInput: string,
    resetBouquetInput: string,
    flowersData: Flower[] | undefined,
    bouquetsData: Bouquet[] | undefined,
    setFlower: React.Dispatch<React.SetStateAction<string | null>>,
    setBouquet: React.Dispatch<React.SetStateAction<string | null>>,
    setPeriod: React.Dispatch<React.SetStateAction<string | null>>,
    time_period: string[]
}

const OptionsBox: React.FC<Props> = ({
    width,
    resetFlowerInput,
    resetBouquetInput,
    flowersData,
    bouquetsData,
    setFlower,
    setBouquet,
    setPeriod,
    time_period
}) => {

    const classes_2 = useStyles();

    return (
        <div className={classes.Options_Container}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                key={resetFlowerInput}
                onChange={(e, value) => setFlower(value)}
                options={flowersData!.map(flower => flower.name)}
                sx={width > 768 ? { width: 200 } : { width: '100%' }}
                PaperComponent={({ children }) => (
                    <Paper style={{ background: "rgb(235,235,235)" }}>{children}</Paper>
                )}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        name="flower"
                        size="small"
                        label="Flower"
                        className={classes_2.root}
                    />
                }
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                key={resetBouquetInput}
                onChange={(e, value) => setBouquet(value)}
                options={bouquetsData!.map(bouquet => bouquet.name)}
                sx={width > 768 ? { width: 200 } : { width: '100%' }}
                PaperComponent={({ children }) => (
                    <Paper style={{ background: "rgb(235,235,235)" }}>{children}</Paper>
                )}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        name="bouquet"
                        size="small"
                        label="Bouquet"
                        className={classes_2.root}
                    />
                }
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e, value) => setPeriod(value)}
                options={time_period.map(t => t)}
                sx={width > 768 ? { width: 200 } : { width: '100%' }}
                PaperComponent={({ children }) => (
                    <Paper style={{ background: "rgb(235,235,235)" }}>{children}</Paper>
                )}
                renderInput={(params) =>
                    <TextField
                        {...params} name="period"
                        size="small"
                        label="Period"
                        className={classes_2.root}
                    />
                }
            />
        </div>
    )
}

export default OptionsBox;