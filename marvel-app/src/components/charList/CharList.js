import { useState, useEffect, useRef } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    let flag = true;
    
    useEffect(() => {
        if (flag) {
            onRequest(offset, true);
            flag = !flag;
        }
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false; 
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderListItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (item.thumbnail.indexOf('image_not_available') === -1) {
                imgStyle = {objectFit: 'unset'};
            }

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li className="char__item"
                        ref={(el) => {itemRefs.current[i] = el}} 
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                        <img src={item.thumbnail} style={imgStyle} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderListItems(charList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button onClick={() => onRequest(offset)} 
                    className="button button__main button__long" 
                    disabled={newItemLoading} 
                    style={{display: charEnded ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;