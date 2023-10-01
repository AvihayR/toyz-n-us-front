import { useSelector } from "react-redux";
import { LoginSignup } from "../cmps/LoginSignup";
import { loadReviews } from "../store/actions/toy.action";
import { useEffect, useState } from "react";
import { ReviewList } from "../cmps/ReviewList";
import { ReviewPreview } from "../cmps/ReviewPreview";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function LoginPage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [reviews, setReviews] = useState(null)
    useEffect(() => {
        onloadReviews()
    }, [user])
    async function onloadReviews() {
        try {
            const reviews = await loadReviews({ byUserId: user._id })
            setReviews(reviews)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load reviews')
        }
    }

    return (
        <>
            <LoginSignup />
            {user && <h1>User's reviews:</h1>}
            {user && <ReviewList reviews={reviews} />}
        </>
    )
}