import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect , useState } from 'react';
import {IoArrowBack, IoHomeOutline } from 'react-icons/io5';
import { serachByCountry } from '../config';
import { Button } from '../components/Button';
import { Info } from '../components/Info';
import styled from 'styled-components';

export const Details = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(serachByCountry(name)).then(({data}) => setCountry(data[0]));
    }, [name]);

    const Wrapper = styled.div`
      display: flex;
      gap: 1.5rem;
    `;

    return (
        <div>
            <Wrapper>
                <Button onClick={() => navigate('/')}>
                    <IoHomeOutline /> Home
                </Button>
                <Button onClick={() => navigate(-1)}>
                    <IoArrowBack /> Back
                </Button>
            </Wrapper>
            {country && <Info push={navigate} {...country} />}
        </div>
    )
}