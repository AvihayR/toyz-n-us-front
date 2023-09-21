import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, removeToy }) {

    if (!toys || !toys.length) {
        return <h1 className="no-toys-indication">No toys to show..</h1>
    }

    return (
        toys.map(toy => {
            return <ToyPreview key={toy._id + toy.createdAt}
                toy={toy} onRemoveToy={removeToy}
            />
        })
    )
}