import React from 'react'
import Alert from '../../../Assets/Alert/Alert';

interface Props {
    showAddAlert: boolean;
    showDeleteAlert: boolean;
}

const AlertBox: React.FC<Props> = ({
    showAddAlert,
    showDeleteAlert
}) => {
    return (
        <>
            {showAddAlert && <Alert message="Successfully added" />}
            {showDeleteAlert && <Alert message="Successfully deleted" />}
        </>
    )
}

export default AlertBox;