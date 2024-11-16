// Default entry if there are no given flows
const NO_FLOW_ENTRIES = {
  timestamp: new Date().toUTCString(),
  unit: "cfs",
  value: "0",
};

export const getLatestRiverFlow = (flows: ValueEntry[]): ValueEntry =>
  flows[flows.length - 1] || NO_FLOW_ENTRIES;

export const formatNumber = (number: string): number =>
  Math.round(parseFloat(number));

export const constructPrismicRiverDetailUuid = (
  riverName: string,
  location: string
) => {
  const format = (v: string) => v.toLowerCase().trim().split(" ").join("-");
  return `${format(riverName)}-${format(location)}`;
};
