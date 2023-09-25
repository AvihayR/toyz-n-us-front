export function PaginationBar({ toysPerPage, toysLength, onSetPage }) {
    const pageIndexes = []

    for (let i = 1; i <= (toysLength / toysPerPage); i++) {
        pageIndexes.push(i)
    }


    return (
        <nav>
            <ul className="page-bar">
                {pageIndexes.map(pageNum => <li className="page-idx" key={pageNum} onClick={() => { onSetPage(pageNum) }}>{pageNum}</li>)}
            </ul>
        </nav>
    )
}
