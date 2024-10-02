import './ContentHomeStyle.css';
import logo from '../../../assets/logo.png';
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ContentHome = () => {
    const [cep, setCep] = useState('');
    const [cobertura, setCobertura] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [open, setOpen] = useState(false);
    const [isCovered, setIsCovered] = useState(false); // Novo estado

    const center = { lat: -23.771174890170474, lng: -46.66763641312844 };
    const radius = 10000;

    const handleCepChange = (e) => {
        setCep(e.target.value);
    };

    const handleSearch = async () => {
        const sanitizedCep = cep.replace(/\D/g, '');
        if (sanitizedCep.length === 8) {
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${sanitizedCep}&key=AIzaSyDAXH565qJxTUlukDvdqcPbSKjAvR3lty4`);
                const { lat, lng } = response.data.results[0].geometry.location;

                setMarkerPosition({ lat, lng });

                const distance = haversineDistance(center, { lat, lng });
                if (distance <= radius) {
                    setCobertura('Área coberta!');
                    setIsCovered(true); // Define que a área está coberta
                } else {
                    setCobertura('Área não coberta.');
                    setIsCovered(false); // Define que a área não está coberta
                }

                handleOpen();
            } catch (error) {
                console.error('Erro ao obter as coordenadas:', error);
                setCobertura('Erro ao verificar área.');
                handleOpen();
            }
        } else {
            setCobertura('Por favor, insira um CEP válido.');
            handleOpen();
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const haversineDistance = (coord1, coord2) => {
        const toRad = (Value) => (Value * Math.PI) / 180;

        const R = 6371;
        const dLat = toRad(coord2.lat - coord1.lat);
        const dLon = toRad(coord2.lng - coord1.lng);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c * 1000;
    };

    return (
        <section className='container'>
            <div className='contentLogo'>
                <img src={logo} alt="Logo" />
            </div>

            <div className="cardsContainer">
            <div className="card">
                    <h3>Frescor Garantido</h3>
                    <p>Nossos ovos são entregues diretamente da granja para a sua mesa, garantindo a melhor qualidade.</p>
                </div>
                <div className="card">
                    <h3>Entrega Rápida</h3>
                    <p>Receba seus ovos fresquinhos em até 24 horas após o pedido!</p>
                </div>
                <div className="card">
                    <h3>Variedade de Produtos</h3>
                    <p>Oferecemos ovos de diferentes tamanhos e tipos para atender todas as suas necessidades.</p>
                </div>
            </div>

            <h1>Verifique sua região:</h1>
            <div className="cepInputContainer">
                <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={handleCepChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>
                    <SearchIcon />
                </button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Resultado da Verificação
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {cobertura}
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div className="mapContainer">
                <LoadScript googleMapsApiKey="AIzaSyDAXH565qJxTUlukDvdqcPbSKjAvR3lty4">
                    <GoogleMap
                        mapContainerStyle={{ height: "400px", width: "100%" }}
                        center={center}
                        zoom={12}
                    >
                        <Marker position={center} />
                        {markerPosition && <Marker position={markerPosition} />}
                        {/* Renderiza o círculo com base no estado isCovered */}
                        {isCovered && (
                            <Circle
                                center={center}
                                radius={radius}
                                options={{
                                    fillColor: 'rgba(255, 255, 0, 0.5)',
                                    strokeColor: 'yellow',
                                    strokeOpacity: 0.4,
                                    strokeWeight: 2,
                                    fillOpacity: 0.2,
                                }}
                            />
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </section>
    );
};

export default ContentHome;
