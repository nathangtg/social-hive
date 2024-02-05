export default function ChatButton({ targetUser }) {
    const handleChat = async (targetUser) => {
        window.location.href = `http://127.0.0.1:8000/chatify/${targetUser}`;
    };

    return (
        <button
            onClick={() => handleChat(targetUser)}
            className={`justify-center inline-flex items-center px-4 py-2 border rounded-md
            my-2
            font-semibold text-xs uppercase tracking-widest transition ease-in-out
            duration-150 bg-blue-600 text-white border-transparent hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
            Chat this user with Hive Chatify
        </button>
    );
}
