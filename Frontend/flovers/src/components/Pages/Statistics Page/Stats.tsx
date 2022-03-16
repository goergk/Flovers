import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
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
import { Bouquet, Flower, Sale, useGetFloristQuery } from '../../../services/FloristsApi';
import Loader from '../../Assets/Loader/Loader';

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

const time_period = ['7 days', '30 days', '12 months']

const Stats = () => {
    let today = moment();

    const [width, setWidth] = useState(window.innerWidth);
    const [flower, setFlower] = useState<string | null>("");
    const [bouquet, setBouquet] = useState<string | null>("");
    const [period, setPeriod] = useState<string | null>("");
    const [date, setDate] = useState<string[] | undefined>([]);
    const [dateFilter, setDateFilter] = useState<string[] | undefined>([]);
    const [soldProductsTab, setSoldProductsTab] = useState<number[] | undefined>([]);
    const [showChart, setShowChart] = useState(false);
    const [resetFlowerInput, setResetFlowerInput] = useState(moment().toISOString() + 'S');
    const [resetBouquetInput, setResetBouquetInput] = useState(moment().toISOString());
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState('#d97979');
    const [income, setIncome] = useState(0);

    const { data: Florists_data } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [bouquetsData, setBouquetsData] = useState(Florists_data?.florist[0].bouquets);
    const [salesData, setSalesData] = useState(Florists_data?.florist[0].sales);

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        let tempArr_1: Bouquet[] | undefined = [];
        let tempArr_2: Sale[] | undefined = [];

        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);

            tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets));
            tempArr_1 = tempArr_1!.reverse();
            setBouquetsData(tempArr_1);

            tempArr_2 = JSON.parse(JSON.stringify(Florists_data?.florist[0].sales));
            tempArr_2 = tempArr_2!.reverse();
            setSalesData(tempArr_2);
        }
    }, [Florists_data])

    useEffect(() => {
        if (flower) {
            setBouquet(null);
            setDesc(`Sold '${flower}' flowers`);
            setColor('#d97979');
            setResetBouquetInput(moment().toISOString());
            Count_Flowers();
        }
    }, [flower, date, dateFilter])

    useEffect(() => {
        if (bouquet) {
            setFlower(null);
            setDesc(`Sold '${bouquet}' bouquets`);
            setColor('#7ba79c');
            setResetFlowerInput(moment().toISOString());
            Count_Bouquets();
        }
    }, [bouquet, date, dateFilter])

    useEffect(() => {
        let days_7: string[] = [];
        let days_7_filter: string[] = [];
        for (let i = 0; i < 7; i++) {
            let day = today.subtract(1, 'days');
            if (i === 0) { day = today.add(1, 'days') }
            days_7.push(day.format('YYYY-MM-DD'));
            days_7_filter.push(day.format('YYYY-MM-DD'));
        }
        days_7.reverse();
        days_7_filter.reverse();
        setDate(days_7);
        setDateFilter(days_7_filter);

        setTimeout(function () {
            setShowChart(true);
        }, 1);
    }, [])


    useEffect(() => {
        if (period === time_period[0]) {
            let days_7: string[] = [];
            let days_7_filter: string[] = [];
            for (let i = 0; i < 7; i++) {
                let day = today.subtract(1, 'days');
                if (i === 0) { day = today.add(1, 'days') }
                days_7.push(day.format('MM-DD'));
                days_7_filter.push(day.format('YYYY-MM-DD'));
            }
            days_7.reverse();
            days_7_filter.reverse();
            setDate(days_7);
            setDateFilter(days_7_filter);
        }
        else if (period === time_period[1]) {
            let days_30: string[] = [];
            let days_30_filter: string[] = [];
            for (let i = 0; i < 30; i++) {
                let day = today.subtract(1, 'days');
                if (i === 0) { day = today.add(1, 'days') }
                days_30.push(day.format('MM-DD'));
                days_30_filter.push(day.format('YYYY-MM-DD'));
            }
            days_30.reverse();
            days_30_filter.reverse();
            setDate(days_30);
            setDateFilter(days_30_filter);
        }
        else if (period === time_period[2]) {
            let months_12: string[] = [];
            let months_12_filter: string[] = [];
            for (let i = 0; i < 12; i++) {
                let month = today.subtract(1, 'months');
                if (i === 0) { month = today.add(1, 'months') }
                months_12.push(month.format('MM-YYYY'));
                months_12_filter.push(month.format('YYYY-MM'));
            }
            months_12.reverse();
            months_12_filter.reverse();
            setDate(months_12);
            setDateFilter(months_12_filter);
        }

    }, [period])

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
                label: desc,
                fill: false,
                lineTension: 0,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                data: soldProductsTab
            }
        ]
    }

    const Count_Flowers = () => {
        let sold_flowers_tab: number[] = [];
        let sales_in_date: Sale[] = [];
        let flowers_income = 0;

        salesData?.forEach(sale => {
            dateFilter?.forEach(t => {
                if (period === time_period[2]) {
                    if (t === sale.creation_date.toString().substr(0, 7)) {
                        sales_in_date.push(sale);
                    }
                }
                else {
                    if (t === sale.creation_date.toString().split('T')[0]) {
                        sales_in_date.push(sale);
                    }
                }
            })
        })

        dateFilter?.forEach(t => {
            let amount = 0;
            sales_in_date.forEach(sale => {
                if (period === time_period[2]) {
                    if (sale.creation_date.toString().substr(0, 7) === t) {
                        sale.flowers.forEach(flwr => {
                            if (flwr.name === flower) {
                                amount += flwr.amount;
                                flowers_income += flwr.amount * parseFloat(flwr.price);
                            }
                        })
                    }
                } else {
                    if (sale.creation_date.toString().split('T')[0] === t) {
                        sale.flowers.forEach(flwr => {
                            if (flwr.name === flower) {
                                amount += flwr.amount;
                                flowers_income += flwr.amount * parseFloat(flwr.price);
                            }
                        })
                    }
                }

            })
            sold_flowers_tab.push(amount);
        })

        setSoldProductsTab(sold_flowers_tab);
        setIncome(flowers_income);
    }

    const Count_Bouquets = () => {
        let sold_bouquets_tab: number[] = [];
        let sales_in_date: Sale[] = [];
        let bouquets_income = 0;

        salesData?.forEach(sale => {
            dateFilter?.forEach(t => {
                if (period === time_period[2]) {
                    if (t === sale.creation_date.toString().substr(0, 7)) {
                        sales_in_date.push(sale);
                    }
                }
                else {
                    if (t === sale.creation_date.toString().split('T')[0]) {
                        sales_in_date.push(sale);
                    }
                }
            })
        })

        dateFilter?.forEach(t => {
            let amount = 0;
            sales_in_date.forEach(sale => {
                if (period === time_period[2]) {
                    if (sale.creation_date.toString().substr(0, 7) === t) {
                        sale.bouquets.forEach(bqt => {
                            if (bqt.bouquet.name === bouquet) {
                                amount += bqt.amount;
                                bqt.bouquet.flowers.forEach(flwr => {
                                    bouquets_income += flwr.amount * parseFloat(flwr.price);
                                })
                            }
                        })
                    }
                } else {
                    if (sale.creation_date.toString().split('T')[0] === t) {
                        sale.bouquets.forEach(bqt => {
                            if (bqt.bouquet.name === bouquet) {
                                amount += bqt.amount;
                                bqt.bouquet.flowers.forEach(flwr => {
                                    bouquets_income += flwr.amount * parseFloat(flwr.price);
                                })
                            }
                        })
                    }
                }

            })
            sold_bouquets_tab.push(amount);
        })

        setSoldProductsTab(sold_bouquets_tab);
        setIncome(bouquets_income);
    }

    const reducer = (accumulator: number, curr: number) => accumulator + curr;

    const AverageOfSoldFlowers = () => {
        let average = 0;
        if (soldProductsTab?.length!) {
            average = soldProductsTab?.reduce(reducer) / date?.length!
        }
        return average;
    }

    const AverageOfIncomes = () => {
        let average = 0;
        if (soldProductsTab?.length!) {
            average = income / date?.length!
        }
        return average;
    }

    const classes_2 = useStyles();

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Header_Container}>
                <h3>
                    Follow sales of your flowers &amp; bouquets:
                </h3>
            </div>
            {flowersData === undefined || bouquetsData === undefined
                ?
                <Loader />
                :
                <>
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
                    <div className={classes.Chart_Container}>
                        {
                            showChart
                            &&
                            <Line
                                data={state}
                            />
                        }

                    </div>
                    <div className={classes.Info_Container}>
                        <div className={classes.Single_Info_Container}>
                            <div className={classes.Icon_Container}>
                                <InfoIcon className={classes.Info_Icon} />
                            </div>
                            <div className={classes.Text_Container}>
                                {
                                    soldProductsTab?.length!
                                        ?
                                        <p>Sum of the {flower ? 'flowers' : 'bouquets'} sold in the last {period ? period : '7 days'}:
                                            <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                &nbsp;
                                                {soldProductsTab?.reduce(reducer)}
                                            </b>.
                                        </p>
                                        :
                                        <p>Select flower or bouquet to see information about it.</p>
                                }
                            </div>
                        </div>
                        {
                            soldProductsTab?.length!
                                ?
                                <>
                                    <div className={classes.Single_Info_Container}>
                                        <div className={classes.Icon_Container}>
                                            <InfoIcon className={classes.Info_Icon} />
                                        </div>
                                        <div className={classes.Text_Container}>
                                            {
                                                soldProductsTab?.length!
                                                    ?
                                                    <p>Average sales per {period !== time_period[2] || !period ? 'day' : 'month'} in the last {period ? period : '7 days'}:
                                                        <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                            &nbsp;
                                                            {AverageOfSoldFlowers().toFixed(2)}
                                                        </b>.
                                                    </p>
                                                    :
                                                    <p>Select flower or bouquet to see information about it.</p>
                                            }
                                        </div>
                                    </div>
                                    <div className={classes.Single_Info_Container}>
                                        <div className={classes.Icon_Container}>
                                            <InfoIcon className={classes.Info_Icon} />
                                        </div>
                                        <div className={classes.Text_Container}>
                                            {
                                                soldProductsTab?.length!
                                                    ?
                                                    <p>Total revenue for {flower ? 'flower' : 'bouquet'} sales over the last {period ? period : '7 days'}:
                                                        <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                            &nbsp;
                                                            {income.toFixed(2)}
                                                            $
                                                        </b>.
                                                    </p>
                                                    :
                                                    <p>Select flower or bouquet to see information about it.</p>
                                            }
                                        </div>
                                    </div>
                                    <div className={classes.Single_Info_Container}>
                                        <div className={classes.Icon_Container}>
                                            <InfoIcon className={classes.Info_Icon} />
                                        </div>
                                        <div className={classes.Text_Container}>
                                            {
                                                soldProductsTab?.length!
                                                    ?
                                                    <p>Average sales per {period !== time_period[2] || !period ? 'day' : 'month'} in the last {period ? period : '7 days'}:
                                                        <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                            &nbsp;
                                                            {AverageOfIncomes().toFixed(2)}
                                                            $
                                                        </b>.
                                                    </p>
                                                    :
                                                    <p>Select flower or bouquet to see information about it.</p>
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                <p></p>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Stats;
