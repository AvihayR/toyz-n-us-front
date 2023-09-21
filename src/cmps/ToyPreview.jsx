import { useNavigate } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {
    const { name, price, inStock, _id } = toy
    const navigate = useNavigate()

    return (
        <div className={'toy-preview'} onClick={() => navigate(`/toy/${toy._id}`)}>
            <h2 className="toy-name">{name}</h2>
            <h3 className="inStock">{inStock ? 'In stock!' : 'Out of stock'}</h3>
            <h4 className="price">$ {price}</h4>
            <button onClick={(ev) => {
                ev.stopPropagation()
                onRemoveToy(_id)
            }}>X</button>
        </div>
    )
}