const Journal = ({journal}) => {
    return (
        <div className="journal">
            <time dateTime="2023-10-10">October 10, 2024 - Tue.</time>
            <div className="journal-content">
                <div>
                    <time dateTime="2023-10-10T10:45:00"> {journal.createdAt} </time>
                <h3> {journal.journalTitle} </h3>
                <p> {journal.journalContent} </p>
                </div>
                
                <div className="journal-image">
                    <img src="https://via.placeholder.com/150" alt="journal" style={{borderRadius: "10px"}}/>
                </div>
            </div>
        </div>
    );
}
export default Journal;
