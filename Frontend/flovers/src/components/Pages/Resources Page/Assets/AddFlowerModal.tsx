import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Resources.module.css';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik';
import Loader from '../../../Assets/Loader/Loader';

interface Props {
    values:
    {
        Name: string;
        Price: string;
        Edit_Name: string;
        Edit_Price: string;
    },
    errors: FormikErrors<{
        Name: string;
        Price: string;
        Edit_Name: string;
        Edit_Price: string;
    }>,
    handleCloseAdd: () => void,
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    openAdd: boolean,
    loader: boolean,
    err: boolean,
    setErr: React.Dispatch<React.SetStateAction<boolean>>
}

const AddFlowerModal: React.FC<Props> = ({
    values,
    errors,
    handleCloseAdd,
    handleSubmit,
    handleChange,
    openAdd,
    loader,
    err,
    setErr
}) => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        if (width > 999) { handleCloseAdd() }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
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
                    {
                        loader
                            ?
                            <Loader />
                            :
                            <>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
                                </div>
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
                                        error={errors.Name !== undefined || err}
                                        helperText={errors.Name !== undefined ? errors.Name : (err ? "Flower with that name already exists" : " ")}
                                        onChange={e => { handleChange(e); setErr(false); }}
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
                            </>
                    }
                </div>
            </Fade>
        </Modal>
    );
};

export default AddFlowerModal;
