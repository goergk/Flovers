import React, { useEffect, useState } from 'react';
import classes from './Deliveries.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
import { Delivery, Flower, useGetFloristQuery } from '../../../services/FloristsApi';
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

const Deliveries = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openMobileAdd, setOpenMobileAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemSearchTerm, setItemSearchTerm] = useState('');
    const [firstRunTemp, setFirstRunTemp] = useState(true);
    const [firstRun, setFirstRun] = useState(true);
    const [loader, setLoader] = useState(false);

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
    const [deliveryList, setDeliveryList] = useState<Flower[] | undefined>();

    const [deliveriesData, setDeliveriesData] = useState(Florists_data?.florist[0].deliveries);
    const [singleDelivery, setSingleDelivery] = useState<Delivery | undefined>();

    useEffect(() => {
        let tempArr: Delivery[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].deliveries.filter((delivery) => delivery.id.toString().includes(itemSearchTerm.toString()))));
            tempArr = tempArr!.reverse();
            setDeliveriesData(tempArr);
        }
    }, [Florists_data, itemSearchTerm])

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers.filter((flower) => flower.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);
        }
        if (Florists_data !== undefined && firstRun) {
            setDeliveryFlowers(Florists_data?.florist[0].flowers);
        }
        if (Florists_data !== undefined && firstRunTemp) {
            setTmpFlowers(Florists_data?.florist[0].flowers);
        }
    }, [Florists_data, searchTerm])

    useEffect(() => {
        if (firstRunTemp && tmpFlowers !== undefined) {
            setZerosInTempArray();
            setFirstRunTemp(false);
        }
    }, [tmpFlowers]);

    useEffect(() => {
        if (firstRun && deliveryFlowers !== undefined) {
            setZerosInDeliveryArray();
            setFirstRun(false);
        }
    }, [deliveryFlowers]);

    const setZerosInTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setTmpFlowers(newArr);
    }

    const setZerosInDeliveryArray = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setDeliveryFlowers(newArr);
    }

    const updateArrayOnInputChange = (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers!));
        newArr.map((flower: Flower) => flower.id === flower_id ? flower.amount = Number(e.target.value) : flower);
        setTmpFlowers(newArr);
    }

    const updateDeliveryFlowers = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers!));
        tmpFlowers?.map((flower, index) => {
            if (flower.amount > 0) {
                newArr[index].amount += flower.amount;
            }
            return flower;
        })
        setDeliveryFlowers(newArr);
    }

    const deleteDeliveryFlower = (flower_id: number) => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers!));
        let index = -1;
        newArr.map((flower: Flower, i: number) => {
            if (flower.id === flower_id) {
                index = i;
            }
            return index;
        })
        newArr.splice(index, 1);
        setDeliveryFlowers(newArr);
    }

    const updateDeliveryList = () => {
        let newArr: Flower[] | undefined = [];
        deliveryFlowers?.map((flower) => {
            if (flower.amount > 0) {
                newArr!.push(flower);
            }
            return flower;
        })
        if (newArr.length > 0) { setDeliveryList(newArr) }
    }

    const updateSingleDelivery = (delivery_id: number) => {
        deliveriesData?.forEach((delivery: Delivery) => {
            delivery.id === delivery_id && setSingleDelivery(delivery);
        })
    }

    const deleteSingleDelivery = (delivery_id: number) => {
        updateFlowersInResources(deliveryList!, true);
        fetch(`http://127.0.0.1:8000/api/delivery/${delivery_id}/delete/`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        setTimeout(function () {
            refetch();
            handleCloseDelete();
        }, 900);
        // setShowDeleteAlert(true);
        // setTimeout(function () {
        //     setShowDeleteAlert(false);
        // }, 2000);
    }

    const deleteListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(deliveryList!));
        newArr.splice(index, 1);
        setDeliveryList(newArr);
    }

    const deliveryItemsAmount = () => {
        let amount = 0;
        deliveryFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const tempItemsAmount = () => {
        let amount = 0;
        tmpFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const addDelivery = () => {
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/delivery/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                flowers: deliveryList
            })
        })
        updateFlowersInResources(deliveryList!, false);
        setDeliveryList([]);
        setZerosInDeliveryArray();
        setZerosInTempArray();
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

    const updateFlowersInResources = (deliveryList: Flower[], del: boolean) => {
        let tempAmount = 0;
        setLoader(true);
        let List: Flower[] = [];
        if (del) { List = singleDelivery!.flowers }
        else { List = deliveryList }

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
                            <AssignmentIcon className={classes.Header_Icon} />
                        </div>
                        <div>
                            <h1>
                                Deliveries
                            </h1>
                            <p>
                                Manage flowers delivered to florist.
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
                                    Add flowers to delivery
                                </h2>
                                <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                    <div className={classes.Nested_Flower_Container}>
                                        <div className={classes.Nested_Flower_Name}>
                                            <b>Search for a flower:</b>
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
                                    {flowersData?.map((flower, index) => {
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
                                                                updateArrayOnInputChange(flower.id, e);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </>)
                                    })}
                                </div>
                                <button className={classes.Add_Button} type="button"
                                    onClick={e => {
                                        updateDeliveryFlowers();
                                        setZerosInTempArray();
                                        if (tempItemsAmount() > 0) {
                                            setFlowersData([]);
                                            setTimeout(function () {
                                                let tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers));
                                                tempArr = tempArr!.reverse();
                                                setFlowersData(tempArr);
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
                                    Delivery {singleDelivery?.id}
                                </h2>
                                <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                    {
                                        singleDelivery?.flowers?.map((flower, index) => {
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
                                                    </div>
                                                </div>
                                            )
                                        })
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
                                        Add new delivery
                                    </h2>
                                    {deliveryItemsAmount() > 0
                                        &&
                                        <div className={classes.Delete_Icon_container}>
                                            <div className={classes.Delete_Icon_Inner_container}
                                                onClick={e => {
                                                    setDeliveryList([]);
                                                    setZerosInDeliveryArray();
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
                                                <h4>No flowers added to delivery</h4>
                                                :
                                                deliveryList?.map((flower, index) => {
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
                                                                        deleteListElement(index);
                                                                        deleteDeliveryFlower(flower.id);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
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
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDelete}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openDelete}>
                        <div className={classes.Modal_container}>
                            {loader
                                ?
                                <Loader />
                                :
                                <>
                                    <div className={classes.Close_Icon_container}>
                                        <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelete} />
                                    </div>
                                    <h2>
                                        Are you sure to delete this delivery?
                                    </h2>
                                    <button className={classes.Modal_button} onClick={e => { deleteSingleDelivery(singleDelivery!.id) }}>Delete</button>
                                </>
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
                                Delivery ID
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
                            <b>Search for a delivery:</b>
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
                            deliveriesData?.length! > 0
                                ?
                                <>
                                    {
                                        deliveriesData?.map((delivery, index) => {
                                            return (
                                                <>
                                                    <div
                                                        className={classes.List_Item_Container}
                                                        key={delivery.id}
                                                        onClick={e => {
                                                            updateSingleDelivery(delivery.id);
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
                                                                {delivery.id}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Date}>
                                                            <p className={classes.List_Container_Text}>
                                                                {delivery.date.toString().split('T')[0]}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Amount}>
                                                            <DeleteForeverIcon className={classes.More_Options_Icon}
                                                                onClick={e => {
                                                                    e.stopPropagation();
                                                                    updateSingleDelivery(delivery.id);
                                                                    handleOpenDelete();
                                                                }} />
                                                        </div>
                                                    </div>
                                                </>
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
                </div>
                <div className={classes.Add_Flower_Container}>
                    <div className={classes.Add_Container_1}>
                        <AddBoxIcon className={classes.Icon} />
                        <p>
                            New Delivery
                        </p>
                    </div>
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
                                                        updateArrayOnInputChange(flower.id, e);
                                                    }}
                                                    className={classes_2.root}
                                                />
                                            </div>
                                        </div>
                                    </>)
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
                </div>
            </div>
        </div >

    )
}

export default Deliveries;
