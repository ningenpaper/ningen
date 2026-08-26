import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useCart } from "./CartContext";
import "./ShoppingCart.css";

const countries = [
  { code: "", name: "select country" },
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "Åland Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia (Plurinational State of)" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "BQ", name: "Caribbean Netherlands" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini (Swaziland)" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and Mcdonald Islands" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, North" },
  { code: "KR", name: "Korea, South" },
  { code: "XK", name: "Kosovo" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MK", name: "Macedonia North" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar (Burma)" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "AN", name: "Netherlands Antilles" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn Islands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Reunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthelemy" },
  { code: "SH", name: "Saint Helena" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "CS", name: "Serbia and Montenegro" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey (Türkiye)" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UM", name: "U.S. Outlying Islands" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VA", name: "Vatican City Holy See" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const CountrySelect = ({ value, onChange, error }) => (
  <div className="input-wrapper">
    <select
      className={`form-input full-width ${error ? "input-error" : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code} disabled={country.code === ""}>
          {country.name}
        </option>
      ))}
    </select>
  </div>
);

const FormInput = ({ type = "text", placeholder, value, onChange, error }) => (
  <div className="input-wrapper">
    <input
      type={type}
      className={`form-input full-width ${error ? "input-error" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <span className="error-message">This is a required field.</span>}
  </div>
);

function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingForm, setShippingForm] = useState({
    country: "",
    company: "",
    firstname: "",
    surname: "",
    street: "",
    addressSuffix: "",
    province: "",
    zipcode: "",
    city: "",
    vat: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleShippingChange = (field, value) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shippingForm.firstname.trim()) newErrors.firstname = true;
    if (!shippingForm.surname.trim()) newErrors.surname = true;
    if (!shippingForm.street.trim()) newErrors.street = true;
    if (!shippingForm.zipcode.trim()) newErrors.zipcode = true;
    if (!shippingForm.city.trim()) newErrors.city = true;
    if (!shippingForm.email.trim()) newErrors.email = true;
    if (!shippingForm.phone.trim()) newErrors.phone = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSending(true);
    setSendStatus(null);

    // Build order details
    const orderItems = cartItems
      .map(
        (item) =>
          `- ${item.name} (${item.language}) x${item.quantity} = $${item.price * item.quantity}`
      )
      .join("\n");

    const shippingCountry = countries.find((c) => c.code === shippingForm.country)?.name || "";

    const shippingAddress = `
Country: ${shippingCountry}
Company: ${shippingForm.company}
Name: ${shippingForm.firstname} ${shippingForm.surname}
Street: ${shippingForm.street}
Address suffix: ${shippingForm.addressSuffix}
Province/State: ${shippingForm.province}
Zipcode: ${shippingForm.zipcode}
City: ${shippingForm.city}
VAT: ${shippingForm.vat}
Email: ${shippingForm.email}
Phone: ${shippingForm.phone}`.trim();

    const orderTable = cartItems
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px;border-bottom:1px solid #ddd">${item.name}</td>
            <td style="padding:8px;border-bottom:1px solid #ddd">${item.language || "N/A"}</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;text-align:center">${item.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">$${item.price * item.quantity}</td>
          </tr>`
      )
      .join("");

    const message = `
      <h2 style="border-bottom:2px solid #000;padding-bottom:8px">Order Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr style="background:#f5f5f5">
          <th style="padding:8px;text-align:left;border-bottom:2px solid #000">Product</th>
          <th style="padding:8px;text-align:left;border-bottom:2px solid #000">Language</th>
          <th style="padding:8px;text-align:center;border-bottom:2px solid #000">Qty</th>
          <th style="padding:8px;text-align:right;border-bottom:2px solid #000">Price</th>
        </tr>
        ${orderTable}
        <tr>
          <td colspan="3" style="padding:8px;text-align:right;font-weight:bold">Subtotal</td>
          <td style="padding:8px;text-align:right;font-weight:bold">$${subtotal}</td>
        </tr>
      </table>

      <h2 style="border-bottom:2px solid #000;padding-bottom:8px">Shipping Address</h2>
      <table style="margin-bottom:24px">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Country:</td><td>${shippingCountry}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Company:</td><td>${shippingForm.company || "-"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Name:</td><td>${shippingForm.firstname} ${shippingForm.surname}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Street:</td><td>${shippingForm.street}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Address suffix:</td><td>${shippingForm.addressSuffix || "-"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Province/State:</td><td>${shippingForm.province || "-"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Zipcode:</td><td>${shippingForm.zipcode}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">City:</td><td>${shippingForm.city}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">VAT:</td><td>${shippingForm.vat || "-"}</td></tr>
      </table>

      <h2 style="border-bottom:2px solid #000;padding-bottom:8px">Contact</h2>
      <table style="margin-bottom:24px">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Email:</td><td>${shippingForm.email}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Phone:</td><td>${shippingForm.phone || "-"}</td></tr>
      </table>

    `;

    const templateParams = {
      to_email: "ningenpaperpress@gmail.com",
      from_name: `${shippingForm.firstname} ${shippingForm.surname}`,
      from_email: shippingForm.email,
      message: message,
    };

    try {
      await emailjs.send(
        "service_auvt6xp",
        "template_zu3oc0h",
        templateParams,
        "BuyCXk9xX2tRB9w-2"
      );
      const orderData = [...cartItems];
      const orderTotal = subtotal;
      clearCart();
      navigate("/order-success", { state: { orderItems: orderData, subtotal: orderTotal } });
    } catch (error) {
      console.error("Email send error:", error);
      setSendStatus(error?.text || error?.message || "Unknown error");
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="header">
        <Link to="/prints">ningen paper press</Link> has{" "}
        <Link to="/cart">a shopping cart</Link>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>PRODUCTS</th>
                  <th>LANGUAGE</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug}>
                    <td className="product-cell">
                      <div className="product-image">
                        <img
                          src={item.mainImage}
                          alt={item.name}
                        />
                      </div>
                      <div className="product-name">{item.name}</div>
                    </td>
                    <td className="language-cell">{item.language}</td>
                    <td className="quantity-cell">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.slug, parseInt(e.target.value))
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="price-cell">
                      <div className="price">${item.price * item.quantity}</div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.slug)}
                      >
                        - Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
            </div>

            <div className="shipping-section">
              <h2 className="section-title">Shipping address</h2>

              <div className="form-label">ADDRESS</div>

              <div className="form-row">
                <CountrySelect
                  value={shippingForm.country}
                  onChange={(val) => handleShippingChange("country", val)}
                />
              </div>

              <div className="form-row">
                <FormInput
                  placeholder="Company"
                  value={shippingForm.company}
                  onChange={(val) => handleShippingChange("company", val)}
                />
              </div>

              <div className="form-row two-columns">
                <FormInput
                  placeholder="Firstname *"
                  value={shippingForm.firstname}
                  onChange={(val) => handleShippingChange("firstname", val)}
                  error={errors.firstname}
                />
                <FormInput
                  placeholder="Surname *"
                  value={shippingForm.surname}
                  onChange={(val) => handleShippingChange("surname", val)}
                  error={errors.surname}
                />
              </div>

              <div className="form-row">
                <FormInput
                  placeholder="Street *"
                  value={shippingForm.street}
                  onChange={(val) => handleShippingChange("street", val)}
                  error={errors.street}
                />
              </div>

              <div className="form-row">
                <FormInput
                  placeholder="Address suffix"
                  value={shippingForm.addressSuffix}
                  onChange={(val) => handleShippingChange("addressSuffix", val)}
                />
              </div>

              <div className="form-row">
                <FormInput
                  placeholder="Province/State"
                  value={shippingForm.province}
                  onChange={(val) => handleShippingChange("province", val)}
                />
              </div>

              <div className="form-row two-columns">
                <FormInput
                  placeholder="Zipcode *"
                  value={shippingForm.zipcode}
                  onChange={(val) => handleShippingChange("zipcode", val)}
                  error={errors.zipcode}
                />
                <FormInput
                  placeholder="City *"
                  value={shippingForm.city}
                  onChange={(val) => handleShippingChange("city", val)}
                  error={errors.city}
                />
              </div>

              <div className="form-row">
                <FormInput
                  placeholder="VAT number"
                  value={shippingForm.vat}
                  onChange={(val) => handleShippingChange("vat", val)}
                />
              </div>

              <div className="form-label">CONTACT</div>

              <div className="form-row">
                <FormInput
                  type="email"
                  placeholder="E-mail *"
                  value={shippingForm.email}
                  onChange={(val) => handleShippingChange("email", val)}
                  error={errors.email}
                />
              </div>

              <div className="form-row">
                <FormInput
                  type="tel"
                  placeholder="Phone *"
                  value={shippingForm.phone}
                  onChange={(val) => handleShippingChange("phone", val)}
                  error={errors.phone}
                />
              </div>

              <div className="mandatory-note">*Mandatory data</div>

              <button className="order-btn" onClick={handleSubmit} disabled={isSending}>
                {isSending ? "Sending..." : "Send mail to make order"}
              </button>
              {sendStatus === "success" && (
                <p className="send-success">Order sent successfully! We will contact you soon.</p>
              )}
              {sendStatus && sendStatus !== "success" && (
                <p className="send-error">Failed to send: {sendStatus}</p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="footer">
        2023 Ningen Paper Press. Check out our latest news{" "}
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

export default ShoppingCart;
