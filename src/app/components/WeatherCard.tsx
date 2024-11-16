import Image from "next/image";

type Props = {
  temp: number;
  windSpeed: number;
  windGust: number;
  feelsLikeTemp: number;
  cloudiness: number;
  humidity: number;
  weatherDescription: string;
  weatherIcon: string;
};

export const WeatherCard = ({
  windSpeed,
  windGust,
  temp,
  feelsLikeTemp,
  cloudiness,
  humidity,
  weatherDescription,
  weatherIcon,
}: Props) => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 rounded-md p-5 bg-gradient-to-r from-cyan-600/40 to-blue-300/40 px-16">
      <div className="row-span-3 border-e-2 md:pe-16 lg:pe-16 md:me-8 lg:me-8">
        <div className="flex flex-col">
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              width={50}
              height={50}
              alt="Weather"
            />
          </div>
          <div>{weatherDescription}</div>
          <div className="font-bold">{temp} °F</div>
          <div className="text-sm">(Feels like {feelsLikeTemp} °F)</div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="font-bold">{windSpeed} mph</div>
        <div className="text-sm">Wind Speed</div>
      </div>
      <div className="col-span-2">
        <div className="font-bold">{humidity} %</div>
        <div className="text-sm">Humidity</div>
      </div>
      <div className="col-span-2">
        <div className="font-bold">{cloudiness} %</div>
        <div className="text-sm">Clouds</div>
      </div>
    </div>
  );
};
// https://openweathermap.org/img/wn/10d@2x.png
