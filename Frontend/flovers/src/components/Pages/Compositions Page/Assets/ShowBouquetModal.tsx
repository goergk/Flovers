import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Compositions.module.css';
import { Bouquet } from '../../../../services/FloristsApi';

interface Props {
    openBouquet: boolean,
    singleBouquet: Bouquet | undefined,
    handleCloseBouquet: () => void
}

const ShowBouquetModal: React.FC<Props> = ({
    openBouquet,
    singleBouquet,
    handleCloseBouquet
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openBouquet}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openBouquet}>
                <div className={classes.Main_Bouquet_Modal_container}>
                    <div className={classes.Bouquet_Modal_Container}>
                        <div className={classes.Close_Icon_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseBouquet} />
                        </div>
                        <h2>
                            {singleBouquet?.name}
                        </h2>
                        <div className={classes.Bouquet_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                            {
                                singleBouquet?.flowers?.map((flower, index) => {
                                    return (
                                        <div className={classes.Bouquet_Item_Container} key={flower.id}>
                                            <div className={classes.Container_C1}>
                                                <b>{index + 1}</b>
                                            </div>
                                            <div className={classes.Container_C2}>
                                                {flower.name}
                                            </div>
                                            <div className={classes.Container_C3}>
                                                {flower.amount}
                                            </div>
                                            <div className={classes.Container_C4}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ShowBouquetModal