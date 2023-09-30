export function AddMsg({ loggedUser }) {
    function onSendMsg() {

    }
    return (
        <form action="" onSubmit={onSendMsg}>
            <label className="user-add-msg">
                Your message:
                <input type="text" />
            </label>
            <button className="btn send-msg">
                Send
            </button>
            <p>Commenting as {loggedUser.fullname}</p>
        </form>
    )
}