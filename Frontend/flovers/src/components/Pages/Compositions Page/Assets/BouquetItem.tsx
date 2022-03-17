import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import classes from '../Compositions.module.css';
import { Bouquet } from '../../../../services/FloristsApi';

interface Props {
    bouquet: Bouquet,
    updateSingleBouquet: (bouquet_id: number) => void,
    handleOpenBouquet: () => void,
    index: number,
    handleOpenDelete: () => void
}

const BouquetItem: React.FC<Props> = ({
    bouquet,
    updateSingleBouquet,
    handleOpenBouquet,
    index,
    handleOpenDelete
}) => {
    return (
        <div
            className={classes.List_Item_Container}
            key={bouquet.id}
            onClick={e => {
                updateSingleBouquet(bouquet.id);
                handleOpenBouquet();
            }}
        >
            <div className={classes.Show_Number}>
                <p className={classes.List_Container_Text}>
                    {index + 1}
                </p>
            </div>
            <div className={classes.Show_Name}>
                <p className={classes.List_Container_Text_First}>
                    {bouquet.name}
                </p>
            </div>
            <div className={classes.Show_Date}>
                <p className={classes.List_Container_Text}>
                    {bouquet.creation_date.toString().split('T')[0]}
                </p>
            </div>
            <div className={classes.Show_Amount}>
                <DeleteForeverIcon className={classes.More_Options_Icon}
                    onClick={e => {
                        e.stopPropagation();
                        updateSingleBouquet(bouquet.id);
                        handleOpenDelete();
                    }} />
            </div>
        </div>
    )
}

export default BouquetItem