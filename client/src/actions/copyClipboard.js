export function handleCopyClipboard(content) {
  // setCopyTooltip("Copied!");
  console.log(content);

  navigator.clipboard
    .writeText(content)
    .then(() => {
      console.log("Copied to clipboard");
      // setTimeout(() => {
      //     setCopyTooltip("Copy");
      // }, 2000);
    })
    .catch((error) => {
      console.error("Failed to copy: ", error);
    });
}
