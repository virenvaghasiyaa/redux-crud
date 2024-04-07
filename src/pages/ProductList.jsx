// ProductList.js
import { Button, Form, Modal, Table } from "react-bootstrap";
import {
  addProduct,
  deleteProduct,
  editProduct,
  filterProducts,
} from "../features/product/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import AlertModal from "../components/AlertModal";
import Pagination from "../components/Pagination";

const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productFormData, setProductFormData] = useState({
    productName: "",
    qty: 1,
    shortDescription: "",
    productDescription: "",
    productReference: [],
    productDate: "",
    variants: { size: "", color: "" },
  });
  const [isMode, setIsMode] = useState("");
  const [validated, setValidated] = useState(false);
  const [filterIsValid, setFilterIsValid] = useState(false);
  const [filterModalShow, setFilterModalShow] = useState(false);
  const [filterDates, setFilterDates] = useState({
    fromDate: "",
    toDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const perPageItem = 5;

  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products?.products);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination
  const indexOfLastEmployee = currentPage * perPageItem;
  const indexOfFirstEmployee = indexOfLastEmployee - perPageItem;

  const paginatedProducts = products.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  console.log("products", products, paginatedProducts);

  const handleCloseModal = () => {
    setIsMode("");
    setShowModal(false);
  };

  const handleShowModal = () => {
    setIsMode("add");
    setShowModal(true);
    setProductFormData({
      productName: "",
      qty: 1,
      shortDescription: "",
      productDescription: "",
      productReference: [],
      variants: { size: "", color: "" },
      productDate: "",
    });
  };

  const handleDelete = (skuId) => {
    setProductIdToDelete(skuId);
    setShowDeleteConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(productIdToDelete));
    setShowDeleteConfirmationModal(false);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleEdit = (product) => {
    setIsMode("edit");
    setShowModal(true);
    setProductFormData(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({
      ...productFormData,
      [name]: value,
    });
  };

  const handleReactSelectChange = (selectedOptions) => {
    setProductFormData({
      ...productFormData,
      productReference: selectedOptions,
    });
  };

  const handleVariantsChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({
      ...productFormData,
      variants: {
        ...productFormData.variants,
        [name]: value,
      },
    });
  };

  const handleFilterReset = () => {
    setFilterDates({
      fromDate: "",
      toDate: "",
    });
  };

  const handleFilterModalClose = () => {
    setFilterModalShow(false);
  };

  const handleFilterModalShow = () => {
    setFilterModalShow(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterDates((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFilterApply = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setFilterIsValid(true);
      e.stopPropagation();
      return;
    }
    dispatch(
      filterProducts({
        fromDate: filterDates.fromDate,
        toDate: filterDates.toDate,
      })
    );
    setFilterModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
      return;
    }

    if (isMode === "add") {
      dispatch(addProduct(productFormData));
    } else if (isMode === "edit") {
      dispatch(
        editProduct({
          skuId: productFormData.sku_id,
          updateProduct: productFormData,
        })
      );
    }
    handleCloseModal();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleFilterModalShow}>
        Filter
      </Button>
      <Button variant="primary" onClick={handleShowModal}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SKU ID</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Short Description</th>
            <th>Product Description</th>
            <th>Product Date</th>
            <th>Product Reference</th>
            <th>Variants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts?.length !== 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product.sku_id}>
                <td>{product.sku_id}</td>
                <td>{product.productName}</td>
                <td>{product.qty}</td>
                <td>{product.shortDescription}</td>
                <td>{product.productDescription}</td>
                <td>
                  {new Date(product.productDate).toISOString().split("T")[0]}
                </td>
                <td>{product.productReference.map((i) => i.value)}</td>
                <td>
                  {product.variants.color} {product.variants.size}
                </td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.sku_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No data found!</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination
        perPageItem={perPageItem}
        totalItems={products.length}
        paginate={paginate}
      />

      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        productFormData={productFormData}
        handleInputChange={handleInputChange}
        handleReactSelectChange={handleReactSelectChange}
        handleVariantsChange={handleVariantsChange}
        handleSubmit={handleSubmit}
        isMode={isMode}
        validated={validated}
      />

      <AlertModal
        show={showDeleteConfirmationModal}
        handleClose={handleCloseDeleteConfirmationModal}
        handleConfirmDelete={handleConfirmDelete}
      />

      {/* Filter Modal */}
      <Modal show={filterModalShow} onHide={handleFilterModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={filterIsValid}
            onSubmit={handleFilterApply}
          >
            <Form.Group controlId="fromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                name="fromDate"
                value={filterDates.fromDate}
                onChange={handleFilterChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the from date!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="toDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                value={filterDates.toDate}
                onChange={handleFilterChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the to date!
              </Form.Control.Feedback>
            </Form.Group>
            <div className="mt-3">
              <Button variant="secondary" onClick={handleFilterReset} className="me-2">
                Reset
              </Button>
              <Button type="submit" variant="primary">
                Apply
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductList;
