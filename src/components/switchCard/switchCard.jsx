import FlashCard from "../flashCards/flashCards";
import { useState, useRef, useEffect } from "react";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import './switchCard.scss';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Knob } from 'primereact/knob';

export default function SwitchCard({ words }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [count, setCount] = useState(0);
    const [viewedWords, setViewedWords] = useState([]);
    const cardViewed = () => {
        if (!viewedWords.includes(wordIndex)) {
            setCount(count + 1);
            setViewedWords([...viewedWords, wordIndex]);
        }
    }
    const ref = useRef();
    useEffect(() => ref.current.focus(), []);
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
            <div className="card flex justify-content-center">
                <Knob value={count} min={0} max={words.length} valueColor="#4F46E5" rangeColor="#f2f2f2" />
            </div>
            <div className="slider-container">
                <Button icon="pi pi-arrow-left" onClick={previousCard} raised size="normal" />
                <FlashCard word={words[wordIndex]} cardViewed={cardViewed} ref={ref} ></FlashCard>
                <Button icon="pi pi-arrow-right" onClick={nextCard} raised size="normal" />
            </div >
        </>
    )
}