import React, { useEffect, useState } from 'react';
import classes from './Compositions.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventIcon from '@mui/icons-material/Event';
import GrassIcon from '@mui/icons-material/Grass';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import { Bouquet, Flower, useGetFloristQuery } from '../../../services/FloristsApi';
import Loader from '../../Assets/Loader/Loader';
import * as Yup from "yup";
import { useFormik } from "formik";

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

const initialValues = {
    Name: ""
};

const FORM_VALIDATION = Yup.object().shape({
    Name: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(16, 'Max length is 16')
});

const Compositions = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openMobileAdd, setOpenMobileAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openBouquet, setOpenBouquet] = useState(false);
    const [err, setErr] = useState(false);
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
    const handleOpenBouquet = () => setOpenBouquet(true);
    const handleCloseBouquet = () => setOpenBouquet(false);

    const { data: Florists_data, refetch } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [tmpFlowers, setTmpFlowers] = useState<Flower[] | undefined>();
    const [bouquetsFlowers, setBouquetsFlowers] = useState<Flower[] | undefined>();
    const [BouquetList, setBouquetList] = useState<Flower[] | undefined>();

    const [bouquetsData, setBouquetsData] = useState(Florists_data?.florist[0].bouquets);
    const [singleBouquet, setSingleBouquet] = useState<Bouquet | undefined>();

    useEffect(() => {
        let tempArr: Bouquet[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets.filter((bouquet) => bouquet.name.toLowerCase().includes(itemSearchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setBouquetsData(tempArr);
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
            setBouquetsFlowers(Florists_data?.florist[0].flowers);
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
        if (firstRun && bouquetsFlowers !== undefined) {
            setZerosInBouquetArray();
            setFirstRun(false);
        }
    }, [bouquetsFlowers]);

    const setZerosInTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setTmpFlowers(newArr);
    }

    const setZerosInBouquetArray = () => {
        let newArr = JSON.parse(JSON.stringify(bouquetsFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setBouquetsFlowers(newArr);
    }

    const updateArrayOnInputChange = (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers!));
        newArr.map((flower: Flower) => flower.id === flower_id ? flower.amount = Number(e.target.value) : flower);
        setTmpFlowers(newArr);
    }

    const updateBouquetFlowers = () => {
        let newArr = JSON.parse(JSON.stringify(bouquetsFlowers!));
        tmpFlowers?.map((flower, index) => {
            if (flower.amount > 0) {
                newArr[index].amount += flower.amount;
            }
            return flower;
        })
        setBouquetsFlowers(newArr);
    }

    const deleteBouquetFlower = (flower_id: number) => {
        let newArr = JSON.parse(JSON.stringify(bouquetsFlowers!));
        let index = -1;
        newArr.map((flower: Flower, i: number) => {
            if (flower.id === flower_id) {
                index = i;
            }
            return index;
        })
        newArr.splice(index, 1);
        setBouquetsFlowers(newArr);
    }

    const updateBouquetList = () => {
        let newArr: Flower[] | undefined = [];
        bouquetsFlowers?.map((flower) => {
            if (flower.amount > 0) {
                newArr!.push(flower);
            }
            return flower;
        })
        if (newArr.length > 0) { setBouquetList(newArr) }
    }

    const updateSingleBouquet = (bouquet_id: number) => {
        bouquetsData?.forEach((bouquet: Bouquet) => {
            bouquet.id === bouquet_id && setSingleBouquet(bouquet);
        })
    }

    const deleteSingleBouquet = (bouquet_id: number) => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/bouquet/${bouquet_id}/delete/`, {
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
            setTimeout(function () {
                setLoader(false);
            }, 200);
        }, 900);
        // setShowDeleteAlert(true);
        // setTimeout(function () {
        //     setShowDeleteAlert(false);
        // }, 2000);
    }

    const deleteListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(BouquetList!));
        newArr.splice(index, 1);
        setBouquetList(newArr);
    }

    const bouquetItemsAmount = () => {
        let amount = 0;
        bouquetsFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const tempItemsAmount = () => {
        let amount = 0;
        tmpFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const onSubmit = () => {
        setErr(false);
        if (bouquetsData !== undefined) {
            let isSameName = false;
            bouquetsData?.forEach(bouquet => {
                if (values.Name === bouquet.name) {
                    isSameName = true;
                }
            });
            if (isSameName) {
                setErr(true);
            }
            else {
                handleAdd();
            }
        } else {
            handleAdd();
        }
    }

    const handleAdd = () => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/bouquet/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: values.Name,
                flowers: BouquetList
            })
        })
        setBouquetList([]);
        setZerosInBouquetArray();
        setZerosInTempArray();
        setTimeout(function () {
            refetch();
            handleCloseMobileAdd();
            handleCloseAdd();
            setTimeout(function () {
                setLoader(false);
            }, 200);
        }, 900);
        values.Name = "";
        // setShowAddAlert(true);
        // setTimeout(function () {
        //     setShowAddAlert(false);
        // }, 2000);
    }

    const { handleChange, handleSubmit, values, errors, setErrors } = useFormik({
        initialValues,
        validationSchema: FORM_VALIDATION,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit,
    });

    const classes_2 = useStyles();

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Top_Container}>
                <div className={classes.Header_Container}>
                    <div className={classes.Header_Container_1}>
                        <div className={classes.Icon_Container}>
                            <GrassIcon className={classes.Header_Icon} />
                        </div>
                        <div>
                            <h1>
                                Compose
                            </h1>
                            <p>
                                Create bouquets out of the available flowers.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={classes.Button_Container_Mobile}>
                    <button className={classes.Add_Bouquet_Button_Mobile} onClick={e => handleOpenMobileAdd()}>
                        New Bouquet
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
                        <div className={classes.Mobile_Bouquet_Modal_container}>
                            <div className={classes.Bouquet_Modal_Container}>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseMobileAdd} />
                                </div>
                                <h2>
                                    Add flowers to bouquet
                                </h2>
                                <div className={classes.Bouquet_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
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
                                        updateBouquetFlowers();
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
                                <div className={classes.Bouquet_Container}
                                    onClick={e => {
                                        updateBouquetList();
                                        handleOpenAdd();
                                    }}>
                                    <p>
                                        <b>Current Bouquet (<span className={classes.Bouquet_Amount}> {bouquetItemsAmount()} </span>)</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openBouquet}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBouquet}>
                        <div className={classes.Main_Bouquet_Modal_container}>
                            <div className={classes.Bouquet_Modal_Container}>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseBouquet} />
                                </div>
                                <h2>
                                    {singleBouquet?.name}
                                </h2>
                                <div className={classes.Bouquet_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                    {
                                        singleBouquet?.flowers?.map((flower, index) => {
                                            return (
                                                <div className={classes.Bouquet_Item_Container} key={flower.id}>
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
                        <div className={classes.Main_Bouquet_Modal_container}>
                            {loader
                                ?
                                <Loader />
                                :

                                <div className={classes.Bouquet_Modal_Container}>
                                    <div className={classes.Close_Icon_container} style={openMobileAdd ? { justifyContent: 'flex-start' } : undefined}>
                                        {openMobileAdd
                                            ?
                                            <KeyboardBackspaceIcon className={classes.Back_Icon} onClick={handleCloseAdd} />
                                            :
                                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
                                        }

                                    </div>
                                    <h2>
                                        Add new bouquet
                                    </h2>
                                    {bouquetItemsAmount() > 0
                                        &&
                                        <div className={classes.Delete_Icon_container}>
                                            <div className={classes.Delete_Icon_Inner_container}
                                                onClick={e => {
                                                    setBouquetList([]);
                                                    setZerosInBouquetArray();
                                                }}
                                            >
                                                Delete all <DeleteOutlineIcon />
                                            </div>
                                        </div>
                                    }
                                    <div className={classes.Bouquet_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                        {
                                            bouquetItemsAmount() === 0
                                                ?
                                                <h4>No flowers added to bouquet</h4>
                                                :
                                                BouquetList?.map((flower, index) => {
                                                    return (
                                                        <div className={classes.Bouquet_Item_Container} key={flower.id}>
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
                                                                        deleteBouquetFlower(flower.id);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                    {bouquetItemsAmount() > 0
                                        &&
                                        <>
                                            <form className={classes.Add_Bouquet_Form} onSubmit={handleSubmit}>
                                                <div className={classes.Bouquet_Name_Input}>
                                                    <TextField
                                                        id="Name"
                                                        label="Bouquet Name"
                                                        variant="outlined"
                                                        size="small"
                                                        value={values.Name}
                                                        error={errors.Name !== undefined || err}
                                                        helperText={errors.Name !== undefined ? errors.Name : (err ? "Bouquet with that name already exists" : " ")}
                                                        onChange={handleChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                                <button className={classes.Modal_button} type="submit">Save</button>
                                            </form>
                                        </>
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
                                        Are you sure to delete this bouquet?
                                    </h2>
                                    <button className={classes.Modal_button} onClick={e => { deleteSingleBouquet(singleBouquet!.id) }}>Delete</button>
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
                            <FormatColorTextIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Bouquet name
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
                    <div className={classes.Show_Container_2}>
                        {
                            bouquetsData?.length! > 0
                                ?
                                <>
                                    {
                                        bouquetsData?.map((bouquet, index) => {
                                            return (
                                                <>
                                                    <div
                                                        className={classes.List_Item_Container}
                                                        key={bouquet.id}
                                                        onClick={e => {
                                                            updateSingleBouquet(bouquet.id);
                                                            handleOpenBouquet();
                                                        }}
                                                    >
                                                        <div className={classes.Show_Number}>
                                                            <p className={classes.List_Container_Text}>
                                                                {index + 1}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Name}>
                                                            <p className={classes.List_Container_Text_First}>
                                                                {bouquet.name}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Date}>
                                                            <p className={classes.List_Container_Text}>
                                                                {bouquet.creation_date.toString().split('T')[0]}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Amount}>
                                                            <DeleteForeverIcon className={classes.More_Options_Icon}
                                                                onClick={e => {
                                                                    e.stopPropagation();
                                                                    updateSingleBouquet(bouquet.id);
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
                                    No bouquets
                                </h3>
                        }
                    </div>
                </div>
                <div className={classes.Add_Flower_Container}>
                    <div className={classes.Add_Container_1}>
                        <AddBoxIcon className={classes.Icon} />
                        <p>
                            New Bouquet
                        </p>
                    </div>
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
                </div>
            </div>
        </div >

    )
}

export default Compositions;
