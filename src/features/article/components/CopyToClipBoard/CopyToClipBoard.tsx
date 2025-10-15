import { useEffect, useRef } from "react";

type Props = {
  text: string;
};

// TODO:わかんねえ〜〜〜〜〜〜〜〜；；
const CopyClipBoard = ({ text }: Props) => {
  // copyToClipboard;
  const inputElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      const codeBlocks = inputElement.current.querySelectorAll("pre code");
      codeBlocks.forEach((block: Element) => {
        const htmlBlock = block as HTMLElement;
        const button = document.createElement("button");
        button.textContent = "copy";
        button.onclick = function () {
          navigator.clipboard.writeText(htmlBlock.innerText);
        };

        if (htmlBlock.parentNode) {
          htmlBlock.parentNode.insertBefore(button, htmlBlock);
        }
      });
    }
  });

  console.log(inputElement);
  return (
    <div
      ref={inputElement}
      typeof="code"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

export default CopyClipBoard;
