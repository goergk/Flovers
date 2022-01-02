import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../app/store";
import { PageType } from "../Current Page/PageType";
import classes from './FloristSelect.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import YardIcon from '@mui/icons-material/Yard';

const FloristSelect = () => {
    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.SIGNIN}`);
    const { login } = useSelector((state: RootState) => state.Login);

    if (!login) { changeRoute() }

    // const HandleFetch = () => {
    //     let authorization_token = "Bearer " + sessionStorage.getItem('token');
    //     fetch('http://127.0.0.1:8000/api/users/', {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json, text/plain',
    //             'Content-Type': 'application/json; charset=UTF-8',
    //             'Authorization': authorization_token
    //         },
    //     }).then((response) => {
    //         response.json().then(data => {
    //             if (response.ok) {
    //                 console.log(data);
    //             } else {
    //                 console.log('Something went wrong');
    //             }
    //         })
    //     });
    // }

    return (
        <div className={classes.Main_Container}>
            <div className={classes.Header_Container}>
                <h1>Select florist:</h1>
            </div>
            <div className={classes.Tabs_Container}>
                <div className={classes.Add_Florist_Container}>
                    <h1>
                        Add New
                    </h1>
                    <AddCircleOutlineIcon className={classes.Add_Icon} />
                </div>
                <div className={classes.Florist_Container}>
                    <h1>
                        Florist 1
                    </h1>
                    <YardIcon className={classes.Florist_Icon} />
                </div>
                <div className={classes.Florist_Container}>
                    <h1>
                        Florist 2
                    </h1>
                    <YardIcon className={classes.Florist_Icon} />
                </div>
                <div className={classes.Florist_Container}>
                    <h1>
                        Florist 3
                    </h1>
                    <YardIcon className={classes.Florist_Icon} />
                </div>
            </div>
        </div>
    )
}

export default FloristSelect;
