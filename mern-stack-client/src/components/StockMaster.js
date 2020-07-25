import _ from "lodash";
import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/stockMaster";
import { Dialog,DialogContent,Table,TableBody,TableCell,TableRow,
    TableHead,Grid, Paper, 
    withStyles, TextField, Typography, Divider, 
    Button, DialogTitle } from "@material-ui/core";
import PostMessageForm from "./PostMessageForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import { AssignmentTurnedIn } from "@material-ui/icons";

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})





const StockMaster = ({ classes, ...props }) => {
    const [stock,setStock]=React.useState({});
    const [open,setOpen]=React.useState(false);
    useEffect(() => {
        props.fetchAllStocksData()
    }, [])//DidMount
    const onSuccess = () => {
        ButterToast.raise({
            content: <Cinnamon.Crisp title="Post Box"
                content="Submitted successfully"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
            />
        })
        setOpen(false);
        setStock({});
    }
    const handleSubmit = e => {
        e.preventDefault()
        props.createStockData(stock, onSuccess)
    }
    const createStockTable = (stocks) => {
        return _.map(stocks,(stock,index)=>{
            return(
                <React.Fragment>
                    <TableRow>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.lastClose}</TableCell>
                        <TableCell>{'Analysis'}</TableCell>
                    </TableRow>
                </React.Fragment>
            )
        })
    }
    console.log('Before Render',props.stockData);
    return (
        <React.Fragment>
            <Paper>
            <Typography
              variant="h2"
              color="inherit"
              style={{ align: "center" }}
            >
              Header
            </Typography> 
            </Paper>
            <Button onClick={()=>setOpen(true)}>Add A Record</Button>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Last Close</TableCell>
                            <TableCell>Analysis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stockData && props.stockData.length > 0 && (
                            <React.Fragment>
                                {createStockTable(props.stockData)}
                            </React.Fragment>
                        )}
                        {!props.stockData || props.stockData.length === 0 && (
                            <React.Fragment>
                                <TableRow>No Records Found</TableRow>
                            </React.Fragment>
                        )}
                    </TableBody>
                </Table>
            </Paper>
            <Dialog open={open} aria-labelledby="form-dailog-title">
                <DialogTitle>Add a Stock</DialogTitle>
                <DialogContent>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
                    onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={stock.name}
                        onChange={e=>setStock({...stock,name:e.target.value})}
                    />
                    <TextField
                        name="lastClose"
                        variant="outlined"
                        label="Last Close"
                        fullWidth
                        multiline
                        rows={4}
                        value={stock.lastClose}
                        onChange={e=>setStock({...stock,lastClose:e.target.value})}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        className={classes.postBtn}
                    >Submit</Button>
                </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    stockData: state.stockMaster.list
})

const mapActionToProps = {
    fetchAllStocksData: actions.fetchAllStocks,
    createStockData:actions.createStock,
    //deleteStockData: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(StockMaster));
