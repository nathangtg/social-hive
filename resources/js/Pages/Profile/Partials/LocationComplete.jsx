import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import PrimaryButton from "@/Components/PrimaryButton";

function LocationComplete() {
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("");
    const [cityId, setCityId] = useState("");

    const [countriesList, setCountriesList] = useState([]);
    const [statesList, setStatesList] = useState([]);
    const [citiesList, setCitiesList] = useState([]);

    const { data, setData, post } = useForm({
        country: "",
        state: "",
        city: "",
    });

    useEffect(() => {
        GetCountries().then(setCountriesList);
        console.log(countriesList);
    }, []);

    useEffect(() => {
        if (countryId) {
            GetState(countryId).then(setStatesList);
        }
    }, [countryId]);

    useEffect(() => {
        if (stateId) {
            GetCity(countryId, stateId).then(setCitiesList);
        }
    }, [countryId, stateId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("portfolio.addLocation"), {
            // Replace with the actual route
            preserveScroll: true,
            onSuccess: () => {
                // Clear the user_description field on success
                setCityId("city", "");
                setStateId("state", "");
                setCountryId("country", "");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Add your location
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Add a location to help people find you !{" "}
                </p>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-lg font-medium text-gray-900">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        onChange={(e) => {
                            const selectedCountry = countriesList.find(
                                (c) => c.id.toString() === e.target.value
                            );
                            setCountryId(
                                selectedCountry ? selectedCountry.id : ""
                            );
                            setData(
                                "country",
                                selectedCountry ? selectedCountry.name : ""
                            );
                        }}
                        value={countryId}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="">Select Country</option>
                        {countriesList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-lg font-medium text-gray-900">
                        State
                    </label>
                    <select
                        id="state"
                        name="state"
                        onChange={(e) => {
                            const selectedState = statesList.find(
                                (c) => c.id.toString() === e.target.value
                            );
                            setStateId(selectedState ? selectedState.id : "");
                            setData(
                                "state",
                                selectedState ? selectedState.name : ""
                            );
                        }}
                        value={stateId}
                        disabled={!countryId}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="">Select State</option>
                        {statesList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-lg font-medium text-gray-900">
                        City
                    </label>
                    <select
                        name="city"
                        id="city"
                        onChange={(e) => {
                            const selectedCity = citiesList.find(
                                (c) => c.id.toString() === e.target.value
                            );
                            setCityId(selectedCity ? selectedCity.id : "");
                            setData(
                                "city",
                                selectedCity ? selectedCity.name : ""
                            );
                        }}
                        value={cityId}
                        disabled={!stateId}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="">Select City</option>
                        {citiesList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md
                    font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700
                    active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out
                    duration-150 false mt-4"
                    onClick={handleSubmit}
                >
                    Submit Location
                </button>
            </form>
        </div>
    );
}

export default LocationComplete;
