// import img from '../assets/img/react2.svg'
// import { utilService } from '../services/util.service';
import { StockPieChart } from '../cmps/StockPieChart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.action';

export function HomePage() {

    useEffect(() => {
        loadToys()
            .catch(err => showErrorMsg(err))
    }, [])

    const toys = useSelector((state) => state.toyModule.toys)


    return <section>
        <div>
            {/* <img src={img} /> */}
            <h2>
                Welcome to Toyz-N-Us - Where Imagination Comes to Life!
            </h2>
            <h4>
                Welcome to Toyz-N-Us, your go-to destination for a world of wonder and play! At Toyz-N-Us, we're all about creating moments of joy, sparking imagination, and fostering creativity in kids of all ages.
            </h4>
            <ul>
                <li>
                    🎈 Toys for All Ages: From toddlers to tweens, we have the perfect toys for every stage of childhood.
                </li>
                <li>
                    🚀 Inspire Creativity: Unleash your child's creativity with art supplies, building blocks, and imaginative playsets.
                </li>
                <li>
                    🎯 Family Fun: Elevate family game nights with our board games, card games, and outdoor activities.
                </li>
                <li>
                    🧸 Cuddly Companions: Find lovable stuffed animals and plush toys to be your child's lifelong companions.
                </li>
                <li>
                    🛒 Shop with Confidence: We prioritize safety, ensuring worry-free playtime.

                </li>
            </ul>
            <p>
                Join Our Family

                Join our community for exclusive promotions and parenting tips. Shop in-store or online from the comfort of your home.

                Let's make playtime unforgettable! Toyz-N-Us - Where Imagination Thrives!
            </p>

            <section className="chart-dashboard">
                <StockPieChart toys={toys} />

            </section>


        </div>
    </section>
}



