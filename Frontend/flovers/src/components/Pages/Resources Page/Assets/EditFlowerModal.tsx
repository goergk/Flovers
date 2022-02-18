import React from 'react';
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
    openEdit: boolean,
    handleCloseEdit: () => void,
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    onEdit: () => void,
    loader: boolean,
    errEdit: boolean,
    setErrEdit: React.Dispatch<React.SetStateAction<boolean>>,
    editNameErr: String | undefined,
    editPriceErr: String | undefined,
    resetEditErrors: () => void,
    setEditTempName: React.Dispatch<React.SetStateAction<string>>
}

const EditFlowerModal: React.FC<Props> = ({
    values,
    errors,
    openEdit,
    handleCloseEdit,
    handleChange,
    onEdit,
    loader,
    errEdit,
    setErrEdit,
    editNameErr,
    editPriceErr,
    resetEditErrors,
    setEditTempName
}) => {
    return (
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
                    {
                        loader
                            ?
                            <Loader />
                            :
                            <>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={e => { handleCloseEdit(); resetEditErrors(); setEditTempName(''); }} />
                                </div>
                                <h2>
                                    Edit Flower
                                </h2>
                                <form className={classes.Modal_Form} onSubmit={e => { e.preventDefault(); onEdit(); }}>
                                    <TextField
                                        id="Edit_Name"
                                        label="Flower Name"
                                        variant="outlined"
                                        size="small"
                                        value={values.Edit_Name}
                                        error={editNameErr !== undefined || errEdit}
                                        helperText={editNameErr !== undefined ? editNameErr : (errEdit ? "Flower with that name already exists" : " ")}
                                        onChange={e => { handleChange(e); setErrEdit(false); }}
                                        style={{ marginBottom: ".2em" }}
                                    />
                                    <TextField
                                        id="Edit_Price"
                                        label="Price"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        value={values.Edit_Price}
                                        error={editPriceErr !== undefined}
                                        helperText={editPriceErr !== undefined ? editPriceErr : " "}
                                        onChange={handleChange}
                                        style={{ marginBottom: ".2em" }}
                                    />
                                    <button className={classes.Modal_button} type="submit">Save</button>
                                </form>
                            </>
                    }
                </div>
            </Fade>
        </Modal>
    );
};

export default EditFlowerModal;
