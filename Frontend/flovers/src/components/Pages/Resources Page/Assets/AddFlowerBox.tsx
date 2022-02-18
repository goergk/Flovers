import React from 'react';
import TextField from '@mui/material/TextField';
import AddIllustration from '../../../Images/flower_add.svg';
import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../Resources.module.css';
import { makeStyles } from "@material-ui/core/styles";
import { FormikErrors } from 'formik';
import Loader from '../../../Assets/Loader/Loader';

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d97979"
        },
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            color: "#d97979"
        },
        "& .MuiInputLabel-outlined": {
            color: "white"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#d97979"
        },
        marginBottom: ".2em"
    }
});

interface Props {
    values:
    {
        Name: string;
        Price: string;
        Edit_Name: string;
        Edit_Price: string;
    },
    errors:
    FormikErrors<{
        Name: string;
        Price: string;
        Edit_Name: string;
        Edit_Price: string;
    }>,
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
    loader: boolean,
    err: boolean,
    setErr: React.Dispatch<React.SetStateAction<boolean>>
}

const AddFlowerBox: React.FC<Props> = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    loader,
    err,
    setErr
}) => {
    const classes_2 = useStyles();

    return (
        <div className={classes.Add_Flower_Container}>
            <div className={classes.Add_Container_1}>
                <AddBoxIcon className={classes.Icon} />
                <p>
                    Add flower
                </p>
            </div>
            <div className={classes.Add_Container_2} style={{ maxHeight: '100%', overflow: 'auto' }}>
                <div>
                    <h3>
                        Add new flower to your database:
                    </h3>
                    <form className={classes.Resources_Form} onSubmit={handleSubmit}>
                        {
                            loader
                                ?
                                <Loader />
                                :
                                <>
                                    <TextField
                                        id="Name"
                                        label="Flower Name"
                                        variant="outlined"
                                        size="small"
                                        value={values.Name}
                                        error={errors.Name !== undefined || err}
                                        helperText={errors.Name !== undefined ? errors.Name : (err ? "Flower with that name already exists" : " ")}
                                        onChange={e => { handleChange(e); setErr(false); }}
                                        className={classes_2.root}
                                    />
                                    <TextField
                                        id="Price"
                                        label="Price"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        value={values.Price}
                                        error={errors.Price !== undefined}
                                        helperText={errors.Price !== undefined ? errors.Price : " "}
                                        onChange={handleChange}
                                        className={classes_2.root}
                                    />
                                    <button className={classes.Add_Flower_Button} type="submit">Add</button>
                                </>
                        }
                    </form>
                </div>
                <div>
                    <img src={AddIllustration} alt="Add_Image" className={classes.Add_Illustrator} />
                </div>
            </div>
        </div>
    );
};

export default AddFlowerBox;
