import { useEffect, useState } from 'react';
export default function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5550/messages')
            .then(res => res.json())
            .then(data => {
                console.log(messages)
                console.log(data)
                setMessages(data)
            });

    });

    return (

        <div>
            {messages.map(message => (
                <article className="p-4 mb-4 rounded-lg bg-gray-100">
                    <header>
                        <h3 className="mb-1 text-lg font-semibold">{message.author.name}</h3>
                        <time dateTime="..." className="text-sm text-gray-500">...</time>
                    </header>
                    {message.content}
                </article>

                // <div className="bg-white shadow rounded-lg p-4">
                //     {message.content}
                // </div>

            ))}
        </div>
    )
}
