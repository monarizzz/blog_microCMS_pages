type Props = {
  text: string;
};

const CopyClipBoard = ({ text }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

export default CopyClipBoard;
