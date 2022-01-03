import classes from './FloristSelect.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import YardIcon from '@mui/icons-material/Yard';
import { useGetFloristsQuery } from "../../../services/FloristsApi";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useHistory } from 'react-router-dom';
import { PageType } from '../Current Page/PageType';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
    Name: "",
};

const FORM_VALIDATION = Yup.object().shape({
    Name: Yup.string()
        .required("Required")
        .max(10, 'Max length is 10'),
});

const FloristSelect = () => {
    const [amount, setAmount] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); resetValues(); };

    const { data: Florists_data } = useGetFloristsQuery(Number(sessionStorage.getItem('user_id')));

    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.SIGNIN}`);

    const { login } = useSelector((state: RootState) => state.Login);

    if (!login) { changeRoute() }

    useEffect(() => {
        setAmount(Number(Florists_data?.length));
    }, [Florists_data])

    const onSubmit = () => {
        console.log('No działa');
        handleClose();
    }

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues,
        validationSchema: FORM_VALIDATION,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit,
    });

    const resetValues = () => {
        values.Name = ""
        errors.Name = undefined
    }

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Header_Container}>
                <h1>Select florist:</h1>
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
                            Add new Florist
                        </h2>
                        <p>
                            <b>Select name for your florist:</b>
                        </p>
                        <form className={classes.Modal_Form} onSubmit={handleSubmit}>
                            <TextField
                                id="Name"
                                label="Florist Name"
                                variant="outlined"
                                size="small"
                                value={values.Name}
                                error={errors.Name !== undefined}
                                helperText={errors.Name}
                                onChange={handleChange}
                            />
                            <button className={classes.Modal_button} type="submit">Add</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <div className={classes.Tabs_Container}>
                {
                    amount < 4
                    &&
                    <div className={classes.Add_Florist_Container}
                        onClick={handleOpen}>
                        <h1>
                            Add New
                        </h1>
                        <AddCircleOutlineIcon className={classes.Add_Icon} />
                    </div>
                }
                {
                    Florists_data?.florists?.map(florist => {
                        return (
                            <div className={classes.Florist_Container} key={florist.id}>
                                <h1>
                                    {florist.name}
                                </h1>
                                <YardIcon className={classes.Florist_Icon} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default FloristSelect;
