import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../Store/modalSlice";
import { deleteProject } from "../../Store/projectSlice";

const ProjectDelete = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.currentProject);
    return(
    <div>
        <Box sx={{mt:1}} display="flex" justifyContent={"space-between"} alignItems="center" flexDirection={"column"} minHeight="15vh">
            <Typography fontSize={24}>Are you sure to delete project?</Typography>
            <Grid container xs={12}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Box  display="flex" justifyContent={"space-between"} alignItems="space-between">
                        <Button variant="contained" color="primary" onClick={() => dispatch(deleteProject(project)).then(dispatch(closeModal())).then(console.log(project))}>Yes</Button>
                        <Button variant="contained" color="error" onClick={() => dispatch(closeModal())}>No</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
    )
}

export default ProjectDelete;