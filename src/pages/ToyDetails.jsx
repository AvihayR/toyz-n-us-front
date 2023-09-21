import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    const { name, price, inStock, createdAt, labels, _id, } = toy
    return (
        <section className="toy-details">
            <h2>{name}</h2>
            <h3>${price}</h3>
            <h3>{inStock ? 'In stock!' : 'Currently not in stock.'}</h3>
            <h4>Created at: {new Date(createdAt).toUTCString()}</h4>
            <h4>Labels: {labels.join(', ')}</h4>
            <h5>Toy id: {_id}</h5>
            <Link to="/toy">Back</Link>
        </section>
    )
}

export function CarDetails() {
    // const [car, setCar] = useState(null)
    // const { carId } = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     loadCar()
    // }, [carId])

    // function loadCar() {
    //     toyService.getById(carId)
    //         .then((car) => setCar(car))
    //         .catch((err) => {
    //             console.log('Had issues in car details', err)
    //             showErrorMsg('Cannot load car')
    //             navigate('/car')
    //         })
    // }

    if (!car) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Car vendor : {car.vendor}</h1>
            <h5>Price: ${car.price}</h5>
            <p>⛐</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/car">Back</Link>
        </section>
    )
}

