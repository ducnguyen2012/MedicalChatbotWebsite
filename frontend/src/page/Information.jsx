import React from "react";
import "../CSS/Information.css";

const Information = () => {
  return (
    <div className="info-container">
      <div className="product-image">
        <img
          src={require('./aquadio.png')} 
          alt="Product"
        />
      </div>
      <div className="product-details">
        <h2 className="product-price">25.000đ / Lon</h2>
        <div className="button-group">
          <button className="active">Lon</button>
          <button>Vi</button>
          <button>Viên</button>
        </div>
        <table className="product-table">
          <tbody>
            <tr>
              <td><strong>Danh mục:</strong></td>
              <td>Thực phẩm chức năng</td>
            </tr>
            <tr>
              <td><strong>Dạng bào chế:</strong></td>
              <td>Uống trực tiếp</td>
            </tr>
            <tr>
              <td><strong>Quy cách:</strong></td>
              <td>350ml/Hộp</td>
            </tr>
            <tr>
              <td><strong>Thành phần:</strong></td>
              <td>Hoài sơn, Đẳng sâm, Bạch truật, Phục linh, Cỏ ngọt, Đương quy, Vitamin C</td>
            </tr>
            <tr>
              <td><strong>Chỉ định:</strong></td>
              <td>Người bị suy nhược cơ thể, thường mệt mỏi, chán ăn, vừa ốm dậy, người gặp vấn đề tiêu hóa, người thiếu máu, mất ngủ, căng thẳng lo âu,...</td>
            </tr>
            <tr>
              <td><strong>Chống chỉ định:</strong></td>
              <td>Người có dị ứng với thành phần của sản phẩm, phụ nữ mang thai.</td>
            </tr>
            <tr>
              <td><strong>Nhà sản xuất:</strong></td>
              <td>HerbInnovate</td>
            </tr>
            <tr>
              <td><strong>Nước sản xuất:</strong></td>
              <td>Việt Nam</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Information;
