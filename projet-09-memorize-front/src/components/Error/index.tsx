const Error = () => {
  return (
    <div className="box-content flex flex-col items-center  justify-center">
      <h2 className=" pt-5 text-xl ">Page introuvable</h2>
      <p className=" py-8 ">
        Retour à la page d'
        <a href="/" className="underline ">
          accueil
        </a>
      </p>
    </div>
  );
};

export default Error;
