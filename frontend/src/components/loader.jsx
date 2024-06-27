
import Spinner from 'react-bootstrap/Spinner';
const Loader = () => {
    return ( 
        <div>
        <Spinner animation="border" role="status" size="bg" className='p-4 mt-3 fs-5'>
        <span className="visually-hidden">Loading...</span>
        </Spinner>

        </div>
     );
}
 
export default Loader;