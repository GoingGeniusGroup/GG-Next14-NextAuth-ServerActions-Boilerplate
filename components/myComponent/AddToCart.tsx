import Image from 'next/image'
import React from 'react'

const AddToCart = () => {
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <div className="bg-white border-b p-3">
              <h5 className="text-lg font-medium m-0">Cart - 2 items</h5>
            </div>
            <div className="p-4">
              {/* Single item */}
              <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/4 px-2 mb-4 lg:mb-0">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg group">
                    <Image src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                      className="w-full" alt="Blue Jeans Jacket" />
                    <a href="#!" className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"> c</a>
                  </div>
                  {/* Image */}
                </div>

                <div className="w-full lg:w-5/12 px-2 mb-4 lg:mb-0">
                  {/* Data */}
                  <p className="font-bold">Blue denim shirt</p>
                  <p>Color: blue</p>
                  <p>Size: M</p>
                  <button type="button" className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-1 mb-2 hover:bg-blue-600 transition-colors duration-300"
                    title="Remove item">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button type="button" className="bg-red-500 text-white px-2 py-1 rounded text-sm mb-2 hover:bg-red-600 transition-colors duration-300"
                    title="Move to the wish list">
                    <i className="fas fa-heart"></i>
                  </button>
                  {/* Data */}
                </div>

                <div className="w-full lg:w-1/3 px-2">
                  {/* Quantity */}
                  <div className="flex mb-4 max-w-[300px]">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-l hover:bg-blue-600 transition-colors duration-300">
                      -
                    </button>

                    <div className="flex-grow">
                      <input id="form1" min="0" name="quantity" value="1" type="number" className="w-full text-center border-t border-b border-gray-300 py-1" />
                      <label className="sr-only" htmlFor="form1">Quantity</label>
                    </div>

                    <button className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 transition-colors duration-300">
                      +
                    </button>
                  </div>
                  {/* Quantity */}

                  {/* Price */}
                  <p className="text-center lg:text-left">
                    <strong>$17.99</strong>
                  </p>
                  {/* Price */}
                </div>
              </div>
              {/* Single item */}

              <hr className="my-4" />

              {/* Single item */}
              <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/4 px-2 mb-4 lg:mb-0">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg group">
                    <Image src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                      className="w-full" alt="Red hoodie" />
                    <a href="#!" className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></a>
                  </div>
                  {/* Image */}
                </div>

                <div className="w-full lg:w-5/12 px-2 mb-4 lg:mb-0">
                  {/* Data */}
                  <p className="font-bold">Red hoodie</p>
                  <p>Color: red</p>
                  <p>Size: M</p>

                  <button type="button" className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-1 mb-2 hover:bg-blue-600 transition-colors duration-300"
                    title="Remove item">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button type="button" className="bg-red-500 text-white px-2 py-1 rounded text-sm mb-2 hover:bg-red-600 transition-colors duration-300"
                    title="Move to the wish list">
                    <i className="fas fa-heart"></i>
                  </button>
                  {/* Data */}
                </div>

                <div className="w-full lg:w-1/3 px-2">
                  {/* Quantity */}
                  <div className="flex mb-4 max-w-[300px]">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-l hover:bg-blue-600 transition-colors duration-300">
                      -
                    </button>

                    <div className="flex-grow">
                      <input id="form1" min="0" name="quantity" value="1" type="number" className="w-full text-center border-t border-b border-gray-300 py-1" />
                      <label className="sr-only" htmlFor="form1">Quantity</label>
                    </div>

                    <button className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 transition-colors duration-300">
                      +
                    </button>
                  </div>
                  {/* Quantity */}

                  {/* Price */}
                  <p className="text-center lg:text-left">
                    <strong>$17.99</strong>
                  </p>
                  {/* Price */}
                </div>
              </div>
              {/* Single item */}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 mt-4 md:mt-0 md:pl-4">
          <div className="bg-white rounded-lg shadow-md mb-4">
            <div className="bg-gray-100 py-3 px-4 rounded-t-lg">
              <h5 className="font-medium mb-0">Summary</h5>
            </div>
            <div className="p-4">
              <ul className="list-none p-0">
                <li className="flex justify-between items-center mb-2">
                  <span>Products</span>
                  <span>$53.98</span>
                </li>
                <li className="flex justify-between items-center mb-2">
                  <span>Shipping</span>
                  <span>Gratis</span>
                </li>
                <li className="flex justify-between items-center border-t pt-2 mt-2">
                  <div>
                    <strong>Total amount</strong>
                    <p className="text-sm text-gray-500 mb-0">(including VAT)</p>
                  </div>
                  <span className="font-bold">$53.98</span>
                </li>
              </ul>
              <button type="button" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300">
                Go to checkout
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md mb-4">
            <div className="p-4">
              <p className="font-bold">Expected shipping delivery</p>
              <p className="mb-0">12.10.2020 - 14.10.2020</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md mb-4 lg:mb-0">
            <div className="p-4">
              <p className="font-bold">We accept</p>
              <Image className="mr-2 inline-block" width="45"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa" />
              <Image className="mr-2 inline-block" width="45"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express" />
              <Image className="mr-2 inline-block" width="45"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard" />
              <Image className="mr-2 inline-block" width="45"
                src="https://static.vecteezy.com/system/resources/previews/022/100/701/non_2x/paypal-logo-transparent-free-png.png"
                alt="PayPal acceptance mark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToCart
