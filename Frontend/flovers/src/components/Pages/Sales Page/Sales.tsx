import React, { useEffect, useState } from 'react';
import classes from './Sales.module.css';
import { Bouquet, Flower, Sale, useGetFloristQuery } from '../../../services/FloristsApi';
import Alert from '../../Assets/Alert/Alert';
import {
    AddSaleBox,
    AddSaleModal,
    Header,
    SaleAddButton,
    SalesListBox,
    ShowSaleListModal,
    ShowSaleModal
} from './Assets';


const Sales = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openMobileAdd, setOpenMobileAdd] = useState(false);
    const [openSale, setOpenSale] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemSearchTerm, setItemSearchTerm] = useState('');
    const [firstRunTemp, setFirstRunTemp] = useState(true);
    const [firstRun, setFirstRun] = useState(true);
    const [isSalesTabReversed, setIsSalesTabReversed] = useState(false);
    const [isFlowersTabReversed, setIsFlowersTabReversed] = useState(false);
    const [firstSalesRun, setFirstSalesRun] = useState(true);
    const [firstFlowersRun, setFirstFlowersRun] = useState(true);
    const [loader, setLoader] = useState(false);
    const [switch_, setSwitch] = useState(true);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [showNotEnoughAlert, setShowNotEnoughAlert] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenMobileAdd = () => setOpenMobileAdd(true);
    const handleCloseMobileAdd = () => setOpenMobileAdd(false);
    const handleOpenSale = () => setOpenSale(true);
    const handleCloseSale = () => setOpenSale(false);

    const { data: Florists_data, refetch, isFetching } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [tmpFlowers, setTmpFlowers] = useState<Flower[] | undefined>();
    const [saleFlowers, setSaleFlowers] = useState<Flower[] | undefined>();
    const [saleFlowersList, setSaleFlowersList] = useState<Flower[] | undefined>();

    const [BouquetsData, setBouquetsData] = useState<Bouquet[] | undefined>();
    const [tmpBouquets, setTmpBouquets] = useState<{ bouquet: Bouquet, amount: number }[] | undefined>([]);
    const [saleBouquets, setSaleBouquets] = useState<{ bouquet: Bouquet, amount: number }[] | undefined>([]);
    const [saleBouquetsList, setSaleBouquetsList] = useState<{ bouquet: Bouquet, amount: number }[] | undefined>([]);

    const [tmpFlowersAmount, setTmpFlowersAmount] = useState<{ flower_name: string, amount: number }[] | undefined>([]);

    const [salesData, setSalesData] = useState(Florists_data?.florist[0].sales);
    const [singleSale, setSingleSale] = useState<Sale | undefined>();

    useEffect(() => {
        let tempArr: Sale[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].sales.filter((sale) => sale.id.toString().includes(itemSearchTerm.toString()))));
            tempArr = tempArr!.reverse();
            setSalesData(tempArr);
        }
    }, [Florists_data, itemSearchTerm])

    useEffect(() => {
        let tempArr: Flower[] | undefined = [];
        let tempArr_1: Bouquet[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].flowers.filter((flower) => flower.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))));
            tempArr = tempArr!.reverse();
            setFlowersData(tempArr);

            tempArr_1 = JSON.parse(JSON.stringify(Florists_data?.florist[0].bouquets.filter((bouquet) => bouquet.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))));
            tempArr_1 = tempArr_1!.reverse();
            setBouquetsData(tempArr_1);
        }
        if (Florists_data !== undefined && firstRun) {
            setSaleFlowers(Florists_data?.florist[0].flowers);
            let tempBouquet: { bouquet: Bouquet, amount: number }[] = [];
            Florists_data?.florist[0].bouquets.forEach((bouquet) => tempBouquet.push({ bouquet: bouquet, amount: 0 }));
            setSaleBouquets(tempBouquet);

            let tmp: { flower_name: string, amount: number }[] | undefined = [];
            Florists_data?.florist[0].flowers.forEach((flower) => tmp?.push({ flower_name: flower.name, amount: flower.amount }));
            setTmpFlowersAmount(tmp);
        }
        if (Florists_data !== undefined && firstRunTemp) {
            setTmpFlowers(Florists_data?.florist[0].flowers);
            let tempBouquet: { bouquet: Bouquet, amount: number }[] = [];
            Florists_data?.florist[0].bouquets.forEach((bouquet) => tempBouquet.push({ bouquet: bouquet, amount: 0 }));
            setTmpBouquets(tempBouquet);
        }
    }, [Florists_data, searchTerm])

    useEffect(() => {
        if (Florists_data !== undefined) {
            if (firstSalesRun) {
                if (Florists_data?.florist[0].sales.length! > 0) {
                    let temp_id = Florists_data?.florist[0].sales[(Florists_data?.florist[0].sales.length) - 1].id;
                    if (salesData?.[0].id === temp_id) {
                        setIsSalesTabReversed(true);
                        setFirstSalesRun(false);
                    }
                }
            }
        }
    }, [salesData])

    useEffect(() => {
        if (Florists_data !== undefined) {
            if (firstFlowersRun) {
                if (Florists_data?.florist[0].flowers.length! > 0) {
                    let temp_name = Florists_data?.florist[0].flowers[(Florists_data?.florist[0].flowers.length) - 1].name;
                    if (flowersData?.[0].name === temp_name) {
                        setIsFlowersTabReversed(true);
                        setFirstFlowersRun(false);
                    }
                }
            }
        }
    }, [flowersData])

    useEffect(() => {
        if (firstRunTemp && tmpFlowers !== undefined) {
            setZerosInFlowersTempArray();
            setFirstRunTemp(false);
        }
    }, [tmpFlowers]);

    useEffect(() => {
        if (firstRun && saleFlowers !== undefined) {
            setZerosInDeliveryFlowersArray();
            setFirstRun(false);
        }
    }, [saleFlowers]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const setZerosInFlowersTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setTmpFlowers(newArr);
    }

    const setZerosInBouquetsTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpBouquets));
        newArr.map((item: { bouquet: Bouquet, amount: number }) => item.amount = 0);
        setTmpBouquets(newArr);
    }

    const setZerosInDeliveryFlowersArray = () => {
        let newArr = JSON.parse(JSON.stringify(saleFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setSaleFlowers(newArr);
    }

    const setZerosInDeliveryBouquetsArray = () => {
        let newArr = JSON.parse(JSON.stringify(saleBouquets));
        newArr.map((item: { bouquet: Bouquet, amount: number }) => item.amount = 0);
        setSaleBouquets(newArr);
    }

    const updateFlowersArrayOnInputChange = (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers!));
        newArr.map((flower: Flower) => flower.id === flower_id ? flower.amount = Number(e.target.value) : flower);
        setTmpFlowers(newArr);
    }

    const updateBouquetsArrayOnInputChange = (bouquet_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpBouquets!));
        newArr.map((item: { bouquet: Bouquet, amount: number }) => item.bouquet.id === bouquet_id ? item.amount = Number(e.target.value) : item);
        setTmpBouquets(newArr);
    }

    const updateSaleFlowers = () => {
        let newArr = JSON.parse(JSON.stringify(saleFlowers!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));
        tmpFlowers?.forEach((flower, index) => {
            if (flower.amount > 0) {
                tmpFlowersAmount?.forEach((flwr, indx) => {
                    if (flwr.flower_name === flower.name) {
                        if (flwr.amount - flower.amount >= 0) {
                            newArr[index].amount += flower.amount;
                            newArr_1[indx].amount -= flower.amount;
                        } else {
                            setShowNotEnoughAlert(true);
                            setTimeout(function () {
                                setShowNotEnoughAlert(false);
                            }, 2000);
                        }
                    }
                })
            }
        })
        setTmpFlowersAmount(newArr_1);
        setSaleFlowers(newArr);
    }

    const updateSaleBouquets = () => {
        let newArr = JSON.parse(JSON.stringify(saleBouquets!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));
        tmpBouquets?.forEach((item, index) => {
            if (item.amount > 0) {
                let isAmount = true;
                item.bouquet.flowers.forEach(flower => {
                    if (isAmount) {
                        tmpFlowersAmount?.forEach(flwr => {
                            if (flwr.flower_name === flower.name) {
                                if (flwr.amount - (flower.amount * item.amount) < 0) {
                                    isAmount = false;
                                }
                            }
                        })
                    }
                })
                if (isAmount) {
                    newArr[index].amount += item.amount;
                    item.bouquet.flowers.forEach(flower => {
                        tmpFlowersAmount?.forEach((flwr, indx) => {
                            if (flwr.flower_name === flower.name) {
                                newArr_1[indx].amount -= (flower.amount * item.amount);
                            }
                        })
                    })
                } else {
                    setShowNotEnoughAlert(true);
                    setTimeout(function () {
                        setShowNotEnoughAlert(false);
                    }, 2000);
                }
            }
        })
        setTmpFlowersAmount(newArr_1);
        setSaleBouquets(newArr);
    }

    const deleteSaleFlower = (flower_id: number) => {
        let newArr = JSON.parse(JSON.stringify(saleFlowers!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));

        saleFlowers?.forEach((flower, index) => {
            tmpFlowersAmount?.forEach((flwr, indx) => {
                if (flwr.flower_name === flower.name) {
                    newArr_1[indx].amount += flower.amount;
                    newArr[index].amount = 0;
                }
            })
        })

        setTmpFlowersAmount(newArr_1);
        setSaleFlowers(newArr);
    }

    const deleteSaleBouquet = (bouquet_id: number) => {
        let newArr = JSON.parse(JSON.stringify(saleBouquets!));
        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));

        saleBouquets?.forEach((item, index) => {
            if (item.bouquet.id === bouquet_id) {
                item.bouquet.flowers.forEach(flower => {
                    tmpFlowersAmount?.forEach((flwr, indx) => {
                        if (flwr.flower_name === flower.name) {
                            newArr_1[indx].amount += (flower.amount * item.amount);
                            newArr[index].amount = 0;
                        }
                    })
                })
            }
        })

        setTmpFlowersAmount(newArr_1);
        setSaleBouquets(newArr);
    }

    const deleteAllItemsInSale = () => {

        let newArr_1 = JSON.parse(JSON.stringify(tmpFlowersAmount!));

        saleFlowers?.forEach((flower) => {
            if (flower.amount > 0) {
                tmpFlowersAmount?.forEach((flwr, indx) => {
                    if (flwr.flower_name === flower.name) {
                        newArr_1[indx].amount += flower.amount;
                    }
                })
            }
        });

        setTmpFlowersAmount(newArr_1);

        saleBouquets?.forEach((item) => {
            if (item.amount > 0) {
                item.bouquet.flowers.forEach(flower => {
                    tmpFlowersAmount?.forEach((flwr, indx) => {
                        if (flwr.flower_name === flower.name) {
                            newArr_1[indx].amount += (flower.amount * item.amount);
                        }
                    })
                })
            }
        });

        setTmpFlowersAmount(newArr_1);

        setZerosInDeliveryFlowersArray();
        setZerosInDeliveryBouquetsArray();
    }

    const updateSaleList = () => {
        let newArr: Flower[] | undefined = [];
        let newArr_1: { bouquet: Bouquet, amount: number }[] | undefined = [];
        saleFlowers?.map((flower) => {
            if (flower.amount > 0) {
                newArr!.push(flower);
            }
            return flower;
        })
        saleBouquets?.map((item) => {
            if (item.amount > 0) {
                newArr_1!.push(item);
            }
            return item;
        })
        if (newArr.length > 0) {
            setSaleFlowersList(newArr)
        }
        else {
            setSaleFlowersList([])
        }
        if (newArr_1.length > 0) {
            setSaleBouquetsList(newArr_1)
        }
        else {
            setSaleBouquetsList([])
        }
    }

    const updateSingleDelivery = (sale_id: number) => {
        salesData?.forEach((sale: Sale) => {
            sale.id === sale_id && setSingleSale(sale);
        })
    }

    const deleteFlowerListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(saleFlowersList!));
        newArr.splice(index, 1);
        setSaleFlowersList(newArr);
    }

    const deleteBouquetListElement = (index: number) => {
        let newArr = JSON.parse(JSON.stringify(saleBouquetsList!));
        newArr.splice(index, 1);
        setSaleBouquetsList(newArr);
    }

    const deliveryItemsAmount = () => {
        let amount = 0;
        saleFlowers?.forEach(flower => flower.amount > 0 && amount++);
        saleBouquets?.forEach(item => item.amount > 0 && amount++);
        return amount;
    }

    const tempItemsAmount = () => {
        let amount = 0;
        tmpFlowers?.forEach(flower => flower.amount > 0 && amount++);
        tmpBouquets?.forEach(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const addSale = () => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/sale/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                flowers: saleFlowersList,
                bouquets: saleBouquetsList
            })
        })

        FinishUpdates()
            .then((response) => {
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
            })

        setZerosInDeliveryFlowersArray();
        setZerosInDeliveryBouquetsArray();
        setSaleFlowersList([]);
        setSaleBouquetsList([]);
    }

    const updateFlowers = () => {
        flowersData?.forEach((flower) => {
            saleFlowersList?.forEach((flwr) => {
                if (flwr.name === flower.name) {
                    let tempAmount = flower.amount - flwr.amount;
                    return fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            name: flower.name,
                            price: flower.price,
                            amount: tempAmount
                        })
                    })
                }
            })
        })
    }

    const updateBouquets = () => {
        saleBouquetsList?.forEach(bouquetObject => {
            bouquetObject.bouquet.flowers.forEach(flwr => {
                flowersData?.forEach(flower => {
                    if (flwr.name === flower.name) {
                        let tempAmount = flower.amount - flwr.amount * bouquetObject.amount;
                        return fetch(`http://127.0.0.1:8000/api/flower/${flower.id}/update/`, {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json;charset=UTF-8',
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                name: flower.name,
                                price: flower.price,
                                amount: tempAmount
                            })
                        })
                    }
                })
            })
        })
    }

    const FinishUpdates = () => {
        return Promise.all([updateFlowers(), updateBouquets()])
    }

    return (
        <div className={classes.Main_Container}>

            <AddSaleModal
                openMobileAdd={openMobileAdd}
                handleCloseMobileAdd={handleCloseMobileAdd}
                switch_={switch_}
                setSwitch={setSwitch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                flowersData={flowersData}
                updateFlowersArrayOnInputChange={updateFlowersArrayOnInputChange}
                BouquetsData={BouquetsData}
                updateBouquetsArrayOnInputChange={updateBouquetsArrayOnInputChange}
                updateSaleFlowers={updateSaleFlowers}
                updateSaleBouquets={updateSaleBouquets}
                setZerosInFlowersTempArray={setZerosInFlowersTempArray}
                setZerosInBouquetsTempArray={setZerosInBouquetsTempArray}
                tempItemsAmount={tempItemsAmount}
                setFlowersData={setFlowersData}
                setBouquetsData={setBouquetsData}
                updateSaleList={updateSaleList}
                handleOpenAdd={handleOpenAdd}
                deliveryItemsAmount={deliveryItemsAmount}
                Florists_data={Florists_data}
                showAddAlert={showAddAlert}
                showNotEnoughAlert={showNotEnoughAlert}
            />
            <ShowSaleModal
                openSale={openSale}
                handleCloseSale={handleCloseSale}
                singleSale={singleSale}
            />
            <ShowSaleListModal
                openAdd={openAdd}
                loader={loader}
                openMobileAdd={openMobileAdd}
                handleCloseAdd={handleCloseAdd}
                deliveryItemsAmount={deliveryItemsAmount}
                setSaleFlowersList={setSaleFlowersList}
                setSaleBouquetsList={setSaleBouquetsList}
                deleteAllItemsInSale={deleteAllItemsInSale}
                deleteFlowerListElement={deleteFlowerListElement}
                deleteSaleFlower={deleteSaleFlower}
                saleFlowersList={saleFlowersList}
                saleBouquetsList={saleBouquetsList}
                deleteBouquetListElement={deleteBouquetListElement}
                deleteSaleBouquet={deleteSaleBouquet}
                addSale={addSale}
            />

            <div className={classes.Top_Container}>
                {
                    showAddAlert &&
                    <Alert message="Successfully added" />
                }
                {
                    (width > 1000 && showNotEnoughAlert) &&
                    <Alert message="Not enough flowers to add product" />
                }
                <Header />
                <SaleAddButton
                    handleOpenMobileAdd={handleOpenMobileAdd}
                />
            </div>
            <div className={classes.Bottom_Container}>
                <SalesListBox
                    itemSearchTerm={itemSearchTerm}
                    setItemSearchTerm={setItemSearchTerm}
                    salesData={salesData}
                    updateSingleDelivery={updateSingleDelivery}
                    handleOpenSale={handleOpenSale}
                    isFetching={isFetching}
                    isSalesTabReversed={isSalesTabReversed}
                />
                <AddSaleBox
                    switch_={switch_}
                    setSwitch={setSwitch}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    flowersData={flowersData}
                    updateFlowersArrayOnInputChange={updateFlowersArrayOnInputChange}
                    BouquetsData={BouquetsData}
                    updateBouquetsArrayOnInputChange={updateBouquetsArrayOnInputChange}
                    updateSaleFlowers={updateSaleFlowers}
                    updateSaleBouquets={updateSaleBouquets}
                    setZerosInFlowersTempArray={setZerosInFlowersTempArray}
                    setZerosInBouquetsTempArray={setZerosInBouquetsTempArray}
                    tempItemsAmount={tempItemsAmount}
                    setFlowersData={setFlowersData}
                    setBouquetsData={setBouquetsData}
                    Florists_data={Florists_data}
                    updateSaleList={updateSaleList}
                    handleOpenAdd={handleOpenAdd}
                    deliveryItemsAmount={deliveryItemsAmount}
                    isFetching={isFetching}
                    isFlowersTabReversed={isFlowersTabReversed}
                />
            </div>
        </div>

    )
}

export default Sales;
