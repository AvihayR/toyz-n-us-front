import { useNavigate } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy, toggleIsDoneToy }) {
    const { title, createdAt, isDone, _id } = toy
    const navigate = useNavigate()

    function handleChange(ev) {
        ev.stopPropagation()
        const { target } = ev

        const field = target.dataset.name
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
        toggleIsDoneToy(toy)
    }

    return (
        <div className={`toy-preview ${toy.isDone ? 'done' : ''}`} onClick={() => navigate(`/toy/${toy._id}`)}>
            <input checked={toy.isDone} type="checkbox" onChange={ev => handleChange(ev)} onClick={ev => ev.stopPropagation()} />
            <h3 className="toy-title">{title}</h3>
            <button onClick={(ev) => {
                ev.stopPropagation()
                onRemoveToy(_id)
            }}>X</button>
        </div>
    )
}