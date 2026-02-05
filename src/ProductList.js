function ProductList({ products }) {
  return (
    <>
      <div className="header">
        <a href="/">ningen paper press</a> sells print matters. Take them on a reasonable price.
      </div>

      <div className="collection">
        {products.map((product, index) => {
          const folderName = product["Folder Name"];
          const category = product["Category"];
          const imagePath = `/images/products/${category}/${folderName}/main.webp`;

          return (
            <div key={index} className="item">
              <a href={`/product/${folderName}`}>
                <div className="item-image">
                  <img src={imagePath} alt={product["Product Name"]} />
                </div>
                <div className="item-title">{product["Product Name"]}</div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="footer">
        2025 Ningen Paper Press. Check out our latest news{" "}
        <a
          href="https://www.instagram.com/ningenpaper.press/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ningenpaperpress
        </a>
        .
      </div>
    </>
  );
}

export default ProductList;
