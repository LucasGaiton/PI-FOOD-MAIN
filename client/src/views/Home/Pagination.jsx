export default function Pagination({ totalPosts, changePage}) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / 9); i++) {
        pageNumbers.push(i)
    }
    return (
        <>
            {pageNumbers.map((num,index) =><button key={index} onClick={()=>{changePage(num)}}>{num}</button>)}
        </>
    )





}