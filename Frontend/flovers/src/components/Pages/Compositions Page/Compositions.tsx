import React, { useEffect, useState } from 'react';
import classes from './Compositions.module.css';
import { Bouquet, Flower, useGetFloristQuery } from '../../../services/FloristsApi';
import * as Yup from "yup";
import { useFormik } from "formik";
import AddBouquetModal from './Assets/AddBouquetModal';
import DeleteBouquetModal from './Assets/DeleteBouquetModal';
import ShowBouquetModal from './Assets/ShowBouquetModal';
import ShowBouquetListModal from './Assets/ShowBouquetListModal';
import Header from './Assets/Header';
import BouquetAddButton from './Assets/BouquetAddButton';
import BouquetsListBox from './Assets/BouquetsListBox';
import AddBouquetBox from './Assets/AddBouquetBox';
import AlertBox from './Assets/AlertBox';

const initialValues = {
    Name: ""
};

const FORM_VALIDATION = Yup.object().shape({
    Name: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(16, 'Max length is 16')
});

const Compositions = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openMobileAdd, setOpenMobileAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openBouquet, setOpenBouquet] = useState(false);
    const [err, setErr] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemSearchTerm, setItemSearchTerm] = useState('');
    const [firstRunTemp, setFirstRunTemp] = useState(true);
    const [firstRun, setFirstRun] = useState(true);
    const [loader, setLoader] = useState(false);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenMobileAdd = () => setOpenMobileAdd(true);
    const handleCloseMobileAdd = () => setOpenMobileAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenBouquet = () => setOpenBouquet(true);
    const handleCloseBouquet = () => setOpenBouquet(false);

    const { data: Florists_data, refetch } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [tmpFlowers, setTmpFlowers] = useState<Flower[] | undefined>();
    const [bouquetsFlowers, setBouquetsFlowers] = useState<Flower[] | undefined>();
    const [BouquetList, setBouquetList] = useState<Flower[] | undefined>();

    const [bouquetsData, setBouquetsData] = useState(Florists_data?.florist[0].bouquets);
    const [singleBouquet, setSingleBouquet] = useState<Bouquet | undefined>();

    useEffect(() => {
        let tempArr: Bouquet[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets.filter((bouquet) => bouquet.name.toLowerCase().includes(itemSearchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setBouquetsData(tempArr);
        }
    }, [Florists_data, itemSearchTerm])

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers.filter((flower) => flower.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);
        }
        if (Florists_data !== undefined && firstRun) {
            setBouquetsFlowers(Florists_data?.florist[0].flowers);
        }
        if (Florists_data !== undefined && firstRunTemp) {
            setTmpFlowers(Florists_data?.florist[0].flowers);
        }
    }, [Florists_data, searchTerm])

    useEffect(() => {
        if (firstRunTemp && tmpFlowers !== undefined) {
            setZerosInTempArray();
            setFirstRunTemp(false);
        }
    }, [tmpFlowers]);

    useEffect(() => {
        if (firstRun && bouquetsFlowers !== undefined) {
            setZerosInBouquetArray();
            setFirstRun(false);
        }
    }, [bouquetsFlowers]);

    const setZerosInTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setTmpFlowers(newArr);
    }

    const setZerosInBouquetArray = () => {
        let newArr = JSON.parse(JSON.stringify(bouquetsFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setBouquetsFlowers(newArr);
    }

    const updateArrayOnInputChange = (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers!));
        newArr.map((flower: Flower) => flower.id === flower_id ? flower.amount = Number(e.target.value) : flower);
        setTmpFlowers(newArr);
    }

    const updateBouquetFlowers = () => {
        let newArr = JSON.parse(JSON.stringify(bouquetsFlowers!));
        tmpFlowers?.map((flower, index) => {
            if (flower.amount > 0) {
                newArr[index].amount += flower.amount;
            }
            return flower;
        })
        setBouquetsFlowers(newArr);
    }

    const deleteBouquetFlower = (flower_id: number) => {
        let newArr = JSON.parse(JSON.stringify(bouquetsFlowers!));
        let index = -1;
        newArr.map((flower: Flower, i: number) => {
            if (flower.id === flower_id) {
                index = i;
            }
            return index;
        })
        newArr.splice(index, 1);
        setBouquetsFlowers(newArr);
    }

    const updateBouquetList = () => {
        let newArr: Flower[] | undefined = [];
        bouquetsFlowers?.map((flower) => {
            if (flower.amount > 0) {
                newArr!.push(flower);
            }
            return flower;
        })
        if (newArr.length > 0) { setBouquetList(newArr) }
    }

    const updateSingleBouquet = (bouquet_id: number) => {
        bouquetsData?.forEach((bouquet: Bouquet) => {
            bouquet.id === bouquet_id && setSingleBouquet(bouquet);
        })
    }

    const deleteSingleBouquet = (bouquet_id: number) => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/bouquet/${bouquet_id}/delete/`, {
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
            }, 500);
            setShowDeleteAlert(true);
            setTimeout(function () {
                setShowDeleteAlert(false);
            }, 2000);
        }, 1100);
    }

    const deleteListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(BouquetList!));
        newArr.splice(index, 1);
        setBouquetList(newArr);
    }

    const bouquetItemsAmount = () => {
        let amount = 0;
        bouquetsFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const tempItemsAmount = () => {
        let amount = 0;
        tmpFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const onSubmit = () => {
        setErr(false);
        if (bouquetsData !== undefined) {
            let isSameName = false;
            bouquetsData?.forEach(bouquet => {
                if (values.Name === bouquet.name) {
                    isSameName = true;
                }
            });
            if (isSameName) {
                setErr(true);
            }
            else {
                handleAdd();
            }
        } else {
            handleAdd();
        }
    }

    const handleAdd = () => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/bouquet/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: values.Name,
                flowers: BouquetList
            })
        })
        setBouquetList([]);
        setZerosInBouquetArray();
        setZerosInTempArray();

        setTimeout(function () {
            refetch();
            handleCloseMobileAdd();
            handleCloseAdd();
            setTimeout(function () {
                setLoader(false);
            }, 500);
            setShowAddAlert(true);
            setTimeout(function () {
                setShowAddAlert(false);
            }, 2000);
        }, 1100);

        values.Name = "";
    }

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues,
        validationSchema: FORM_VALIDATION,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit,
    });

    return (
        <div className={classes.Main_Container}>

            <AddBouquetModal
                openMobileAdd={openMobileAdd}
                handleCloseMobileAdd={handleCloseMobileAdd}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                flowersData={flowersData}
                updateArrayOnInputChange={updateArrayOnInputChange}
                updateBouquetFlowers={updateBouquetFlowers}
                setZerosInTempArray={setZerosInTempArray}
                tempItemsAmount={tempItemsAmount}
                setFlowersData={setFlowersData}
                Florists_data={Florists_data}
                updateBouquetList={updateBouquetList}
                handleOpenAdd={handleOpenAdd}
                bouquetItemsAmount={bouquetItemsAmount}
            />
            <DeleteBouquetModal
                openDelete={openDelete}
                loader={loader}
                handleCloseDelete={handleCloseDelete}
                deleteSingleBouquet={deleteSingleBouquet}
                singleBouquet={singleBouquet}
            />
            <ShowBouquetModal
                openBouquet={openBouquet}
                singleBouquet={singleBouquet}
                handleCloseBouquet={handleCloseBouquet}
            />
            <ShowBouquetListModal
                openAdd={openAdd}
                loader={loader}
                openMobileAdd={openMobileAdd}
                handleCloseAdd={handleCloseAdd}
                setBouquetList={setBouquetList}
                setZerosInBouquetArray={setZerosInBouquetArray}
                bouquetItemsAmount={bouquetItemsAmount}
                BouquetList={BouquetList}
                deleteListElement={deleteListElement}
                deleteBouquetFlower={deleteBouquetFlower}
                handleSubmit={handleSubmit}
                values={values}
                errors={errors}
                err={err}
                handleChange={handleChange}
            />

            <div className={classes.Top_Container}>
                <AlertBox
                    showAddAlert={showAddAlert}
                    showDeleteAlert={showDeleteAlert}
                />
                <Header />
                <BouquetAddButton
                    handleOpenMobileAdd={handleOpenMobileAdd}
                />
            </div>
            <div className={classes.Bottom_Container}>
                <BouquetsListBox
                    itemSearchTerm={itemSearchTerm}
                    setItemSearchTerm={setItemSearchTerm}
                    bouquetsData={bouquetsData}
                    updateSingleBouquet={updateSingleBouquet}
                    handleOpenBouquet={handleOpenBouquet}
                    handleOpenDelete={handleOpenDelete}
                />
                <AddBouquetBox
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    flowersData={flowersData}
                    updateArrayOnInputChange={updateArrayOnInputChange}
                    updateBouquetFlowers={updateBouquetFlowers}
                    setZerosInTempArray={setZerosInTempArray}
                    tempItemsAmount={tempItemsAmount}
                    setFlowersData={setFlowersData}
                    updateBouquetList={updateBouquetList}
                    handleOpenAdd={handleOpenAdd}
                    bouquetItemsAmount={bouquetItemsAmount}
                    Florists_data={Florists_data}
                />
            </div>
        </div >

    )
}

export default Compositions;
