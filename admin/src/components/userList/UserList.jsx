import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';
import MyUrlField from '../myUrlField/MyUrlField';

const UserList = props => {
    console.log(props)
    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
                <EmailField source="email" />
                <TextField source="phone" />
                <MyUrlField source="website" />
                <TextField source="company.name" />
            </Datagrid>
        </List>
    )
};

export default UserList;