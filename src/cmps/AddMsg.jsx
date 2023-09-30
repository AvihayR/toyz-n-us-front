import { useState } from "react";

export function AddMsg({ toyId, loggedUser, onAddNewMsg }) {

    const [msgToBuild, editMsgToBuild] = useState(null)

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
        editMsgToBuild(prevToy => ({ ...prevToy, [field]: value }))
    }

    return (
        <form action="" onChange={handleChange} onSubmit={(ev) => {
            ev.preventDefault()
            onAddNewMsg(toyId, msgToBuild)
        }}>
            <label className="user-add-msg">
                Your message:
                <input type="text" name="txt" />
            </label>
            <button className="btn send-msg">
                Send
            </button>
            <p>Commenting as {loggedUser.fullname}</p>
        </form>
    )
}