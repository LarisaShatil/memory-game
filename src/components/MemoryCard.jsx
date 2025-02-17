import { decode } from 'html-entities';

export default function MemoryCard({ handleClick, data }) {
    // console.log(data)
    const emojiEl = data.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                name={emoji.name}
                onClick={()=>handleClick(emoji.name, index)}
            >
                {decode(emoji.htmlCode[0])}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}