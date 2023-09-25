export function PaginationBar({ toysPerPage, toysLength, onSetPage, currPage }) {
    const pageIndexes = []

    for (let i = 1; i <= Math.ceil(toysLength / toysPerPage); i++) {
        pageIndexes.push(i)
    }


    return (
        <nav className="pagination-nav">
            <ul className="page-bar">
                {pageIndexes.map(pageNum => <li className={`page-idx ${pageNum === currPage ? 'selected' : ''}`} key={pageNum} onClick={() => { onSetPage(pageNum) }}>{pageNum}</li>)}
            </ul>
        </nav>
    )
}
