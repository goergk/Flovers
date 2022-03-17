import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import Loader from '../../../Assets/Loader/Loader';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';
import classes from '../Compositions.module.css';
import TextField from '@mui/material/TextField';
import { Flower } from '../../../../services/FloristsApi';
import { FormikErrors } from 'formik/dist/types';

interface Props {
    openAdd: boolean,
    loader: boolean,
    openMobileAdd: boolean,
    handleCloseAdd: () => void,
    setBouquetList: React.Dispatch<React.SetStateAction<Flower[] | undefined>>,
    setZerosInBouquetArray: () => void,
    bouquetItemsAmount: () => number,
    BouquetList: Flower[] | undefined,
    deleteListElement: (index: number) => void,
    deleteBouquetFlower: (index: number) => void,
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
    values: {
        Name: string;
    },
    errors: FormikErrors<{
        Name: string;
    }>,
    err: boolean,
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
}

const ShowBouquetListModal: React.FC<Props> = ({
    openAdd,
    loader,
    openMobileAdd,
    handleCloseAdd,
    setBouquetList,
    setZerosInBouquetArray,
    bouquetItemsAmount,
    BouquetList,
    deleteListElement,
    deleteBouquetFlower,
    handleSubmit,
    values,
    errors,
    err,
    handleChange
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openAdd}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openAdd}>
                <div className={classes.Main_Bouquet_Modal_container}>
                    {loader
                        ?
                        <Loader />
                        :

                        <div className={classes.Bouquet_Modal_Container}>
                            <div className={classes.Close_Icon_container} style={openMobileAdd ? { justifyContent: 'flex-start' } : undefined}>
                                {openMobileAdd
                                    ?
                                    <KeyboardBackspaceIcon className={classes.Back_Icon} onClick={handleCloseAdd} />
                                    :
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseAdd} />
                                }

                            </div>
                            <h2>
                                Add new bouquet
                            </h2>
                            {bouquetItemsAmount() > 0
                                &&
                                <div className={classes.Delete_Icon_container}>
                                    <div className={classes.Delete_Icon_Inner_container}
                                        onClick={e => {
                                            setBouquetList([]);
                                            setZerosInBouquetArray();
                                        }}
                                    >
                                        Delete all <DeleteOutlineIcon />
                                    </div>
                                </div>
                            }
                            <div className={classes.Bouquet_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                                {
                                    bouquetItemsAmount() === 0
                                        ?
                                        <h4>No flowers added to bouquet</h4>
                                        :
                                        BouquetList?.map((flower, index) => {
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
                                                        <ClearIcon className={classes.Clear_Icon}
                                                            onClick={e => {
                                                                deleteListElement(index);
                                                                deleteBouquetFlower(flower.id);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            {bouquetItemsAmount() > 0
                                &&
                                <>
                                    <form className={classes.Add_Bouquet_Form} onSubmit={handleSubmit}>
                                        <div className={classes.Bouquet_Name_Input}>
                                            <TextField
                                                id="Name"
                                                label="Bouquet Name"
                                                variant="outlined"
                                                size="small"
                                                value={values.Name}
                                                error={errors.Name !== undefined || err}
                                                helperText={errors.Name !== undefined ? errors.Name : (err ? "Bouquet with that name already exists" : " ")}
                                                onChange={handleChange}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                        <button className={classes.Modal_button} type="submit">Save</button>
                                    </form>
                                </>
                            }
                        </div>
                    }
                </div>
            </Fade>
        </Modal>
    )
}

export default ShowBouquetListModal