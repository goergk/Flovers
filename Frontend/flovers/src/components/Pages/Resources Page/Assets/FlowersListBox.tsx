import React from 'react';
import classes from '../Resources.module.css';
import { Flower } from '../../../../services/FloristsApi';
import { FlowerItem, MoreOptionsBox, Tags } from '.';

interface Props {
    flowers_data: Flower[] | undefined,
    indexOfElement: number,
    handleOpenEdit: (flower_id: number) => void,
    setEditValues: (florist_name: string, florist_price: string) => void,
    handleOpenDelete: (flower_id: number) => void,
    handleInput: (index: number) => void
}

const FlowersListBox: React.FC<Props> = ({
    flowers_data,
    indexOfElement,
    handleOpenEdit,
    setEditValues,
    handleOpenDelete,
    handleInput
}) => {
    return (
        <div className={classes.Show_Flowers_Container}>
            <div className={classes.Show_Container_1}>
                <Tags />
            </div>
            <div className={classes.Show_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                {
                    flowers_data?.length! > 0
                        ?
                        <>
                            {
                                flowers_data?.map((flower, index) => {
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
