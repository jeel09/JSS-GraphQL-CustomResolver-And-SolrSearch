import { ImageField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';

type CardFields = {
    fields: {
        Heading: TextField;
        Description: TextField;
        Image: ImageField;
    }
};

type CardListFields = {
    fields: {
        CardList: CardFields[];
    };
};

const Modal = ({ card, isOpen, onClose }: { card: CardFields | null, isOpen: boolean, onClose: () => void }) => {
    const modalClass = isOpen ? 'modal-open' : 'modal-closed';

    if (!card) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }} className={`modal ${modalClass}`}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '100%'
            }} className="content">
                <button onClick={onClose} style={{
                    float: 'right',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '1.5em'
                }}>Close</button>
                {card.fields.Image.value && <img src={card.fields.Image.value.src} alt="#" style={{
                    width: '100%',
                    height: 'auto',
                    marginBottom: '15px'
                }} />}
                <h4><Text field={card.fields.Heading} /></h4>
                <p><Text field={card.fields.Description} /></p>
            </div>
        </div>
    );
};

const Card = (props: CardListFields) => {
    const { fields } = props;
    const [selectedCard, setSelectedCard] = useState<CardFields | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (card: CardFields) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="doctors p-2">
            <div className="container">
                <div className="row">
                    {fields.CardList.map((card, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                            <button className="single-doctor" onClick={() => handleCardClick(card)}>
                                <div className="image">
                                    {card.fields.Image.value && <img src={card.fields.Image.value.src} alt="#" />}
                                </div>
                                <div className="content">
                                    <h4><Text field={card.fields.Heading} /></h4>
                                    <p><Text field={card.fields.Description} /></p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Modal card={selectedCard!} isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
};

export default Card;