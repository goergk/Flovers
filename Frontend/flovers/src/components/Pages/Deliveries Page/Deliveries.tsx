import React, { useEffect, useState } from 'react';
import classes from './Deliveries.module.css';
import { Delivery, Flower, useGetFloristQuery } from '../../../services/FloristsApi';
import {
    AddDeliveryBox,
    AddDeliveryModal,
    AlertBox,
    DeleteDeliveryModal,
    DeliveriesListBox,
    DeliveryAddButton,
    Header,
    ShowDeliveryListModal,
    ShowDeliveryModal
}
    from './Assets';

const Deliveries = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openMobileAdd, setOpenMobileAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemSearchTerm, setItemSearchTerm] = useState('');
    const [firstRunTemp, setFirstRunTemp] = useState(true);
    const [firstRun, setFirstRun] = useState(true);
    const [isDeliveriesTabReversed, setIsDeliveriesTabReversed] = useState(false);
    const [isFlowersTabReversed, setIsFlowersTabReversed] = useState(false);
    const [firstDeliveriesRun, setFirstDeliveriesRun] = useState(true);
    const [firstFlowersRun, setFirstFlowersRun] = useState(true);
    const [loader, setLoader] = useState(false);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenMobileAdd = () => setOpenMobileAdd(true);
    const handleCloseMobileAdd = () => setOpenMobileAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenDelivery = () => setOpenDelivery(true);
    const handleCloseDelivery = () => setOpenDelivery(false);

    const { data: Florists_data, refetch, isFetching } = useGetFloristQuery(Number(sessionStorage.getItem('florist_id')));

    const [flowersData, setFlowersData] = useState(Florists_data?.florist[0].flowers);
    const [tmpFlowers, setTmpFlowers] = useState<Flower[] | undefined>();
    const [deliveryFlowers, setDeliveryFlowers] = useState<Flower[] | undefined>();
    const [deliveryList, setDeliveryList] = useState<Flower[] | undefined>();

    const [deliveriesData, setDeliveriesData] = useState(Florists_data?.florist[0].deliveries);
    const [singleDelivery, setSingleDelivery] = useState<Delivery | undefined>();

    useEffect(() => {
        let tempArr: Delivery[] | undefined = [];
        if (Florists_data !== undefined) {
            tempArr = JSON.parse(JSON.stringify(Florists_data?.florist[0].deliveries.filter((delivery) => delivery.id.toString().includes(itemSearchTerm.toString()))));
            tempArr = tempArr!.reverse();
            setDeliveriesData(tempArr);
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
            setDeliveryFlowers(Florists_data?.florist[0].flowers);
        }
        if (Florists_data !== undefined && firstRunTemp) {
            setTmpFlowers(Florists_data?.florist[0].flowers);
        }
    }, [Florists_data, searchTerm])

    useEffect(() => {
        if (Florists_data !== undefined) {
            if (firstDeliveriesRun) {
                if (Florists_data?.florist[0].deliveries.length! > 0) {
                    let temp_id = Florists_data?.florist[0].deliveries[(Florists_data?.florist[0].deliveries.length) - 1].id;
                    if (deliveriesData?.[0].id === temp_id) {
                        setIsDeliveriesTabReversed(true);
                        setFirstDeliveriesRun(false);
                    }
                }
            }
        }
    }, [deliveriesData])

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
            setZerosInTempArray();
            setFirstRunTemp(false);
        }
    }, [tmpFlowers]);

    useEffect(() => {
        if (firstRun && deliveryFlowers !== undefined) {
            setZerosInDeliveryArray();
            setFirstRun(false);
        }
    }, [deliveryFlowers]);

    const setZerosInTempArray = () => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setTmpFlowers(newArr);
    }

    const setZerosInDeliveryArray = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers));
        newArr.map((flower: Flower) => flower.amount = 0);
        setDeliveryFlowers(newArr);
    }

    const updateArrayOnInputChange = (flower_id: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newArr = JSON.parse(JSON.stringify(tmpFlowers!));
        newArr.map((flower: Flower) => flower.id === flower_id ? flower.amount = Number(e.target.value) : flower);
        setTmpFlowers(newArr);
    }

    const updateDeliveryFlowers = () => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers!));
        tmpFlowers?.map((flower, index) => {
            if (flower.amount > 0) {
                newArr[index].amount += flower.amount;
            }
            return flower;
        })
        setDeliveryFlowers(newArr);
    }

    const deleteDeliveryFlower = (flower_id: number) => {
        let newArr = JSON.parse(JSON.stringify(deliveryFlowers!));
        let index = -1;
        newArr.map((flower: Flower, i: number) => {
            if (flower.id === flower_id) {
                index = i;
            }
            return index;
        })
        newArr.splice(index, 1);
        setDeliveryFlowers(newArr);
    }

    const updateDeliveryList = () => {
        let newArr: Flower[] | undefined = [];
        deliveryFlowers?.map((flower) => {
            if (flower.amount > 0) {
                newArr!.push(flower);
            }
            return flower;
        })
        if (newArr.length > 0) { setDeliveryList(newArr) }
    }

    const updateSingleDelivery = (delivery_id: number) => {
        deliveriesData?.forEach((delivery: Delivery) => {
            delivery.id === delivery_id && setSingleDelivery(delivery);
        })
    }

    const deleteSingleDelivery = (delivery_id: number) => {
        setLoader(true);
        updateFlowersInResources(deliveryList!, true);
        fetch(`http://127.0.0.1:8000/api/delivery/${delivery_id}/delete/`, {
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
        let newArr = JSON.parse(JSON.stringify(deliveryList!));
        newArr.splice(index, 1);
        setDeliveryList(newArr);
    }

    const deliveryItemsAmount = () => {
        let amount = 0;
        deliveryFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const tempItemsAmount = () => {
        let amount = 0;
        tmpFlowers?.map(flower => flower.amount > 0 && amount++);
        return amount;
    }

    const addDelivery = () => {
        setLoader(true);
        fetch(`http://127.0.0.1:8000/api/florist/${sessionStorage.getItem('florist_id')}/delivery/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                flowers: deliveryList
            })
        }).then((response) => {
            if (response.ok) {
                refetch();
                handleCloseMobileAdd();
                handleCloseAdd();
                setTimeout(function () {
                    setLoader(false);
                }, 200);
                setShowAddAlert(true);
                setTimeout(function () {
                    setShowAddAlert(false);
                }, 2000);
            }
        })

        updateFlowersInResources(deliveryList!, false);
        setDeliveryList([]);
        setZerosInDeliveryArray();
        setZerosInTempArray();
    }

    const updateFlowersInResources = (deliveryList: Flower[], del: boolean) => {
        let tempAmount = 0;
        let List: Flower[] = [];
        if (del) { List = singleDelivery!.flowers }
        else { List = deliveryList }

        List.forEach(flower => {
            flowersData?.forEach(flower_ => {
                if (flower_.name === flower.name) {
                    if (del) { tempAmount = flower_.amount - flower.amount; }
                    else { tempAmount = flower_.amount + flower.amount; }
                    fetch(`http://127.0.0.1:8000/api/flower/${flower_.id}/update/`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            name: flower_.name,
                            price: flower_.price,
                            amount: tempAmount
                        })
                    })
                    tempAmount = 0;
                }
            })
        })
    }

    return (
        <div className={classes.Main_Container}>

            <AddDeliveryModal
                openMobileAdd={openMobileAdd}
                handleCloseMobileAdd={handleCloseMobileAdd}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                flowersData={flowersData}
                updateArrayOnInputChange={updateArrayOnInputChange}
                updateDeliveryFlowers={updateDeliveryFlowers}
                setZerosInTempArray={setZerosInTempArray}
                tempItemsAmount={tempItemsAmount}
                setFlowersData={setFlowersData}
                Florists_data={Florists_data}
                updateDeliveryList={updateDeliveryList}
                handleOpenAdd={handleOpenAdd}
                deliveryItemsAmount={deliveryItemsAmount}
            />
            <DeleteDeliveryModal
                openDelete={openDelete}
                loader={loader}
                handleCloseDelete={handleCloseDelete}
                deleteSingleDelivery={deleteSingleDelivery}
                singleDelivery={singleDelivery}
            />
            <ShowDeliveryModal
                openDelivery={openDelivery}
                handleCloseDelivery={handleCloseDelivery}
                singleDelivery={singleDelivery}
            />
            <ShowDeliveryListModal
                openAdd={openAdd}
                loader={loader}
                openMobileAdd={openMobileAdd}
                handleCloseAdd={handleCloseAdd}
                deliveryItemsAmount={deliveryItemsAmount}
                setDeliveryList={setDeliveryList}
                setZerosInDeliveryArray={setZerosInDeliveryArray}
                deliveryList={deliveryList}
                deleteListElement={deleteListElement}
                deleteDeliveryFlower={deleteDeliveryFlower}
                addDelivery={addDelivery}
            />

            <div className={classes.Top_Container}>
                <AlertBox
                    showAddAlert={showAddAlert}
                    showDeleteAlert={showDeleteAlert}
                />
                <Header />
                <DeliveryAddButton
                    handleOpenMobileAdd={handleOpenMobileAdd}
                />
            </div>
            <div className={classes.Bottom_Container}>
                <DeliveriesListBox
                    itemSearchTerm={itemSearchTerm}
                    setItemSearchTerm={setItemSearchTerm}
                    deliveriesData={deliveriesData}
                    updateSingleDelivery={updateSingleDelivery}
                    handleOpenDelivery={handleOpenDelivery}
                    handleOpenDelete={handleOpenDelete}
                    isFetching={isFetching}
                    isDeliveriesTabReversed={isDeliveriesTabReversed}
                />
                <AddDeliveryBox
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    flowersData={flowersData}
                    updateArrayOnInputChange={updateArrayOnInputChange}
                    updateDeliveryFlowers={updateDeliveryFlowers}
                    setZerosInTempArray={setZerosInTempArray}
                    tempItemsAmount={tempItemsAmount}
                    setFlowersData={setFlowersData}
                    Florists_data={Florists_data}
                    updateDeliveryList={updateDeliveryList}
                    handleOpenAdd={handleOpenAdd}
                    deliveryItemsAmount={deliveryItemsAmount}
                    isFetching={isFetching}
                    isFlowersTabReversed={isFlowersTabReversed}
                />
            </div>
        </div>

    )
}

export default Deliveries;
