import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../Store/modalSlice";
import { deleteNote } from "../../Store/noteSlice";

const NoteDelete = () => {
    const dispatch = useDispatch();
    const note = useSelector((state) => state.note.currentNote);
    return(
    <div>
        <Box sx={{mt:1}} display="flex" justifyContent={"space-between"} alignItems="center" flexDirection={"column"} minHeight="15vh">
            <Typography fontSize={24}>Are you sure to delete note?</Typography>
            <Grid container xs={12}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Box  display="flex" justifyContent={"space-between"} alignItems="space-between">
                        <Button variant="contained" color="primary" onClick={() => dispatch(deleteNote(note)).then(dispatch(closeModal())).then(console.log(note))}>Yes</Button>
                        <Button variant="contained" color="error" onClick={() => dispatch(closeModal())}>No</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
    )
}

export default NoteDelete;