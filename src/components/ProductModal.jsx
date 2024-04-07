// ProductModal.js
import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import PropTypes from "prop-types";
// import { Editor } from "@tinymce/tinymce-react";

const ProductModal = ({
  show,
  handleClose,
  productFormData,
  handleInputChange,
  handleReactSelectChange,
  handleVariantsChange,
  handleSubmit,
  isMode,
  validated,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isMode === "add" ? "Add" : isMode === "edit" ? "Edit" : null} Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={productFormData.productName}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter the name!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="qty">
            <Form.Label>Qty</Form.Label>
            <Form.Control
              type="number"
              name="qty"
              value={productFormData.qty}
              onChange={handleInputChange}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group controlId="shortDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              name="shortDescription"
              placeholder="Enter short description"
              value={productFormData.shortDescription}
              onChange={handleInputChange}
              maxLength="30"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter the short description!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              name="productDescription"
              placeholder="Enter product description"
              value={productFormData.productDescription}
              onChange={handleInputChange}
              required
            />
            {/* <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <button onClick={log}>Log editor content</button> */}
            <Form.Control.Feedback type="invalid">
              Please enter the product description!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productReference">
            <Form.Label>Product Reference</Form.Label>
            <Select
              isMulti
              name="productReference"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
              ]}
              value={productFormData.productReference}
              onChange={handleReactSelectChange}
            />
          </Form.Group>

          <Form.Label>Variants</Form.Label>
          <Form.Group controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              as="select"
              name="size"
              value={productFormData.variants.size}
              onChange={handleVariantsChange}
              required
            >
              <option value="">Select size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please enter the name!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Colors</Form.Label>
            <Form.Control
              as="select"
              name="color"
              value={productFormData.variants.color}
              onChange={handleVariantsChange}
              required
            >
              <option value="">Select color</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
              <option value="pink">Pink</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please enter the name!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productDate">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="date"
              name="productDate"
              min={new Date().toISOString().split("T")[0]}
              placeholder="Enter product date"
              value={
                productFormData.productDate
                  ? new Date(productFormData.productDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter the product date!
            </Form.Control.Feedback>
          </Form.Group>
          {/* buttons */}
          <div className="mt-3">
            <Button
              variant="secondary"
              type="button"
              className="me-2"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;

ProductModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  productFormData: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleReactSelectChange: PropTypes.func,
  handleVariantsChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isMode: PropTypes.string,
  validated: PropTypes.bool,
};
