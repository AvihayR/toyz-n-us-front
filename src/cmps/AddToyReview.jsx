import { useState } from "react"

export function AddToyReview({ onAddNewReview }) {
    const [reviewToBuild, editReviewToBuild] = useState(null)

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
        editReviewToBuild(prevReview => ({ ...prevReview, [field]: value }))
    }

    return (
        <form className="add-new-review" onChange={handleChange} onSubmit={(ev) => {
            ev.preventDefault()
            // onAddNewMsg(toyId, reviewToBuild)
            onAddNewReview(reviewToBuild)
        }}>
            <label className="user-add-review">
                Review:
                <input type="text" name="txt" placeholder="Add your message here.." required />
            </label>
            <button className="btn send-msg">
                Send review
            </button>
        </form>
    )
}




export function AddMsg({ toyId, loggedUser, onAddNewMsg }) {
}