import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Graph from './Graph';
import Card from '@material-ui/core/Card';
import { AnimatePresence } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
        root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },margin: {
            margin: theme.spacing(1),
        },
    },
}));

const Search = () => {
    const [id, setId] = useState('');
    const [init, setInit] = useState(true);
    const [data, setData] = useState({});
    const classes = useStyles();

    const searchId = async (id) => {
        const url = 'https://avatar.labpro.dev/friends/' + id;
        const dataUser = await fetch(url)
                        .then(res => res.json());
        setData(dataUser);
        setInit(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchId(id);
        setId('');
    }

    const handleChange = (e) => {
        setId(e.target.value);
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}className = {classes.root} noValidate autoComplete="off" style={styles.form}>
                <TextField value={id} onChange={handleChange} id="outlined-basic" label="ID" variant="outlined" size="small" />
                <Button type="submit" variant="contained" size="medium" color="primary" className={classes.margin}>
                    Search
                </Button>
            </form>
            <div>
            
            <AnimatePresence>
            {init === true ? "" : 
                data.status === 200 ? 
                <Card variant="outlined" style={styles.graph}>
                    <Graph
                        data={data}
                        search={searchId}
                    />
                </Card> :
                "ID Tidak Ditemukan"
            }
            </AnimatePresence>
            </div>
        </div>
    );
}

const styles = {
    form : {
        backgroundColor : 'white',
        borderRadius : 10,
        borderWidth : 1.5,
        borderColor : 'black',
        borderStyle : 'solid',
        padding : 10,
    },
    graph : {
        margin : 10,
    }
}

export default Search;