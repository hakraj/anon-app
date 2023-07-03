
const MatchesFound = (
    { show, matchNo }: {
        show: boolean,
        matchNo: number
    }
) => {
    return (
        <>
            {show &&
                <div className="text-center mx-auto text-xs my-4 w-2/5 sm:my-8 sm:text-sm sm:w-1/4 lg:w-1/5 lg:text-base ">
                    {matchNo === 0 ? <p>No match was found.</p> : <p>{matchNo} match{matchNo !== 1 ? "es were" : " was"} found</p>}
                    <hr className="border-slate-300" />
                </div>
            }
        </>
    )
}

export default MatchesFound;