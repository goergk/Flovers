import classes from './FloristSelect.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import YardIcon from '@mui/icons-material/Yard';
import { useGetFloristsQuery } from "../../../services/FloristsApi";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useHistory } from 'react-router-dom';
import { PageType } from '../Current Page/PageType';
import * as Yup from "yup";
import { useFormik } from "formik";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteModal from './Assets/DeleteModal';
import AddModal from './Assets/AddModal';
import Loader from '../../Assets/Loader/Loader';

const initialValues = {
    Name: "",
};

const FORM_VALIDATION = Yup.object().shape({
    Name: Yup.string()
        .required("Required")
        .max(10, 'Max length is 10'),
});

const FloristSelect = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { resetValues(); setOpen(false); };
    const { data: Florists_data, refetch, isFetching } = useGetFloristsQuery(Number(sessionStorage.getItem('user_id')));
    const [amount, setAmount] = useState(0);
    const [fade, setFade] = useState(false);
    const [loader, setLoader] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(-1);
    const [err, setErr] = useState(false);

    const handleOpenDelete = (florist_id: number) => { setOpenDelete(true); setDeleteId(florist_id); };
    const handleCloseDelete = () => { setOpenDelete(false); setDeleteId(-1); };

    useEffect(() => {
        setAmount(Number(Florists_data?.length));
    }, [Florists_data])

    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.SIGNIN}`);
    const { login } = useSelector((state: RootState) => state.Login);
    if (!login) { changeRoute() }

    const onSubmit = () => {
        if (amount > 0) {
            let isSameName = false;
            setErr(false);
            Florists_data?.florists?.forEach(florist => {
                if (florist.name === values.Name) {
                    isSameName = true;
                }
            })
            if (isSameName) {
                setErr(true);
            }
            else if (!isSameName) {
                handleAdd();
            }
        } else {
            handleAdd();
        }
    }

    const handleAdd = () => {
        setLoader(true);
        fetch('http://127.0.0.1:8000/api/florists/add/', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: values.Name,
                owner: sessionStorage.getItem('user_id')
            })
        })
        setAmount(prevAmount => prevAmount += 1);
        setTimeout(function () {
            refetch();
            handleClose();
            setTimeout(function () {
                setLoader(false);
            }, 200);
        }, 700);
    }

    const handleDelete = () => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/florist/${deleteId}/delete/`, {
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
        }, 700);
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
    }

    const handleClick = (id: number) => {
        sessionStorage.setItem('florist_id', id.toString());
        const changeRoute = () => history.push(`${PageType.RESOURCES}`);
        setFade(true);
        setTimeout(function () {
            changeRoute();
        }, 400);
    }

    return (
        <div className={fade ? classes.fadeOut : classes.Main_Container}>
            <div className={classes.Header_Container}>
                <h1>Select florist:</h1>
            </div>
            <DeleteModal
                openDelete={openDelete}
                loader={loader}
                handleCloseDelete={handleCloseDelete}
                handleDelete={handleDelete}
            />
            <AddModal
                open={open}
                loader={loader}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                values={values}
                errors={errors}
                handleChange={handleChange}
                err={err}
                setErr={setErr}
            />
            <div className={classes.Tabs_Container}>
                {
                    isFetching
                        ?
                        <Loader />
                        :
                        <>
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
                                        <div
                                            className={classes.Florist_Container}
                                            key={florist.id}
                                            onClick={() => handleClick(florist.id)}
                                        >
                                            <DeleteForeverIcon
                                                className={classes.Delete_Icon}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleOpenDelete(florist.id);
                                                }}
                                            />
                                            <h1>
                                                {florist.name}
                                            </h1>
                                            <YardIcon className={classes.Florist_Icon} />
                                        </div>
                                    )
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default FloristSelect;
