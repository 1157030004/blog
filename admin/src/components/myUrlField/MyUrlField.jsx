import * as React from "react";
import { useRecordContext } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {Launch} from '@material-ui/icons/';



const MyUrlField = ({ source }) => {
    const record = useRecordContext();
    const styles = useStyles();

    return record ? (
        <a className={styles.link} href={record[source]}>
            {record[source]}
            <Launch className={styles.icon} />
        </a>
    ) : null;
}

export default MyUrlField;

const useStyles = makeStyles({
    link:{
        textDecoration: 'none'
    },
    icon:{
        width: '0.5em',
        height: '0.5em',
        paddingLeft: 2
    }
})