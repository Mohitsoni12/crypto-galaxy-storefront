
interface TrialFrameProps {
  title: string;
  trialUrl: string;
}

const TrialFrame = ({ title, trialUrl }: TrialFrameProps) => {
  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-xl border border-primary/20" style={{ height: "70vh" }}>
      <iframe
        src={trialUrl}
        title={`${title} Trial`}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
};

export default TrialFrame;
