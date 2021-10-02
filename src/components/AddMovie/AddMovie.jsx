

function AddMovie() {
    return (
        <>
            <h1>Add Movie:</h1>
            <form>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Poster URL" />
                <input type="text" placeholder="movie Description" />
            </form>
        </>
    );
}

export default AddMovie;