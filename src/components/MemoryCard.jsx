import { decode } from 'html-entities';

export default function MemoryCard({ handleClick, data }) {
    console.log(data)
    const emojiEl = data.map((emoji) =>
        <li key={emoji.htmlCode} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={handleClick}
            >
                {decode(emoji.htmlCode[0])}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}