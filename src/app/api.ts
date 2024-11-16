const riverRadarServiceBaseUrl =
  process.env.NEXT_PUBLIC_RIVERRADAR_SERVICE_BASEURL;

const ONE_DAY_IN_SECONDS = 86400;

export async function getRivers() {
  const res = await fetch(`${riverRadarServiceBaseUrl}/api/v1/rivers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRiver(riverId: string): Promise<River> {
  const res = await fetch(
    `${riverRadarServiceBaseUrl}/api/v1/rivers/${riverId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getStateRivers(stateAbbr: string): Promise<River[]> {
  const res = await fetch(
    `${riverRadarServiceBaseUrl}/api/v1/states/${stateAbbr}/rivers`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRiverWaterData(riverId: string): Promise<RiverData> {
  const res = await fetch(
    `${riverRadarServiceBaseUrl}/api/v1/river-data/${riverId}/water?daysAgo=2`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getCurrentRiverWeather(
  riverId: string
): Promise<CurrentRiverWeather> {
  const res = await fetch(
    `${riverRadarServiceBaseUrl}/api/v1/weather/rivers/${riverId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
