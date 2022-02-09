import React, { useEffect, useState } from 'react';
import classes from './Resources.module.css';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetFloristQuery } from '../../../services/FloristsApi';
import { AddFlowerBox, AddFlowerModal, DeleteFlowerModal, EditFlowerModal, FlowerAddButton, FlowersListBox, Header } from './Assets';

const initialValues = {
    Name: "",
    Price: "",
    Edit_Name: "edit",
    Edit_Price: "0.05",
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
    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);

    useEffect(() => {
        setFlowersData(Florists_data?.florist[0].flowers)
    }, [Florists_data])

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
                <Header />
                <FlowerAddButton handleOpenAdd={handleOpenAdd} />
                <AddFlowerModal
                    values={values}
                    errors={errors}
                    handleCloseAdd={handleCloseAdd}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    openAdd={openAdd}
                />
                <DeleteFlowerModal
                    openDelete={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    handleDelete={handleDelete}
                />
                <EditFlowerModal
                    values={values}
                    errors={errors}
                    openEdit={openEdit}
                    handleCloseEdit={handleCloseEdit}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleEdit={handleEdit}
                />
            </div>
            <div className={classes.Bottom_Container}>
                <FlowersListBox
                    flowersData={flowersData}
                    indexOfElement={indexOfElement}
                    handleOpenEdit={handleOpenEdit}
                    setEditValues={setEditValues}
                    handleOpenDelete={handleOpenDelete}
                    handleInput={handleInput}
                />
                <AddFlowerBox
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>

    )
}

export default Resources;
