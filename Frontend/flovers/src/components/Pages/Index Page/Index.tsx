import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../app/store";
import Logo from "../../Assets/Logo/Logo";
import { PageType } from "../Current Page/PageType";

const Index = () => {
    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.SIGNIN}`);
    const { login } = useSelector((state: RootState) => state.Login);

    if (!login) { changeRoute() }

    const HandleFetch = () => {
        let authorization_token = "Bearer " + sessionStorage.getItem('token');
        fetch('http://127.0.0.1:8000/api/users/', {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': authorization_token
            },
        }).then((response) => {
            response.json().then(data => {
                if (response.ok) {
                    console.log(data);
                } else {
                    console.log('Something went wrong');
                }
            })
        });
    }

    return (
        <div style={{ backgroundColor: 'white', width: '100vw' }}>
            <Logo />
            <button onClick={() => HandleFetch()}>Fetch Test data</button>
        </div>
    )
}

export default Index;
