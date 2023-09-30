import { MsgPreview } from "./MsgPreview";

export function MsgsList({ msgs }) {
    return (
        msgs.map(msg => <MsgPreview key={msg.id} msg={msg} />)
    )
}