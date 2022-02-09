import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Resources.module.css';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik';

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
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    handleEdit: () => void
}

const EditFlowerModal: React.FC<Props> = ({
    values,
    errors,
    openEdit,
    handleCloseEdit,
    handleSubmit,
    handleChange,
    handleEdit
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
                    <div className={classes.Close_Icon_container}>
                        <CancelIcon className={classes.Close_Icon} onClick={handleCloseEdit} />
                    </div>
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
    );
};

export default EditFlowerModal;
