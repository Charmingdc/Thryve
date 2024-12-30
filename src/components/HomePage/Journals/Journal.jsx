const Journal = () => {
    return (
        <div className="journal">
            <time dateTime="2023-10-10">October 10, 2024 - Tue.</time>
            <div className="journal-content">
                <time dateTime="2023-10-10T10:45:00">10:45am</time>
                <h3>Journal Title</h3>
                <p>Journal Entry</p>
            </div>
        </div>
    );
}
export default Journal;