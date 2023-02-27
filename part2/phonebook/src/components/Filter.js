const Filter = ({handleChange}) => {
    return(
        <div>
        Filter shown with:
        <input type="text" onChange={handleChange} />
      </div>
    )
}
export default Filter