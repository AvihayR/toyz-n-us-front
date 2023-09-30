import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, isAdmin }) {

    if (!toys || !toys.length) {
        return <h1 className="no-toys-indication">No toys to show..</h1>
    }

    return (
        <section className="toy-list">
            {toys.map(toy => {
                return <ToyPreview key={toy._id + toy.createdAt}
                    toy={toy} onRemoveToy={onRemoveToy} isAdmin={isAdmin}
                />
            })}
        </section>
    )
}