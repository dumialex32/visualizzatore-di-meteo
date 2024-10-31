import hpLogo from "../../assets/hp-logo.png";

const HomeScreen: React.FC = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="grid grid-cols-2 gap-14 max-h-96 shadow-md p-4">
        <div className="flex flex-col gap-6 max-w-96">
          <h1 className="text-4xl font-bold">
            Benvenuto nell'app <span className="text-main-color">VizMeteo</span>
            !
          </h1>
          <p className="text-md">
            Cerca facilmente le previsioni meteo per le città che preferisci,
            salva le tue località preferite e ottieni aggiornamenti in tempo
            reale su temperatura, umidità, velocità del vento e condizioni
            atmosferiche, per le prossime 24 ore.
          </p>
        </div>

        <div className="justify-self-start">
          <img src={hpLogo} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
