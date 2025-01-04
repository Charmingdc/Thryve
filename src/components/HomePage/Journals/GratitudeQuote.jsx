import Loader from '../../Helpers/Loader';

const GratituteQuote = ({quote}) => {
return (
    <div className="gratitude-quote">
        <p> Random gratitude quote </p>
        { quote ? <p> { quote } </p> : <Loader /> }
    </div>
);
}
export default GratituteQuote;
