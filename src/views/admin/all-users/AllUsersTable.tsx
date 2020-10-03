import React from "react";
import MaterialTable from "material-table";
import {Link} from "react-router-dom";
import {UserDetails} from "../../../services/apollo/queries/UserQueries";
import {Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

interface Props {
    users?: UserDetails[]
    loading: boolean
}

function AllUsersTable(props: Props) {
    return (
        <MaterialTable
            title="All users currently registered"
            style={{}}
            columns={[
                {
                    title: 'User id', field: 'userId', type: 'numeric', headerStyle: {
                        textAlign: "left"
                    }, cellStyle: {
                        textAlign: "left"
                    }
                },
                {title: 'Username', field: 'username', type: 'string'},
                {title: 'Registration Date', field: 'registrationDate', type: 'datetime'},
                {title: 'Account Non Locked', field: 'accountNonLocked', type: 'boolean'},
                {title: 'Authority', field: 'authorities[0].authority', type: 'string'},
                {
                    title: 'Edit User',
                    field: 'userId',
                    sorting: false,
                    render: rowData =>
                        <Button color="inherit" component={Link} to={`/admins/edit-user/${rowData.userId}`}
                                className={'ml-auto'}>
                            <EditIcon/>Edit User
                        </Button>
                },
            ]}
            data={props.users !== undefined ? props.users : []}
            options={{
                sorting: true
            }}
            isLoading={props.loading}
        />
    )
}

// `/admins/edit-user/${rowData.userId}`
export {AllUsersTable}
