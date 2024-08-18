function ButtonsGroup({ buttons }) {
  return (
    <div className="flex justify-center space-x-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          type={button.type}
          className="px-4 py-2 bg-1F3D75 text-F5E9E0 rounded transition-colors duration-300 ease-in-out hover:bg-F5E9E0 hover:text-1F3D75"
          onClick={button.onClick}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}

export default ButtonsGroup;
