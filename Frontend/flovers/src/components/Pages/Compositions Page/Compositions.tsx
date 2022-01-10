import React, { useState } from 'react';
import classes from './Compositions.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import NumbersIcon from '@mui/icons-material/Numbers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import GrassIcon from '@mui/icons-material/Grass';

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
    Amount: "",
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

const Compositions = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [indexOfElement, setIndex] = useState(-1);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchAmount, setAmountTerm] = useState('');

    const classes_2 = useStyles();

    const onSubmit = () => {
        console.log("Submit");
        resetValues();
        handleCloseAdd();
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
        values.Amount = "";

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
                    <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenAdd()}>
                        New Bouquet
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
                                Create new bouquet
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
                                Are you sure to delete this bouquet?
                            </h2>
                            <form className={classes.Modal_Form}>
                                <button className={classes.Modal_button} onClick={e => { console.log('Deleted :)') }}>Delete</button>
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
                                Edit Bouquet
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
                                <button className={classes.Modal_button} type="submit" onClick={e => { console.log('Saved :)') }}>Save</button>
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
                                Bouquet ID
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
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={classes_2.root}
                                    />
                                </div>
                            </div>
                            {values_1.map((value, index) => {
                                return (
                                    <>
                                        <div className={classes.Nested_Flower_Container}>
                                            <div className={classes.Nested_Flower_Name}>
                                                Flower_Name
                                            </div>
                                            <div className={classes.Nested_Flower_Input} style={{ marginRight: '0.2em' }}>
                                                <TextField
                                                    id="Amount"
                                                    label="Amount"
                                                    variant="outlined"
                                                    size="small"
                                                    type="number"
                                                    onChange={(e) => setAmountTerm(e.target.value)}
                                                    className={classes_2.root}
                                                />
                                            </div>
                                        </div>
                                    </>)
                            })}
                        </div>
                        <button className={classes.Add_Button} type="submit">Add</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Compositions;
