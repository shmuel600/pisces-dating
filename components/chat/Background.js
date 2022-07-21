export default function Background({ user, fullHeight }) {
    return (
        <div
            style={{
                position: 'fixed',
                marginLeft: '-1rem',
                width: '100%',
                height: `${fullHeight * 1.2}px`,
                background: `url(${user.chatBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: '50%'
            }}
        >
        </div>
    )
}