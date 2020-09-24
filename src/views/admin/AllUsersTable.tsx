import React from "react";
import MaterialTable from "material-table";
import {Link} from "react-router-dom";
import {UserDetails} from "../../config/apolo/queries/UserQueries";

interface Props {
    users?: UserDetails[]
    loading: boolean
}

function AllUsersTable(props: Props) {
    console.log(props.users);
    return (
        <MaterialTable
            title="All users currently registered"
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
            ]}
            data={props.users !== undefined ? props.users : []}
            options={{
                sorting: true
            }}
            isLoading={props.loading}

        />
    )
}

export {AllUsersTable}
