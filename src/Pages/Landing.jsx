export const Landing = () => {
    return <>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-4xl text-center">
                <h1 className="text-4xl font-bold mb-6 text-blue-700">Welcome to Our Store!</h1>
                <p className="text-gray-700 mb-8">
                    Discover a wide range of products at unbeatable prices. Whether you're looking for the latest gadgets, stylish apparel, or home essentials, we've got you covered.
                </p>
                <a href="/dash" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
                    Explore Products
                </a>
            </div>
        </div>
    </>
}