export function MsgPreview({ msg }) {
    const { txt, by } = msg

    return (
        <>
            <h4>{txt}</h4>
            <h5>By: {by.fullname}</h5>
        </>
    )
}