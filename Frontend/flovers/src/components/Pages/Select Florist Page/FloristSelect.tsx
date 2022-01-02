import classes from './FloristSelect.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import YardIcon from '@mui/icons-material/Yard';
import { useGetFloristsQuery } from "../../../services/FloristsApi";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useHistory } from 'react-router-dom';
import { PageType } from '../Current Page/PageType';

const FloristSelect = () => {
    const [amount, setAmount] = useState(0);
    const { data: Florists_data } = useGetFloristsQuery(Number(sessionStorage.getItem('user_id')));
    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.SIGNIN}`);
    const { login } = useSelector((state: RootState) => state.Login);

    if (!login) { changeRoute() }

    useEffect(() => {
        setAmount(Number(Florists_data?.length));
    }, [Florists_data])

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Header_Container}>
                <h1>Select florist:</h1>
            </div>
            <div className={classes.Tabs_Container}>
                {
                    amount < 4
                    &&
                    <div className={classes.Add_Florist_Container}>
                        <h1>
                            Add New
                        </h1>
                        <AddCircleOutlineIcon className={classes.Add_Icon} />
                    </div>
                }
                {
                    Florists_data?.florists?.map(florist => {
                        return (
                            <div className={classes.Florist_Container} key={florist.id}>
                                <h1>
                                    {florist.name}
                                </h1>
                                <YardIcon className={classes.Florist_Icon} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default FloristSelect;
