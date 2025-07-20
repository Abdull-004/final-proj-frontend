import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { apiRequest } from './api';
import { useAuth } from './AuthContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Messaging() {
    const { user, token } = useAuth();
    const query = useQuery();
    const withUser = query.get('with');
    const product = query.get('product');
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        // eslint-disable-next-line
    }, [withUser, product]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchMessages = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest(`/messages?withUser=${withUser}&product=${product}`, 'GET', null, token);
            setMessages(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleSend = async e => {
        e.preventDefault();
        if (!content.trim()) return;
        setSending(true);
        try {
            await apiRequest('/messages', 'POST', { receiver: withUser, product, content }, token);
            setContent('');
            fetchMessages();
        } catch (err) {
            setError(err.message);
        }
        setSending(false);
    };

    if (!user) return <div className="text-center py-8">Please log in to use messaging.</div>;

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6 flex flex-col h-[70vh]">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            {loading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="text-center text-red-600 py-2">{error}</div>}
            <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded p-2">
                {messages.map(msg => (
                    <div key={msg._id} className={`mb-2 flex ${msg.sender._id === user.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.sender._id === user.id ? 'bg-green-100 text-green-900' : 'bg-gray-200 text-gray-900'}`}>
                            <div className="text-xs font-semibold mb-1">{msg.sender._id === user.id ? 'You' : msg.sender.name}</div>
                            <div>{msg.content}</div>
                            <div className="text-[10px] text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Type a message..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    disabled={sending}
                />
                <button
                    type="submit"
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 disabled:opacity-50"
                    disabled={sending}
                >
                    Send
                </button>
            </form>
        </div>
    );
} 