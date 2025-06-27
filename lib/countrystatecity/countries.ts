"use server";

async function getCountries() {
  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: { "X-CSCAPI-KEY": process.env.CSC_KEY! },
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch states: ${response.status}`);

    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error("Error fetching states:", error);
    return ["India", "USA", "China"];
  }
}

export { getCountries };
