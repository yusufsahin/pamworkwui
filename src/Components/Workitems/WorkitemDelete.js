import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../Store/modalSlice";
import { deleteWorkitem } from "../../Store/workitemSlice";

const WorkitemDelete = () => {
    const dispatch = useDispatch();
    const workitem = useSelector((state) => state.workitem.currentWorkitem);
    return(
    <div>
        <Box sx={{mt:1}} display="flex" justifyContent={"space-between"} alignItems="center" flexDirection={"column"} minHeight="15vh">
            <Typography fontSize={24}>Are you sure to delete workitem?</Typography>
            <Grid container xs={12}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Box  display="flex" justifyContent={"space-between"} alignItems="space-between">
                        <Button variant="contained" color="primary" onClick={() => dispatch(deleteWorkitem(workitem)).then(dispatch(closeModal())).then(console.log(workitem))}>Yes</Button>
                        <Button variant="contained" color="error" onClick={() => dispatch(closeModal())}>No</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
    )
}

export default WorkitemDelete;