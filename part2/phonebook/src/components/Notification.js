const Notification = ({ message, notificationStyle }) => {


    const success = {
        color: 'green',
        background: 'rgb(216, 236, 216)',
        fontSize: '20px',
        border: '1px solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        textTransform: 'uppercase',
        fontFamily: 'sans-serif'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle ? success : { ...success, color: 'red', background: 'rgb(255 193 193)' }}>
            {message}
        </div>
    )
}

export default Notification

