import React, { useEffect, useState } from 'react';
import classes from './Resources.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import EventIcon from '@mui/icons-material/Event';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BarChartIcon from '@mui/icons-material/BarChart';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from "formik";
import AddIllustration from '../../Images/flower_add.svg';
import { makeStyles } from "@material-ui/core/styles";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGetFloristQuery } from '../../../services/FloristsApi';

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
    Name: "",
    Price: "",
    Edit_Name: "",
    Edit_Price: "",
};

const FORM_VALIDATION = Yup.object().shape({
    Name: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(20, 'Max length is 20'),
    Price: Yup.number()
        .required("Required")
        .max(999.99, 'Max value is 999,99')
        .min(0.01, 'Min value is 0.01'),
    Edit_Name: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(20, 'Max length is 20'),
    Edit_Price: Yup.number()
        .required("Required")
        .max(999.99, 'Max value is 999,99')
        .min(0.01, 'Min value is 0.01'),
});

const Resources = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [indexOfElement, setIndex] = useState(-1);
    const [deleteId, setDeleteId] = useState(-1);
    const [editId, setEditId] = useState(-1);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = (flower_id: number) => { setOpenDelete(true); setDeleteId(flower_id); };
    const handleCloseDelete = () => { setOpenDelete(false); setDeleteId(-1); };
    const handleOpenEdit = (flower_id: number) => { setOpenEdit(true); setEditId(flower_id); };
    const handleCloseEdit = () => { setOpenEdit(false); setEditId(-1) };

    const { data: Florists_data, refetch } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    let flowers_data = Florists_data?.florist[0].flowers

    useEffect(() => {
        flowers_data = Florists_data?.florist[0].flowers
    }, [Florists_data])

    const classes_2 = useStyles();

    const onSubmit = () => {
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/flower/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: values.Name,
                price: values.Price
            })
        })
        resetValues();
        refetch();
        handleCloseAdd();
    }

    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/api/flower/${deleteId}/delete/`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        resetValues();
        refetch();
        handleCloseDelete();
    }

    const handleEdit = () => {
        fetch(`http://127.0.0.1:8000/api/flower/${editId}/update/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: values.Edit_Name,
                price: values.Edit_Price
            })
        })
        refetch();
        handleCloseEdit();
    }

    const handleInput = (index: number) => {
        if (indexOfElement === -1) { setIndex(index) }
        else if (indexOfElement !== -1 && indexOfElement !== index) { setIndex(index) }
        else { setIndex(-1) }
    }

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues,
        validationSchema: FORM_VALIDATION,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit,
    });

    const resetValues = () => {
        values.Name = "";
        values.Price = "";
    };

    const setEditValues = (florist_name: string, florist_price: string) => {
        values.Edit_Name = florist_name;
        values.Edit_Price = florist_price;
    }

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Top_Container}>
                <div className={classes.Header_Container}>
                    <div className={classes.Header_Container_1}>
                        <div className={classes.Icon_Container}>
                            <WarehouseIcon className={classes.Header_Icon} />
                        </div>
                        <div>
                            <h1>
                                Resources
                            </h1>
                            <p>
                                Manage available flowers or add new ones.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={classes.Button_Container_Mobile}>
                    <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenAdd()}>
                        Add Flower
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
                        <div className={classes.Modal_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
                            <h2>
                                Add new Flower
                            </h2>
                            <form className={classes.Modal_Form} onSubmit={handleSubmit}>
                                <TextField
                                    id="Name"
                                    label="Flower Name"
                                    variant="outlined"
                                    size="small"
                                    value={values.Name}
                                    error={errors.Name !== undefined}
                                    helperText={errors.Name !== undefined ? errors.Name : " "}
                                    onChange={handleChange}
                                    style={{ marginBottom: ".2em" }}
                                />
                                <TextField
                                    id="Price"
                                    label="Price"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={values.Price}
                                    error={errors.Price !== undefined}
                                    helperText={errors.Price !== undefined ? errors.Price : " "}
                                    onChange={handleChange}
                                    style={{ marginBottom: ".2em" }}
                                />
                                <button className={classes.Modal_button} type="submit">Add</button>
                            </form>
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
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelete} />
                            <h2>
                                Are you sure to delete this flower?
                            </h2>
                            <form className={classes.Modal_Form}>
                                <button className={classes.Modal_button} onClick={e => handleDelete()} type="button">Delete</button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openEdit}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openEdit}>
                        <div className={classes.Modal_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseEdit} />
                            <h2>
                                Edit Flower
                            </h2>
                            <form className={classes.Modal_Form} onSubmit={handleSubmit}>
                                <TextField
                                    id="Edit_Name"
                                    label="Flower Name"
                                    variant="outlined"
                                    size="small"
                                    value={values.Edit_Name}
                                    error={errors.Edit_Name !== undefined}
                                    helperText={errors.Edit_Name !== undefined ? errors.Edit_Name : " "}
                                    onChange={handleChange}
                                    style={{ marginBottom: ".2em" }}
                                />
                                <TextField
                                    id="Edit_Price"
                                    label="Price"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={values.Edit_Price}
                                    error={errors.Edit_Price !== undefined}
                                    helperText={errors.Edit_Price !== undefined ? errors.Edit_Price : " "}
                                    onChange={handleChange}
                                    style={{ marginBottom: ".2em" }}
                                />
                                <button className={classes.Modal_button} type="button" onClick={e => handleEdit()}>Save</button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
            <div className={classes.Bottom_Container}>
                <div className={classes.Show_Flowers_Container}>
                    <div className={classes.Show_Container_1}>
                        <div className={classes.Show_Name}>
                            <FormatColorTextIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Name
                            </p>
                        </div>
                        <div className={classes.Show_Date}>
                            <EventIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Added
                            </p>
                        </div>
                        <div className={classes.Show_Price}>
                            <RequestQuoteIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Price
                            </p>
                        </div>
                        <div className={classes.Show_Amount}>
                            <BarChartIcon className={classes.Icon} />
                            <p className={classes.Show_Container_Text}>
                                Amount
                            </p>
                        </div>
                    </div>
                    <div className={classes.Show_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                        {
                            flowers_data?.length! > 0
                                ?
                                <>
                                    {
                                        flowers_data?.map((flower, index) => {
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
                                                                {flower.name}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Date}>
                                                            <p className={classes.List_Container_Text}
                                                                style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}
                                                            >
                                                                {flower.creation_date.toString().split('T')[0]}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Price}>
                                                            <p className={classes.List_Container_Text}
                                                                style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                                                                {flower.price}
                                                            </p>
                                                        </div>
                                                        <div className={classes.Show_Amount}>
                                                            <p className={classes.List_Container_Text}
                                                                style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                                                                {flower.amount}
                                                            </p>
                                                            <ExpandCircleDownIcon
                                                                onClick={e => handleInput(index)}
                                                                className={indexOfElement !== index ? classes.Show_More_Icon : classes.Show_More_Icon_True} />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={indexOfElement !== index ? classes.More_Options_Container : classes.More_Options_Container_Show}
                                                        key={flower.id}
                                                    >
                                                        <div className={classes.More_Options_Container_1}>
                                                            <div className={classes.C1}>
                                                                <p className={classes.List_Container_Text}>
                                                                    Last 3 Deliveries:
                                                                </p>
                                                            </div>
                                                            <div className={classes.C2}>
                                                            </div>
                                                            <div className={classes.C3}>
                                                                <ModeEditIcon
                                                                    className={classes.More_Options_Icon}
                                                                    onClick={e => {
                                                                        handleOpenEdit(flower.id);
                                                                        setEditValues(flower.name, flower.price);
                                                                    }}
                                                                />
                                                                <DeleteForeverIcon
                                                                    className={classes.More_Options_Icon}
                                                                    onClick={e => handleOpenDelete(flower.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={classes.More_Options_Container_1}>
                                                            <div className={classes.C1}>
                                                                <p className={classes.List_Container_Text}>
                                                                    Delivery:
                                                                </p>
                                                            </div>
                                                            <div className={classes.C2}>
                                                                <p className={classes.List_Container_Text}>
                                                                    Amount:
                                                                </p>
                                                            </div>
                                                            <div className={classes.C3}>
                                                            </div>
                                                        </div>
                                                        {[1, 2, 3].map(item => {
                                                            return (
                                                                <div className={classes.More_Options_List_Container_1}>
                                                                    <div className={classes.C1}>
                                                                        <p className={classes.List_Container_Text_White}>
                                                                            990321
                                                                        </p>
                                                                    </div>
                                                                    <div className={classes.C2}>
                                                                        <p className={classes.List_Container_Text_White}>
                                                                            7
                                                                        </p>
                                                                    </div>
                                                                    <div className={classes.C3}>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                                :
                                <h3 style={{ fontSize: 'calc(6px + 1.2vh)' }}>
                                    No flowers
                                </h3>
                        }
                    </div>
                </div>
                <div className={classes.Add_Flower_Container}>
                    <div className={classes.Add_Container_1}>
                        <AddBoxIcon className={classes.Icon} />
                        <p>
                            Add flower
                        </p>
                    </div>
                    <div className={classes.Add_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                        <div>
                            <h3>
                                Add new flower to your database:
                            </h3>
                            <form className={classes.Resources_Form} onSubmit={handleSubmit}>
                                <TextField
                                    id="Name"
                                    label="Flower Name"
                                    variant="outlined"
                                    size="small"
                                    value={values.Name}
                                    error={errors.Name !== undefined}
                                    helperText={errors.Name !== undefined ? errors.Name : " "}
                                    onChange={handleChange}
                                    className={classes_2.root}
                                />
                                <TextField
                                    id="Price"
                                    label="Price"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={values.Price}
                                    error={errors.Price !== undefined}
                                    helperText={errors.Price !== undefined ? errors.Price : " "}
                                    onChange={handleChange}
                                    className={classes_2.root}
                                />
                                <button className={classes.Add_Flower_Button} type="submit">Add</button>
                            </form>
                        </div>
                        <div>
                            <img src={AddIllustration} alt="Add_Image" className={classes.Add_Illustrator} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Resources;
