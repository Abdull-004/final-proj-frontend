function Footer() {
    return (
        <footer className="mt-16 bg-green-800 text-white py-8 text-center rounded-t-3xl shadow-inner">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-2 font-bold text-lg">Farmcare Agrovet Online Store</div>
                <div className="mb-2">Empowering farmers and communities in Northern Kenya</div>
                <div className="text-sm text-green-100">&copy; {new Date().getFullYear()} Farmcare Agrovet. All rights reserved.</div>
            </div>
        </footer>
    );
}

export default function Services() {
    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen pb-16">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 to-green-400 text-white shadow-xl rounded-b-3xl">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Our Services</h1>
                    <p className="text-xl font-medium mb-6 max-w-2xl mx-auto drop-shadow">
                        More than products—Farmcare Agrovet delivers value-added services to help you grow, learn, and thrive in agriculture and livestock management.
                    </p>
                </div>
            </section>

            {/* Services Feature Cards */}
            <section className="max-w-5xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🧑‍🌾</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Farm Advisory</h3>
                    <p className="text-gray-700">Personalized guidance on crop selection, pest management, and best practices.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🧪</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Soil Testing</h3>
                    <p className="text-gray-700">Accurate soil analysis and fertilizer recommendations for better yields.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🐄</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Animal Health Clinics</h3>
                    <p className="text-gray-700">On-site and virtual vet consultations, vaccination drives, and disease prevention.</p>
                </div>
            </section>
            <section className="max-w-5xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🎓</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Training & Workshops</h3>
                    <p className="text-gray-700">Capacity building for farmers, youth, and women’s groups on modern agri-techniques.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <span className="text-4xl mb-3">🤝</span>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Community Events</h3>
                    <p className="text-gray-700">Field days, demo plots, and networking for local agri-entrepreneurs.</p>
                </div>
            </section>
            {/* Call to Action Section */}
            <section className="max-w-3xl mx-auto mt-20 text-center">
                <div className="bg-green-700 rounded-2xl p-10 shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-2">Book a Service or Learn More</h2>
                    <p className="text-white mb-4 text-lg">Contact us to schedule a service, join a workshop, or get expert advice for your farm or business.</p>
                    <a href="/contact" className="inline-block bg-white text-green-700 font-bold px-10 py-4 rounded-xl text-xl shadow-lg hover:bg-green-100 transition">Contact Us</a>
                </div>
            </section>
            <Footer />
        </div>
    );
} 