import React, { useEffect, useState } from 'react';
import classes from './Stats.module.css';
import { Line } from 'react-chartjs-2';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { Bouquet, Flower, useGetFloristQuery } from '../../../services/FloristsApi';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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

const time_period = [
    { p: '7 days' },
    { p: '30 days' },
    { p: '12 months' }
]

const Stats = () => {
    let today = moment();

    const [width, setWidth] = useState(window.innerWidth);
    const [flower, setFlower] = useState<string | null>("");
    const [bouquet, setBouquet] = useState<string | null>("");
    const [period, setPeriod] = useState<string | null>("");
    const [date, setDate] = useState<string[] | undefined>([]);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        console.log(flower);
    }, [flower])

    useEffect(() => {
        console.log(bouquet);
    }, [bouquet])

    useEffect(() => {
        let days_7: string[] = [];
        for (let i = 0; i < 7; i++) {
            let day = today.subtract(1, 'days');
            if (i === 0) { day = today.add(1, 'days') }
            days_7.push(day.format('MM-DD'));
        }
        days_7.reverse();
        setDate(days_7);

        setTimeout(function () {
            setShowChart(true);
        }, 1);
    }, [])


    useEffect(() => {
        console.log(period);
        if (period === time_period[0].p) {
            let days_7: string[] = [];
            for (let i = 0; i < 7; i++) {
                let day = today.subtract(1, 'days');
                if (i === 0) { day = today.add(1, 'days') }
                days_7.push(day.format('MM-DD'));
            }
            days_7.reverse();
            setDate(days_7);
        }
        else if (period === time_period[1].p) {
            let days_30: string[] = [];
            for (let i = 0; i < 30; i++) {
                let day = today.subtract(1, 'days');
                if (i === 0) { day = today.add(1, 'days') }
                days_30.push(day.format('MM-DD'));
            }
            days_30.reverse();
            setDate(days_30);
        }
        else if (period === time_period[2].p) {
            let months_12: string[] = [];
            for (let i = 0; i < 12; i++) {
                let month = today.subtract(1, 'months');
                if (i === 0) { month = today.add(1, 'months') }
                months_12.push(month.format('MM-YYYY'));
            }
            months_12.reverse();
            setDate(months_12);
        }
    }, [period])

    const { data: Florists_data, refetch } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [bouquetsData, setBouquetsData] = useState(Florists_data?.florist[0].bouquets);

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        let tempArr_1: Bouquet[] | undefined = [];

        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);

            tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets));
            tempArr_1 = tempArr_1!.reverse();
            setBouquetsData(tempArr_1);
        }
    }, [Florists_data])

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    let state = {
        labels: date,
        datasets: [
            {
                label: 'Sold flowers',
                fill: false,
                lineTension: 0,
                backgroundColor: '#d97979',
                borderColor: '#d97979',
                borderWidth: 1,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }

    const classes_2 = useStyles();

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Header_Container}>
                <h3>
                    Follow sales of your flowers &amp; bouquets:
                </h3>
            </div>
            <div className={classes.Options_Container}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
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
                    options={time_period.map(p => p.p)}
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
            <div className={classes.Chart_Container}>
                {
                    showChart
                    &&
                    <Line
                        data={state}
                    />
                }

            </div>
        </div>
    )
}

export default Stats;
