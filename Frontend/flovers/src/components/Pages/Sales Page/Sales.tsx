import React, { useEffect, useState } from 'react';
import classes from './Sales.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import NumbersIcon from '@mui/icons-material/Numbers';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import { Bouquet, Delivery, Flower, Sale, useGetFloristQuery } from '../../../services/FloristsApi';
import Loader from '../../Assets/Loader/Loader';

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

const Sales = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openMobileAdd, setOpenMobileAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemSearchTerm, setItemSearchTerm] = useState('');
    const [firstRunTemp, setFirstRunTemp] = useState(true);
    const [firstRun, setFirstRun] = useState(true);
    const [loader, setLoader] = useState(false);
    const [switch_, setSwitch] = useState(true);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenMobileAdd = () => setOpenMobileAdd(true);
    const handleCloseMobileAdd = () => setOpenMobileAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenDelivery = () => setOpenDelivery(true);
    const handleCloseDelivery = () => setOpenDelivery(false);

    const { data: Florists_data, refetch } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [tmpFlowers, setTmpFlowers] = useState<Flower[] | undefined>();
    const [deliveryFlowers, setDeliveryFlowers] = useState<Flower[] | undefined>();
    const [saleFlowersList, setSaleFlowersList] = useState<Flower[] | undefined>();

    const [BouquetsData, setBouquetsData] = useState<Bouquet[] | undefined>();
    const [tmpBouquets, setTmpBouquets] = useState<{ bouquet: Bouquet, amount: number }[] | undefined>([]);
    const [deliveryBouquets, setDeliveryBouquets] = useState<{ bouquet: Bouquet, amount: number }[] | undefined>([]);
    const [saleBouquetsList, setSaleBouquetsList] = useState<{ bouquet: Bouquet, amount: number }[] | undefined>([]);

    const [tmpFlowersAmount, setTmpFlowersAmount] = useState<{ flower_name: string, amount: number }[] | undefined>([]);

    const [salesData, setSalesData] = useState(Florists_data?.florist[0].sales);
    const [singleDelivery, setSingleDelivery] = useState<Sale | undefined>();

    useEffect(() => {
        let tempArr: Sale[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].sales.filter((sale) => sale.id.toString().includes(itemSearchTerm.toString()))));
            tempArr = tempArr!.reverse();
            setSalesData(tempArr);
        }
    }, [Florists_data, itemSearchTerm])

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        let tempArr_1: Bouquet[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers.filter((flower) => flower.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);

            tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets.filter((bouquet) => bouquet.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))));
            tempArr_1 = tempArr_1!.reverse();
            setBouquetsData(tempArr_1);
        }
        if (Florists_data !== undefined && firstRun) {
            setDeliveryFlowers(Florists_data?.florist[0].flowers);
            let tempBouquet: { bouquet: Bouquet, amount: number }[] = [];
            Florists_data?.florist[0].bouquets.forEach((bouquet) => tempBouquet.push({ bouquet: bouquet, amount: 0 }));
            setDeliveryBouquets(tempBouquet);

            let tmp: { flower_name: string, amount: number }[] | undefined = [];
            Florists_data?.florist[0].flowers.forEach((flower) => tmp?.push({ flower_name: flower.name, amount: flower.amount }));
            setTmpFlowersAmount(tmp);
        }
        if (Florists_data !== undefined && firstRunTemp) {
            setTmpFlowers(Florists_data?.florist[0].flowers);
            let tempBouquet: { bouquet: Bouquet, amount: number }[] = [];
            Florists_data?.florist[0].bouquets.forEach((bouquet) => tempBouquet.push({ bouquet: bouquet, amount: 0 }));
            setTmpBouquets(tempBouquet);
        }
    }, [Florists_data, searchTerm])

    useEffect(() => {
        if (firstRunTemp && tmpFlowers !== undefined) {
            setZerosInFlowersTempArray();
            setFirstRunTemp(false);
        }
    }, [tmpFlowers]);

    useEffect(() => {
        if (firstRun && deliveryFlowers !== undefined) {
            setZerosInDeliveryFlowersArray();
            setFirstRun(false);
        }
    }, [deliveryFlowers]);

    const setZerosInFlowersTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setTmpFlowers(newArr);
    }

    const setZerosInBouquetsTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpBouquets));
        newArr.map((item: { bouquet: Bouquet, amount: number }) => item.amount = 0);
        setTmpBouquets(newArr);
    }

    const setZerosInDeliveryFlowersArray = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setDeliveryFlowers(newArr);
    }

    const setZerosInDeliveryBouquetsArray = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryBouquets));
        newArr.map((item: { bouquet: Bouquet, amount: number }) => item.amount = 0);
        setDeliveryBouquets(newArr);
    }

    const updateFlowersArrayOnInputChange = (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers!));
        newArr.map((flower: Flower) => flower.id === flower_id ? flower.amount = Number(e.target.value) : flower);
        setTmpFlowers(newArr);
    }

    const updateBouquetsArrayOnInputChange = (bouquet_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpBouquets!));
        newArr.map((item: { bouquet: Bouquet, amount: number }) => item.bouquet.id === bouquet_id ? item.amount = Number(e.target.value) : item);
        setTmpBouquets(newArr);
    }

    const updateSaleFlowers = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));
        tmpFlowers?.forEach((flower, index) => {
            if (flower.amount > 0) {
                tmpFlowersAmount?.forEach((flwr, indx) => {
                    if (flwr.flower_name === flower.name) {
                        if (flwr.amount - flower.amount >= 0) {
                            newArr[index].amount += flower.amount;
                            newArr_1[indx].amount -= flower.amount;
                        } else {
                            console.log("No enough flowers to add this.");
                            // Display Error Alert
                        }
                    }
                })
            }
        })
        setTmpFlowersAmount(newArr_1);
        setDeliveryFlowers(newArr);
    }

    const updateSaleBouquets = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryBouquets!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));
        tmpBouquets?.forEach((item, index) => {
            if (item.amount > 0) {
                let isAmount = true;
                item.bouquet.flowers.forEach(flower => {
                    if (isAmount) {
                        tmpFlowersAmount?.forEach(flwr => {
                            if (flwr.flower_name === flower.name) {
                                if (flwr.amount - (flower.amount * item.amount) < 0) {
                                    isAmount = false;
                                }
                            }
                        })
                    }
                })
                if (isAmount) {
                    newArr[index].amount += item.amount;
                    item.bouquet.flowers.forEach(flower => {
                        tmpFlowersAmount?.forEach((flwr, indx) => {
                            if (flwr.flower_name === flower.name) {
                                newArr_1[indx].amount -= (flower.amount * item.amount);
                            }
                        })
                    })
                } else {
                    console.log("No enough flowers to add this.");
                    // Display Error Alert
                }
            }
        })
        setTmpFlowersAmount(newArr_1);
        setDeliveryBouquets(newArr);
    }

    const deleteSaleFlower = (flower_id: number) => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));

        deliveryFlowers?.forEach((flower, index) => {
            tmpFlowersAmount?.forEach((flwr, indx) => {
                if (flwr.flower_name === flower.name) {
                    newArr_1[indx].amount += flower.amount;
                    newArr[index].amount = 0;
                }
            })
        })

        setTmpFlowersAmount(newArr_1);
        setDeliveryFlowers(newArr);
    }

    const deleteSaleBouquet = (bouquet_id: number) => {
        let newArr = JSON.parse(JSON.stringify(deliveryBouquets!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));

        deliveryBouquets?.forEach((item, index) => {
            if (item.bouquet.id === bouquet_id) {
                item.bouquet.flowers.forEach(flower => {
                    tmpFlowersAmount?.forEach((flwr, indx) => {
                        if (flwr.flower_name === flower.name) {
                            newArr_1[indx].amount += (flower.amount * item.amount);
                            newArr[index].amount = 0;
                        }
                    })
                })
            }
        })

        setTmpFlowersAmount(newArr_1);
        setDeliveryBouquets(newArr);
    }

    const deleteAllItemsInSale = () => {

        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));

        deliveryFlowers?.forEach((flower) => {
            if (flower.amount > 0) {
                tmpFlowersAmount?.forEach((flwr, indx) => {
                    if (flwr.flower_name === flower.name) {
                        newArr_1[indx].amount += flower.amount;
                    }
                })
            }
        });

        setTmpFlowersAmount(newArr_1);

        deliveryBouquets?.forEach((item) => {
            if (item.amount > 0) {
                item.bouquet.flowers.forEach(flower => {
                    tmpFlowersAmount?.forEach((flwr, indx) => {
                        if (flwr.flower_name === flower.name) {
                            newArr_1[indx].amount += (flower.amount * item.amount);
                        }
                    })
                })
            }
        });

        setTmpFlowersAmount(newArr_1);

        setZerosInDeliveryFlowersArray();
        setZerosInDeliveryBouquetsArray();
    }

    const updateSaleList = () => {
        let newArr: Flower[] | undefined = [];
        let newArr_1: { bouquet: Bouquet, amount: number }[] | undefined = [];
        deliveryFlowers?.map((flower) => {
            if (flower.amount > 0) {
                newArr!.push(flower);
            }
            return flower;
        })
        deliveryBouquets?.map((item) => {
            if (item.amount > 0) {
                newArr_1!.push(item);
            }
            return item;
        })
        if (newArr.length > 0) {
            setSaleFlowersList(newArr)
        }
        else {
            setSaleFlowersList([])
        }
        if (newArr_1.length > 0) {
            setSaleBouquetsList(newArr_1)
        }
        else {
            setSaleBouquetsList([])
        }
    }

    const updateSingleDelivery = (sale_id: number) => {
        salesData?.forEach((sale: Sale) => {
            sale.id === sale_id && setSingleDelivery(sale);
        })
    }

    const deleteFlowerListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(saleFlowersList!));
        newArr.splice(index, 1);
        setSaleFlowersList(newArr);
    }

    const deleteBouquetListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(saleBouquetsList!));
        newArr.splice(index, 1);
        setSaleBouquetsList(newArr);
    }

    const deliveryItemsAmount = () => {
        let amount = 0;
        deliveryFlowers?.forEach(flower => flower.amount > 0 && amount++);
        deliveryBouquets?.forEach(item => item.amount > 0 && amount++);
        return amount;
    }

    const tempItemsAmount = () => {
        let amount = 0;
        tmpFlowers?.forEach(flower => flower.amount > 0 && amount++);
        tmpBouquets?.forEach(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const addDelivery = () => {
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/sale/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                flowers: saleFlowersList,
                bouquets: saleBouquetsList
            })
        })

        flowersData?.forEach((flower) => {
            saleFlowersList?.forEach((flwr) => {
                if (flwr.name === flower.name) {
                    let tempAmount = flower.amount - flwr.amount;
                    fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            name: flower.name,
                            price: flower.price,
                            amount: tempAmount
                        })
                    })
                }
            })
        })

        saleBouquetsList?.forEach(bouquetObject => {
            bouquetObject.bouquet.flowers.forEach(flwr => {
                flowersData?.forEach(flower => {
                    if (flwr.name === flower.name) {
                        let tempAmount = flower.amount - flwr.amount * bouquetObject.amount;
                        fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json;charset=UTF-8',
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                name: flower.name,
                                price: flower.price,
                                amount: tempAmount
                            })
                        })
                    }
                })
            })
        })

        setZerosInDeliveryFlowersArray();
        setZerosInDeliveryBouquetsArray();
        setSaleFlowersList([]);
        setSaleBouquetsList([]);
        setTimeout(function () {
            refetch();
            handleCloseMobileAdd();
            handleCloseAdd();
        }, 900);
        // setShowAddAlert(true);
        // setTimeout(function () {
        //     setShowAddAlert(false);
        // }, 2000);
    }

    const updateFlowersInResources = (saleFlowersList: Flower[], del: boolean) => {
        let tempAmount = 0;
        setLoader(true);
        let List: Flower[] = [];
        if (del) { List = singleDelivery!.flowers }
        else { List = saleFlowersList }

        List.forEach(flower => {
            flowersData?.forEach(flower_ => {
                if (flower_.name === flower.name) {
                    if (del) { tempAmount = flower_.amount - flower.amount; }
                    else { tempAmount = flower_.amount + flower.amount; }
                    fetch(`http://127.0.0.1:8000/api/flower/${flower_.id}/update/`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            name: flower_.name,
                            price: flower_.price,
                            amount: tempAmount
                        })
                    })
                    tempAmount = 0;
                }
            })
        })
        setTimeout(function () {
            setLoader(false);
        }, 1100);
    }

    const classes_2 = useStyles();

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Top_Container}>
                <div className={classes.Header_Container}>
                    <div className={classes.Header_Container_1}>
                        <div className={classes.Icon_Container}>
                            <MonetizationOnIcon className={classes.Header_Icon} />
                        </div>
                        <div>
                            <h1>
                                Sales
                            </h1>
                            <p>
                                Sell your flowers and bouquets.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={classes.Button_Container_Mobile}>
                    <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenMobileAdd()}>
                        New Delivery
                    </button>
                </div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openMobileAdd}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openMobileAdd}>
                        <div className={classes.Mobile_Delivery_Modal_container}>
                            <div className={classes.Delivery_Modal_Container}>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseMobileAdd} />
                                </div>
                                <h2>
                                    Add flowers to sale
                                </h2>
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
                                <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                    <div className={classes.Nested_Flower_Container}>
                                        <div className={classes.Nested_Flower_Name}>
                                            {
                                                switch_
                                                    ?
                                                    <b>Search for a flower:</b>
                                                    :
                                                    <b>Search for a bouquet:</b>
                                            }

                                        </div>
                                        <div className={classes.Nested_Flower_Input} style={{ marginRight: '0.2em' }}>
                                            <TextField
                                                id="Search"
                                                label="Search Name"
                                                variant="outlined"
                                                size="small"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        switch_
                                            ?
                                            flowersData?.map((flower, index) => {
                                                return (
                                                    <>
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
                                                                />
                                                            </div>
                                                        </div>
                                                    </>)
                                            })
                                            :
                                            BouquetsData?.map((bouquet, index) => {
                                                return (
                                                    <>
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
                                                                />
                                                            </div>
                                                        </div>
                                                    </>)
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
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDelivery}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openDelivery}>
                        <div className={classes.Main_Delivery_Modal_container}>
                            <div className={classes.Delivery_Modal_Container}>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelivery} />
                                </div>
                                <h2>
                                    Sale {singleDelivery?.id}
                                </h2>
                                <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                    {
                                        <>
                                            {
                                                singleDelivery?.flowers?.map((flower, index) => {
                                                    return (
                                                        <div className={classes.Delivery_Item_Container} key={flower.id}>
                                                            <div className={classes.Container_C1}>
                                                                <b>{index + 1}</b>
                                                            </div>
                                                            <div className={classes.Container_C2} style={{ color: 'green', fontWeight: '500' }}>
                                                                {flower.name}
                                                            </div>
                                                            <div className={classes.Container_C3}>
                                                                {flower.amount}
                                                            </div>
                                                            <div className={classes.Container_C4}>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                singleDelivery?.bouquets?.map((bouquetObject, index) => {
                                                    return (
                                                        <div className={classes.Delivery_Item_Container} key={bouquetObject.id}>
                                                            <div className={classes.Container_C1}>
                                                                {
                                                                    singleDelivery?.flowers?.length
                                                                        ?
                                                                        <b>{index + singleDelivery?.flowers?.length! + 1}</b>
                                                                        :
                                                                        <b>{index + 1}</b>
                                                                }
                                                            </div>
                                                            <div className={classes.Container_C2} style={{ color: 'purple', fontWeight: '500' }}>
                                                                {bouquetObject.bouquet.name}
                                                            </div>
                                                            <div className={classes.Container_C3}>
                                                                {bouquetObject.amount}
                                                            </div>
                                                            <div className={classes.Container_C4}>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>

                                    }
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>


                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openAdd}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openAdd}>
                        <div className={classes.Main_Delivery_Modal_container}>
                            {loader
                                ?
                                <Loader />
                                :

                                <div className={classes.Delivery_Modal_Container}>
                                    <div className={classes.Close_Icon_container} style={openMobileAdd ? { justifyContent: 'flex-start' } : undefined}>
                                        {openMobileAdd
                                            ?
                                            <KeyboardBackspaceIcon className={classes.Back_Icon} onClick={handleCloseAdd} />
                                            :
                                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
                                        }

                                    </div>
                                    <h2>
                                        Add new sale
                                    </h2>
                                    {deliveryItemsAmount() > 0
                                        &&
                                        <div className={classes.Delete_Icon_container}>
                                            <div className={classes.Delete_Icon_Inner_container}
                                                onClick={e => {
                                                    setSaleFlowersList([]);
                                                    setSaleBouquetsList([]);
                                                    deleteAllItemsInSale();
                                                }}
                                            >
                                                Delete all <DeleteOutlineIcon />
                                            </div>
                                        </div>
                                    }
                                    <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                        {
                                            deliveryItemsAmount() === 0
                                                ?
                                                <h4>No items added to sale</h4>
                                                :
                                                <>
                                                    {saleFlowersList?.map((flower, index) => {
                                                        return (
                                                            <div className={classes.Delivery_Item_Container} key={flower.id}>
                                                                <div className={classes.Container_C1}>
                                                                    <b>{index + 1}</b>
                                                                </div>
                                                                <div className={classes.Container_C2}>
                                                                    {flower.name}
                                                                </div>
                                                                <div className={classes.Container_C3}>
                                                                    {flower.amount}
                                                                </div>
                                                                <div className={classes.Container_C4}>
                                                                    <ClearIcon className={classes.Clear_Icon}
                                                                        onClick={e => {
                                                                            deleteFlowerListElement(index);
                                                                            deleteSaleFlower(flower.id);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    {saleBouquetsList?.map((item, index) => {
                                                        return (
                                                            <div className={classes.Delivery_Item_Container} key={item.bouquet.id}>
                                                                <div className={classes.Container_C1}>
                                                                    {
                                                                        saleFlowersList?.length
                                                                            ?
                                                                            <b>{index + saleFlowersList?.length! + 1}</b>
                                                                            :
                                                                            <b>{index + 1}</b>
                                                                    }
                                                                </div>
                                                                <div className={classes.Container_C2}>
                                                                    {item.bouquet.name}
                                                                </div>
                                                                <div className={classes.Container_C3}>
                                                                    {item.amount}
                                                                </div>
                                                                <div className={classes.Container_C4}>
                                                                    <ClearIcon className={classes.Clear_Icon}
                                                                        onClick={e => {
                                                                            deleteBouquetListElement(index);
                                                                            deleteSaleBouquet(item.bouquet.id);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                        }
                                    </div>
                                    {deliveryItemsAmount() > 0
                                        &&
                                        <button className={classes.Modal_button} onClick={addDelivery}>Save</button>
                                    }
                                </div>
                            }
                        </div>
                    </Fade>
                </Modal>
            </div>
            <div className={classes.Bottom_Container}>
                <div className={classes.Show_Flowers_Container}>
                    <div className={classes.Show_Container_1}>
                        <div className={classes.Show_Number}>
                            <Grid3x3Icon className={classes.Icon} />
                        </div>
                        <div className={classes.Show_Name}>
                            <NumbersIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Sale ID
                            </p>
                        </div>
                        <div className={classes.Show_Date}>
                            <EventIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Added
                            </p>
                        </div>
                    </div>
                    <div className={classes.Search_Container}>
                        <div>
                            <b>Search for a sale:</b>
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
                    <div className={classes.Show_Container_2}>
                        {
                            salesData?.length! > 0
                                ?
                                <>
                                    {
                                        salesData?.map((sale, index) => {
                                            return (
                                                <>
                                                    <div
                                                        className={classes.List_Item_Container}
                                                        key={sale.id}
                                                        onClick={e => {
                                                            updateSingleDelivery(sale.id);
                                                            handleOpenDelivery();
                                                        }}
                                                    >
                                                        <div className={classes.Show_Number}>
                                                            <p className={classes.List_Container_Text}>
                                                                {index + 1}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Name}>
                                                            <p className={classes.List_Container_Text_First}>
                                                                {sale.id}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Date}>
                                                            <p className={classes.List_Container_Text}>
                                                                {sale.creation_date.toString().split('T')[0]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
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
                </div>
                <div className={classes.Add_Flower_Container}>
                    <div className={classes.Add_Container_1}>
                        <AddBoxIcon className={classes.Icon} />
                        <p>
                            New Sale
                        </p>
                    </div>
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
                                            <>
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
                                            </>)
                                    })
                                    :
                                    BouquetsData?.map((bouquet, index) => {
                                        return (
                                            <>
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
                                            </>)
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
                </div>
            </div>
        </div >

    )
}

export default Sales;
