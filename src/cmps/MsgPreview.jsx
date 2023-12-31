export function MsgPreview({ msg }) {
    const { txt, by } = msg

    return (
        <article className="msg-preview">
            <h4 className="txt">{txt}</h4>
            <h5 className="by">By: {by.fullname}</h5>
        </article>
    )
}