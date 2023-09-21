import { debounce } from "lodash"
import { useRef } from "react"

export function ToyFilter({ onSetFilterBy, filterBy }) {

    onSetFilterBy = useRef(debounce(onSetFilterBy, 500))

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        const filterToSet = { ...filterBy, [field]: value }
        onSetFilterBy.current(filterToSet)
    }

    return (
        <>
            <h3>Filter by:</h3>
            <form className="todo-filter" onChange={handleChange} onSubmit={ev => ev.preventDefault()}>
                <label>
                    <input name="txt" type="text" placeholder="Search via text.." />
                </label>
            </form>
        </>
    )
}