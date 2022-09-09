import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {error, loading, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const checkAvailability = (thumbnail, name) => {
        if (thumbnail.indexOf('image_not_available') === -1) {
            return <img src={thumbnail} alt={name}/>;
        } else {
            return <img src={thumbnail} style={{objectFit: 'contain'}} alt={name} className="randomchar__img"/>
        }
    }

    const sceleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} checkAvailability={checkAvailability}/> : null;

    return (
        <div className="char__info">
            {sceleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char, checkAvailability}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let {comics} = char
    if (comics.length > 9) {
        comics = comics.slice(0, 9);
    }

    return (
        <>
            <div className="char__basics">
                {checkAvailability(thumbnail, name)}
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            {comics.length > 0 ? null : "There is no comics with this character"}

                {
                    comics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;