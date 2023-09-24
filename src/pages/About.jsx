import { GoogleMap } from "./GoogleMap"
export function About() {

    return (
        <section className="about">
            <h1 className="logo">About-<span>N</span>-Us</h1>
            <h5>Not just an ordinary toy store</h5>
            <p>With branches in Tel Aviv, Israel, and Crete, Greece, we're your go-to toy store for joy and play.</p>
            <p>
                At Toyz-N-Us, we're all about sparking imaginations and spreading smiles. Our handpicked selection of toys, games, and gifts promises endless adventures for kids of all ages. <br />
                Our friendly team is here to assist you in finding the perfect toy and creating cherished memories.
            </p>
            <GoogleMap />
        </section>
    )
}