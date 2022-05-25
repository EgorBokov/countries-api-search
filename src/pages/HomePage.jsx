import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { Card } from '../components/Card';
import { ALL_COUNTRIES } from '../config';
import { useNavigate } from 'react-router-dom';

export const HomePage = ({ countries, setCountries }) => {
    const [filteredCountry, setFilteredCountry] = useState(countries);

    const handleSearch = (search, region) => {
        let data = [...countries];

        if (region) {
            data = data.filter(c => c.region.includes(region));
        }

        if (search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredCountry(data);
    }

    const push = useNavigate();

    useEffect(() => {
        if (!countries.length) {
            axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data));
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        handleSearch();
        //eslint-disable-next-line
    }, [countries]);

    return (
        <>
            <Controls onSearch={handleSearch}/>
            <List>
                {
                    filteredCountry.map(c => {
                        const countryInfo = {
                            img: c.flags.png,
                            name: c.name,
                            info: [
                                {
                                    title: 'Population',
                                    description: c.population.toLocaleString()
                                },
                                {
                                    title: 'Region',
                                    description: c.region
                                },
                                {
                                    title: 'Capital',
                                    description: c.capital
                                }
                            ]
                        };

                        return (
                            <Card key={c.name} onClick={() => push(`/country/${c.name}`)} {...countryInfo} />
                        )
                    })
                }
            </List>
        </>
    )
}