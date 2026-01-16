import './Button.css';

function Button({className, type, disabled, onClick, children}) {
    return (
            <button className={className}
                    type={type}
                    disabled={disabled}
                    onClick={onClick}>
                {children}
            </button>
    )
}

export default Button;