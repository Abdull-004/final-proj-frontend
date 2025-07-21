export default function About() {
    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen pb-16">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-r from-green-800 to-green-500 text-white shadow-xl rounded-b-3xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20" />
                <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">Garissa Agrovet Online Store</h1>
                    <p className="text-2xl font-medium mb-8 max-w-2xl mx-auto drop-shadow">
                        The next-generation digital marketplace for farm inputs, livestock supplies, and expert support in Northern Kenya.
                    </p>
                    <a href="/account" className="inline-block bg-white text-green-700 font-bold px-10 py-4 rounded-xl text-xl shadow-lg hover:bg-green-100 transition">Get Started</a>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🌱</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">All-in-One Agrovet</h3>
                    <p className="text-gray-700">Seeds, fertilizers, animal feeds, vet medicines, and more—curated for quality and value.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🚚</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Fast, Reliable Delivery</h3>
                    <p className="text-gray-700">We reach your farm or home, even in remote areas of Garissa and Northern Kenya.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">💡</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Expert Support</h3>
                    <p className="text-gray-700">Access certified vets and agronomists for advice and after-sales care.</p>
                </div>
            </section>

            {/* Mission, Vision, Values Section */}
            <section className="max-w-5xl mx-auto mt-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-green-600">
                    <h4 className="text-lg font-bold text-green-700 mb-2">Our Mission</h4>
                    <p className="text-gray-700">To make genuine agrovet products accessible, affordable, and convenient for every farmer and agri-entrepreneur in Garissa and beyond.</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-green-600">
                    <h4 className="text-lg font-bold text-green-700 mb-2">Our Vision</h4>
                    <p className="text-gray-700">To be the most trusted, innovative online agrovet in East Africa, driving sustainable growth for rural communities.</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-green-600">
                    <h4 className="text-lg font-bold text-green-700 mb-2">Our Values</h4>
                    <ul className="text-gray-700 space-y-1">
                        <li><b>Integrity</b></li>
                        <li><b>Innovation</b></li>
                        <li><b>Community</b></li>
                        <li><b>Customer Focus</b></li>
                        <li><b>Sustainability</b></li>
                    </ul>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="max-w-3xl mx-auto mt-20 text-center">
                <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-10 shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-2">Ready to Grow?</h2>
                    <p className="text-white mb-4 text-lg">Join Garissa Agrovet and experience the future of agriculture. Register for free to access exclusive offers, track your orders, and get personalized support.</p>
                    <a href="/account" className="inline-block bg-white text-green-700 font-bold px-10 py-4 rounded-xl text-xl shadow-lg hover:bg-green-100 transition">Register Now</a>
                </div>
            </section>
        </div>
    );
} 