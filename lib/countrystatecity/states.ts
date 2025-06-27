"use server";

async function getStates(country: string) {
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country}/states`,
      {
        headers: { "X-CSCAPI-KEY": process.env.CSC_KEY! },
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch states: ${response.status}`);

    const states = (await response.json()).map(
      (state: { name: string; id: number; iso2: string }) => state.name
    );
    return states;
  } catch (error) {
    console.error("Error fetching states:", error);
    return ["Maharashtra", "Goa", "Madhya Pradesh"];
  }
}

export { getStates };
