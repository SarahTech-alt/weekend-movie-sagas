import Dropdown from 'react-bootstrap/Dropdown';

function AddMovie() {
    return (
        <>
            <h1>Add Movie:</h1>
            <form>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Poster URL" />
                <input type="text" placeholder="movie Description" />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </form>
        </>
    );
}

export default AddMovie;