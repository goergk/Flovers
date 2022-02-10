import React, { useEffect, useState } from 'react';
import classes from './Deliveries.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import NumbersIcon from '@mui/icons-material/Numbers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import { Flower, useGetFloristQuery } from '../../../services/FloristsApi';

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
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [indexOfElement, setIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState('');
    const [amount, setAmount] = useState('');
    const [firstRunTemp, setFirstRunTemp] = useState(true);
    const [firstRun, setFirstRun] = useState(true);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleCloseEdit = () => setOpenEdit(false);

    const { data: Florists_data, refetch } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));
    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [tmpFlowers, setTmpFlowers] = useState<Flower[] | undefined>();
    const [deliveryFlowers, setDeliveryFlowers] = useState<Flower[] | undefined>();
    const [deliveryList, setDeliveryList] = useState<Flower[] | undefined>();

    useEffect(() => {
        const filteredData = Florists_data?.florist[0].flowers.filter((flower) => flower.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setFlowersData(filteredData);
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
        console.log(tmpFlowers)
    }, [tmpFlowers]);

    useEffect(() => {
        if (firstRun && deliveryFlowers !== undefined) {
            setZerosInDeliveryArray();
            setFirstRun(false);
        }
        console.log(deliveryFlowers)
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
        })
        if (newArr.length > 0) { setDeliveryList(newArr) }
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
                    <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenAdd()}>
                        New Delivery
                    </button>
                </div>
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
                            <div className={classes.Delivery_Modal_Container}>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
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
                                        deliveryItemsAmount() == 0
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
                                {deliveryItemsAmount() > 0 && <button className={classes.Modal_button}>Save</button>}
                            </div>
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
                            <div className={classes.Close_Icon_container}>
                                <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelete} />
                            </div>
                            <h2>
                                Are you sure to delete this delivery?
                            </h2>
                            <form className={classes.Modal_Form}>
                                <button className={classes.Modal_button} onClick={e => { console.log('Deleted :)') }}>Delete</button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
            <div className={classes.Bottom_Container}>
                <div className={classes.Show_Flowers_Container}>
                    <div className={classes.Show_Container_1}>
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
                    <div className={classes.Show_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                        {
                            [1, 2, 3].map((value, index) => {
                                return (
                                    <>
                                        <div className={classes.List_Item_Container}>
                                            <div className={classes.Show_Name}>
                                                <p
                                                    className={indexOfElement !== index
                                                        ?
                                                        classes.List_Container_Text_First
                                                        :
                                                        classes.List_Container_Text_First_True
                                                    }>
                                                    123456
                                                </p>
                                            </div>
                                            <div className={classes.Show_Date}>
                                                <p className={classes.List_Container_Text}
                                                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}
                                                >
                                                    06-01-2021
                                                </p>
                                            </div>
                                            <div className={classes.Show_Amount}>
                                                <DeleteForeverIcon className={classes.More_Options_Icon} onClick={e => handleOpenDelete()} />
                                            </div>
                                        </div>
                                        <div
                                            className={indexOfElement !== index ? classes.More_Options_Container : classes.More_Options_Container_Show}
                                        >
                                            <div className={classes.More_Options_Container_1}>
                                            </div>
                                            {[1, 2, 3].map(item => {
                                                return (
                                                    <div className={classes.More_Options_Container_1}>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classes.Add_Flower_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
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
                        <div className={classes.Add_Flowers_List} style={{ maxHeight: '100%', overflow: 'auto' }}>
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
                                        className={classes_2.root}
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
                                setFlowersData([]);
                                setTimeout(function () {
                                    setFlowersData(Florists_data?.florist[0].flowers);
                                    setSearchTerm('');
                                }, 1);
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
        </div>

    )
}

export default Deliveries;
