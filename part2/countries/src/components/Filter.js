const Filter = ({handleChange}) => {
    return(
        <div>
        Find countries:
        <input type="text" onChange={handleChange} />
      </div>
    )
}
export default Filter