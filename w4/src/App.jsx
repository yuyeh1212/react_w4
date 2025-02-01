// src/App.jsx
import { useEffect } from "react";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ProductModal from "./components/ProductModal";
import LoginForm from "./components/LoginForm";
import useAuth from "./hooks/useAuth";
import useProducts from "./hooks/useProducts";
import "./style/login.scss";

function App() {
  const { account, setAccount, isAuth, setIsAuth, checkLogin, handleLogin } =
    useAuth();
  const {
    products,
    pagination,
    modalProduct,
    fetchProducts,
    addProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    setModalProduct,
  } = useProducts();

  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (isLoggedIn) fetchProducts(1);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {isAuth ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-12">
              <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onAddProduct={addProduct}
              />
              <Pagination
                pagination={pagination}
                onPageChange={fetchProducts}
              />
            </div>
          </div>
          {modalProduct && (
            <ProductModal
              product={modalProduct}
              isEditMode={!!modalProduct.id}
              onClose={() => setModalProduct(null)}
              onInputChange={(e) => {
                const { name, value } = e.target;
                setModalProduct((prev) => ({
                  ...prev,
                  [name]:
                    name === "origin_price" || name === "price"
                      ? Number(value)
                      : value,
                }));
              }}
              onSubmit={handleSubmitProduct}
            />
          )}
        </div>
      ) : (
        <LoginForm
          account={account}
          onInputChange={handleInputChange}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;
