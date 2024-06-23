export default function partialTP(myPartialTPs, finalTP, lotSize) {
  let partialLotSize;
  let remainingLotSize = lotSize;

  return myPartialTPs.map((partialTP, index) => {
    partialLotSize = remainingLotSize / (finalTP / partialTP);
    remainingLotSize = remainingLotSize - partialLotSize;
    return `TP${index + 1}: ` + parseFloat(partialLotSize).toFixed(2);
  });
}
