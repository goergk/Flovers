import React from 'react';
import classes from '../Resources.module.css';
import { Delivery, Flower } from '../../../../services/FloristsApi';
import { FlowerItem, MoreOptionsBox, Tags } from '.';

interface Props {
    flowersData: Flower[] | undefined,
    indexOfElement: number,
    handleOpenEdit: (flower_id: number) => void,
    setEditValues: (florist_name: string, florist_price: string) => void,
    handleOpenDelete: (flower_id: number) => void,
    handleInput: (index: number) => void,
    deliveriesData: Delivery[] | undefined,
    handleOpenDelivery: () => void,
    updateSingleDelivery: (delivery_id: number, flower_name: string) => void
}

const FlowersListBox: React.FC<Props> = ({
    flowersData,
    indexOfElement,
    handleOpenEdit,
    setEditValues,
    handleOpenDelete,
    handleInput,
    deliveriesData,
    handleOpenDelivery,
    updateSingleDelivery
}) => {
    return (
        <div className={classes.Show_Flowers_Container}>
            <div className={classes.Show_Container_1}>
                <Tags />
            </div>
            <div className={classes.Show_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                {
                    flowersData?.length! > 0
                        ?
                        <>
                            {
                                flowersData?.map((flower, index) => {
                                    return (
                                        <>
                                            <FlowerItem
                                                flower={flower}
                                                indexOfElement={indexOfElement}
                                                index={index}
                                                handleInput={handleInput}
                                            />
                                            <MoreOptionsBox
                                                flower={flower}
                                                indexOfElement={indexOfElement}
                                                index={index}
                                                handleOpenEdit={handleOpenEdit}
                                                setEditValues={setEditValues}
                                                handleOpenDelete={handleOpenDelete}
                                                deliveriesData={deliveriesData}
                                                handleOpenDelivery={handleOpenDelivery}
                                                updateSingleDelivery={updateSingleDelivery}
                                            />
                                        </>
                                    )
                                })
                            }
                        </>
                        :
                        <h3 style={{ fontSize: 'calc(6px + 1.2vh)' }}>
                            No flowers
                        </h3>
                }
            </div>
        </div>
    )
};

export default FlowersListBox;
