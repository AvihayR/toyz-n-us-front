export function ReviewPreview({ review }) {
    console.log(review)
    return (
        <>
            <h6>Review preview</h6>
            <h3>{review.txt}</h3>
            <h4>Review by: {review.byUser.fullname}</h4>
            <small>Review Id: {review._id}</small>
        </>
    )
}