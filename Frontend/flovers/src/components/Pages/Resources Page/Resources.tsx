import React, { useState } from 'react';
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
});

const Resources = () => {
    const [open, setOpen] = useState(false);
    const [indexOfElement, setIndex] = useState(-1);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes_2 = useStyles();

    const onSubmit = () => {
        console.log("Submit");
        resetValues();
        handleClose();
        resetValues();
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

    const values_1 = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

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
                    <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpen()}>
                        Add Flower
                    </button>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.Modal_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleClose} />
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
                            values_1.map((value, index) => {
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
                                                    Rose White
                                                </p>
                                            </div>
                                            <div className={classes.Show_Date}>
                                                <p className={classes.List_Container_Text}
                                                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}
                                                >
                                                    06-01-2021
                                                </p>
                                            </div>
                                            <div className={classes.Show_Price}>
                                                <p className={classes.List_Container_Text}
                                                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                                                    0.99
                                                </p>
                                            </div>
                                            <div className={classes.Show_Amount}>
                                                <p className={classes.List_Container_Text}
                                                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                                                    12
                                                </p>
                                                <ExpandCircleDownIcon
                                                    onClick={e => handleInput(index)}
                                                    className={indexOfElement !== index ? classes.Show_More_Icon : classes.Show_More_Icon_True} />
                                            </div>
                                        </div>
                                        <div
                                            className={indexOfElement !== index ? classes.More_Options_Container : classes.More_Options_Container_Show}
                                        >
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
                                                    <ModeEditIcon className={classes.More_Options_Icon} />
                                                    <DeleteForeverIcon className={classes.More_Options_Icon} />
                                                </div>
                                            </div>
                                            {[1, 2, 3].map(item => {
                                                return (
                                                    <div className={classes.More_Options_Container_1}>
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
