import React from 'react'
import Alert from '../../../Assets/Alert/Alert';

interface Props {
    showAddAlert: boolean;
    showEditAlert: boolean;
    showDeleteAlert: boolean;
}

const AlertBox: React.FC<Props> = ({
    showAddAlert,
    showEditAlert,
    showDeleteAlert
}) => {
    return (
        <>
            {showAddAlert && <Alert message="Successfully added" />}
            {showEditAlert && <Alert message="Successfully edited" />}
            {showDeleteAlert && <Alert message="Successfully deleted" />}
        </>
    )
}

export default AlertBox;