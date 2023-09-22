import { debounce, values } from "lodash"
import { useRef, useState } from "react"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



export function ToyFilter({ onSetFilterBy, filterBy }) {

    const [inStock, setInStock] = useState('');
    const [sortBy, setSortBy] = useState('');
    onSetFilterBy = useRef(debounce(onSetFilterBy, 500))

    function handleChange({ target }) {
        let field = target.name
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

        const filterToSet = { ...filterBy, [field]: value }
        onSetFilterBy.current(filterToSet)

        if (field === 'sortBy') setSortBy(value);
        if (field === 'inStock') setInStock(value);

        console.log(filterToSet)
    }

    return (
        <>
            <form className="toy-filter" onChange={handleChange} onSubmit={ev => ev.preventDefault()}>
                <label>
                    <input name="txt" type="text" placeholder="Search via text.." />
                </label>

                <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
                    <InputLabel id="demo-select-small-label">Filter by stock 📦</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={inStock}
                        name="inStock"
                        onChange={handleChange}
                    >
                        <MenuItem value="none"><em>none</em></MenuItem>
                        <MenuItem value={true}>In stock</MenuItem>
                        <MenuItem value={false}>Out of stock</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort by 📂</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={sortBy}
                        name="sortBy"
                        onChange={handleChange}
                    >
                        <MenuItem value="none"><em>none</em></MenuItem>
                        <MenuItem value="alphabet">Alphabetically</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                    </Select>
                    <FormControlLabel control={<Checkbox name="isDesc" />} label="Descending" />
                </FormControl>
            </form>

        </>
    )
}
