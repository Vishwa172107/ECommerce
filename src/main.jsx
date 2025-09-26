import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Pages/Login.jsx';
import { Shop } from './Pages/Shop.jsx';
import { AdminLogin } from './Pages/Admin_Pages/AdminLogin.jsx';
import { AdminDashboard } from './Pages/Admin_Pages/AdminDashboard.jsx';
import { AddProduct } from './Pages/Admin_Pages/AddProduct.jsx';
import { ProductList } from './Pages/Admin_Pages/ProductList.jsx';
import { UpdateProduct } from './Pages/Admin_Pages/UpdateProduct.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { Landing } from './Pages/Landing.jsx';
import { NotFoundPage } from './Pages/ErrorPages/NotFoundPage.jsx';
import { UnauthorizedPage } from './Pages/ErrorPages/UnauthorizedPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Redirect any unknown routes to /404/NotFound */}
                    <Route path="*" element={<Navigate to="/404/NotFound" replace />} />

                    {/* Error Pages */}
                    <Route path="/404/NotFound" element={<NotFoundPage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />

                    {/* Main App Routes */}
                    {/* <Route path="/" element={<Landing />} /> */}
                    <Route path="/" element={<Navigate to="/admin/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dash" element={<Shop />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/add-product" element={<AddProduct />} />
                    <Route path="/admin/products" element={<ProductList />} />
                    <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
                </Routes>
            </Router>
        </AuthProvider>
    </StrictMode>,
)
