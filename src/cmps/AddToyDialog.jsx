import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel } from '@mui/material';
import { AddBtn } from './AddBtn';
import { useState } from 'react';
import { toyService } from '../services/toy.service';

export function AddToyDialog({ onAddToy }) {
    const [open, setOpen] = useState(false);
    const [toyToBuild, editToy] = useState(toyService.getEmptyToy())

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        editToy(prevToy => ({ ...prevToy, createdAt: Date.now(), [field]: value }))
    }

    return (
        <div className='add-toy-container'>
            <AddBtn handleClickOpen={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    sx={{
                        color: '$toy-red',
                    }}>
                    Add a new toy 🧸
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please enter the required fields and information about your new toy.
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{ style: { color: '$toy-red' } }}
                        // inputProps={{ style: { color: '$toy-blue' } }}
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Toy name"
                        type="txt"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        InputLabelProps={{ style: { color: '$toy-red' } }}
                        // inputProps={{ style: { color: '$toy-blue' } }}
                        margin="dense"
                        id="price"
                        name="price"
                        label="Price in $"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        required
                    />

                    <FormControlLabel control={
                        <Checkbox
                            sx={{
                                color: '$toy-cyan',
                                '&.Mui-checked': {
                                    color: '$toy-cyan',
                                },
                            }}
                            checked={toyToBuild.inStock}
                            onChange={handleChange}
                            name='inStock'
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    } label="Mark in stock?" />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        onAddToy(toyToBuild)
                        handleClose()
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}