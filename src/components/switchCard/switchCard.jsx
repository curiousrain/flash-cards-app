import FlashCard from "../flashCards/flashCards";
import { useState } from "react";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import './switchCard.scss';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function SwitchCard({ words }) {
    const [wordIndex, setWordIndex] = useState(0);
    const previousCard = () => {
        setWordIndex(wordIndex => {
            if (wordIndex > 0) {
                return wordIndex - 1;
            }
        });
    }
    const nextCard = () => {
        setWordIndex(wordIndex => {
            if (wordIndex < words.length - 1) {
                return wordIndex + 1
            } else {
                showMessage();
                return wordIndex;
            }
        })
    }
    const showMessage = () => {
        confirmDialog({
            message: 'You completed all flash-cards. You wish go through again?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                setWordIndex(0);
            }
        });
    }
    return (
        <>
            <ConfirmDialog />
            <div className="slider-container">
                <Button icon="pi pi-arrow-left" onClick={previousCard} raised size="normal" />
                <FlashCard word={words[wordIndex]}></FlashCard>
                <Button icon="pi pi-arrow-right" onClick={nextCard} raised size="normal" />
            </div >
        </>
    )
}