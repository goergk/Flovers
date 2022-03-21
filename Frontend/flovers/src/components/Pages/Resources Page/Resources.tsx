import React, { useEffect, useState } from 'react';
import classes from './Resources.module.css';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Bouquet, Delivery, Flower, Sale, useGetFloristQuery } from '../../../services/FloristsApi';
import ShowDeliveryModal from './Assets/ShowDeliveryModal';
import {
    AddFlowerBox,
    AddFlowerModal,
    DeleteFlowerModal,
    EditFlowerModal,
    FlowerAddButton,
    FlowersListBox,
    Header,
    AlertBox
} from './Assets';


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
        .max(16, 'Max length is 16'),
    Price: Yup.number()
        .required("Required")
        .max(999.99, 'Max value is 999,99')
        .min(0.01, 'Min value is 0.01'),
    Edit_Name: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(16, 'Max length is 16'),
    Edit_Price: Yup.number()
        .required("Required")
        .max(999.99, 'Max value is 999,99')
        .min(0.01, 'Min value is 0.01'),
});

const Resources = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);
    const [indexOfElement, setIndex] = useState(-1);
    const [deleteId, setDeleteId] = useState(-1);
    const [editId, setEditId] = useState(-1);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [showEditAlert, setShowEditAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [addLoader, setAddLoader] = useState(false);
    const [err, setErr] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const [firstFlowersRun, setFirstFlowersRun] = useState(true);
    const [errEdit, setErrEdit] = useState(false);
    const [editTempName, setEditTempName] = useState('');
    const [editNameErr, setEditNameErr] = useState<String | undefined>();
    const [editPriceErr, setEditPriceErr] = useState<String | undefined>();
    const [TempDelivery, setTempDelivery] = useState<Delivery | undefined>();
    const [TempName, setTempName] = useState('');
    const [itemSearchTerm, setItemSearchTerm] = useState('');

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = (flower_id: number) => { setOpenDelete(true); setDeleteId(flower_id); };
    const handleCloseDelete = () => { setOpenDelete(false); setDeleteId(-1); };
    const handleOpenEdit = (flower_id: number) => { setOpenEdit(true); setEditId(flower_id); };
    const handleCloseEdit = () => { setOpenEdit(false); setEditId(-1) };
    const handleOpenDelivery = () => setOpenDelivery(true);
    const handleCloseDelivery = () => setOpenDelivery(false);

    const { data: Florists_data, refetch, isFetching } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));
    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [deliveriesData, setDeliveriesData] = useState(Florists_data?.florist[0].deliveries);
    const [bouquetsData, setBouquetsData] = useState(Florists_data?.florist[0].bouquets);
    const [salesData, setSalesData] = useState(Florists_data?.florist[0].sales);

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        let tempArr_1: Delivery[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers.filter((flower) => flower.name.toLowerCase().includes(itemSearchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);

            tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].deliveries));
            tempArr_1 = tempArr_1!.reverse();
            setDeliveriesData(tempArr_1);
        }
    }, [Florists_data, itemSearchTerm])

    useEffect(() => {
        if (Florists_data !== undefined) {
            if (firstFlowersRun) {
                if (Florists_data?.florist[0].flowers.length! > 0) {
                    let temp_name = Florists_data?.florist[0].flowers[(Florists_data?.florist[0].flowers.length) - 1].name;
                    if (flowersData?.[0].name === temp_name) {
                        setIsReversed(true);
                        setFirstFlowersRun(false);
                    }
                }
            }
        }
    }, [flowersData])

    useEffect(() => {
        let tempArr: Bouquet[] | undefined = [];
        let tempArr_1: Sale[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets));
            tempArr = tempArr!.reverse();
            setBouquetsData(tempArr);

            tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].sales));
            tempArr_1 = tempArr_1!.reverse();
            setSalesData(tempArr_1);
        }
    }, [Florists_data])

    const onSubmit = () => {
        if (Florists_data !== undefined) {
            let isSameName = false;
            setErr(false);
            flowersData?.forEach(flower => {
                if (flower.name === values.Name) {
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

    const onEdit = () => {
        resetEditErrors();
        if (values.Edit_Name === '' && values.Edit_Price === '') {
            setEditNameErr("Required");
            setEditPriceErr("Required");
        }
        else if (values.Edit_Name === '') {
            setEditNameErr("Required");
        }
        else if (values.Edit_Price === '') {
            setEditPriceErr("Required");
        }
        else {
            let isSameName = false;
            setErrEdit(false);
            flowersData?.forEach(flower => {
                if (flower.name === values.Edit_Name && flower.name !== editTempName) {
                    isSameName = true;
                }
            })
            if (isSameName) {
                setErrEdit(true);
            }
            else if (!isSameName) {
                handleEdit();
            }
        }
    }

    const handleAdd = () => {
        setLoader(true);
        setAddLoader(true);
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
        setTimeout(function () {
            refetch();
            handleCloseAdd();
            setTimeout(function () {
                setLoader(false);
                setAddLoader(false);
            }, 500);
            setShowAddAlert(true);
            setTimeout(function () {
                setShowAddAlert(false);
            }, 2000);
        }, 1100);
    }

    const handleDelete = () => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/flower/${deleteId}/delete/`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })

        resetValues();
        setTimeout(function () {
            refetch();
            handleCloseDelete();
            setTimeout(function () {
                setLoader(false);
            }, 500);
            setShowDeleteAlert(true);
            setTimeout(function () {
                setShowDeleteAlert(false);
            }, 2000);
        }, 1100);
    }

    const handleEdit = () => {
        setLoader(true);
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

        deliveriesData?.forEach(delivery => {
            delivery.flowers.forEach(flower => {
                if (flower.name === editTempName) {
                    fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
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
                }
            })
        })

        bouquetsData?.forEach(bouquet => {
            bouquet.flowers.forEach(flower => {
                if (flower.name === editTempName) {
                    fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
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
                }
            })
        })

        salesData?.forEach(sale => {
            sale.flowers.forEach(flower => {
                if (flower.name === editTempName) {
                    fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
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
                }
            })
        })

        setTimeout(function () {
            refetch();
            handleCloseEdit();
            setTimeout(function () {
                setLoader(false);
            }, 500);
            setShowEditAlert(true);
            setTimeout(function () {
                setShowEditAlert(false);
            }, 2000);
        }, 1100);
    }

    const handleInput = (index: number) => {
        if (indexOfElement === -1) { setIndex(index) }
        else if (indexOfElement !== -1 && indexOfElement !== index) { setIndex(index) }
        else { setIndex(-1) }
    }

    const updateSingleDelivery = (delivery_id: number, flower_name: string) => {
        setTempName(flower_name);
        deliveriesData?.forEach((delivery: Delivery) => {
            delivery.id === delivery_id && setTempDelivery(delivery);
        })
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
        setEditTempName(florist_name);
    }

    const resetEditErrors = () => {
        setEditNameErr(undefined);
        setEditPriceErr(undefined);
        setErrEdit(false);
    }

    return (
        <div className={classes.Main_Container}>

            <AddFlowerModal
                values={values}
                errors={errors}
                handleCloseAdd={handleCloseAdd}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                openAdd={openAdd}
                loader={loader}
                err={err}
                setErr={setErr}
            />
            <DeleteFlowerModal
                openDelete={openDelete}
                handleCloseDelete={handleCloseDelete}
                handleDelete={handleDelete}
                loader={loader}
            />
            <EditFlowerModal
                values={values}
                errors={errors}
                openEdit={openEdit}
                handleCloseEdit={handleCloseEdit}
                handleChange={handleChange}
                onEdit={onEdit}
                loader={loader}
                errEdit={errEdit}
                setErrEdit={setErrEdit}
                editNameErr={editNameErr}
                editPriceErr={editPriceErr}
                resetEditErrors={resetEditErrors}
                setEditTempName={setEditTempName}
            />
            <ShowDeliveryModal
                openDelivery={openDelivery}
                handleCloseDelivery={handleCloseDelivery}
                delivery={TempDelivery}
                TempName={TempName}
            />

            <div className={classes.Top_Container}>
                <AlertBox
                    showAddAlert={showAddAlert}
                    showEditAlert={showEditAlert}
                    showDeleteAlert={showDeleteAlert}
                />
                <Header />
                <FlowerAddButton handleOpenAdd={handleOpenAdd} />
            </div>
            <div className={classes.Bottom_Container}>
                <FlowersListBox
                    flowersData={flowersData}
                    indexOfElement={indexOfElement}
                    handleOpenEdit={handleOpenEdit}
                    setEditValues={setEditValues}
                    handleOpenDelete={handleOpenDelete}
                    handleInput={handleInput}
                    deliveriesData={deliveriesData}
                    handleOpenDelivery={handleOpenDelivery}
                    updateSingleDelivery={updateSingleDelivery}
                    itemSearchTerm={itemSearchTerm}
                    setItemSearchTerm={setItemSearchTerm}
                    isFetching={isFetching}
                    isReversed={isReversed}
                />
                <AddFlowerBox
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    loader={addLoader}
                    err={err}
                    setErr={setErr}
                />
            </div>
        </div>

    )
}

export default Resources;
