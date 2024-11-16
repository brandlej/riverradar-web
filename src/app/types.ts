type River = {
  name: string;
  stateAbbr: string;
  siteCode: string;
  uuid: string;
  location: string;
  lat: number;
  long: number;
};

type State = {
  uuid: string;
  name: string;
  abbr: string;
};

type ValueEntry = {
  timestamp: string;
  unit: string;
  value: string;
};

type RiverData = {
  uuid: string;
  name: string;
  flows: ValueEntry[];
};

type MostRecentWeatherCondition = {
  id: string;
  main: string;
  description: string;
  icon: string;
};

type CurrentRiverWeather = {
  uuid: string;
  mostRecentWeatherCondition: MostRecentWeatherCondition;
  temp: number;
  feelsLikeTemp: number;
  windSpeed: number;
  windGust: number;
  humidity: number;
  cloudiness: number;
};

type StateAbbrDict = {
  [key: string]: string;
};
