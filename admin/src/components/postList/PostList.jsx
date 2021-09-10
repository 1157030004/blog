import * as React from "react";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

 const PostList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    console.log("DATA POSTLIST",props)
    return(
    <List {...props} filters={postFilters}>
        {isSmall ? (

            <SimpleList
            primaryText={record => console.log("RECORD",record)}
            secondaryText={record => `${record.views} views`}
            tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
            />)
            : (
                
            <Datagrid >
                <TextField source="id" />
                    <ReferenceField source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                <TextField source="title" />
                <EditButton />
            </Datagrid>
        )
        }
    </List>
)};

const PostTitle = ({ record }) => {
        return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };

 const PostEdit = props => {
    const styles = useStyles();
     return(
     
        <Edit {...props} title={<PostTitle />}>
            <SimpleForm>
            <TextInput source="id" />
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                
                <TextInput source="title" />
                <TextInput className={styles.textarea} multiline source="body" />
            </SimpleForm>
        </Edit>
    )
 }

 const PostCreate = props => {
    const styles = useStyles();
     return(
     
        <Create {...props}>
            <SimpleForm>
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                
                <TextInput source="title" />
                <TextInput className={styles.textarea} multiline source="body" />
            </SimpleForm>
        </Create>
    )
 }

export { PostList, PostEdit, PostCreate}

const useStyles = makeStyles({
    textarea:{
        width: "100%"
    }
})