const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("./../models/productModel");
const Booking = require("./../models/bookingModel");

exports.getCheckoutSession = async (req, res, next) => {
  try {
    //Get the currently booked product

    const product = await Product.findById(req.params.productID);

    //2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3001/?product=${req.params.productID}&user=${req.user.id}&price=${product.price}`, //Jab credit card values sahi ho jay gi to hum home page pa redirect ho jay ga
      cancel_url: `${req.protocol}://${req.get("host")}/`, //Agr cancel kara tab bhi home page pa la jay
      customer_email: req.user.email,
      client_reference_id: req.params.productID,
      line_items: [
        //Ab hum product ki details la raha ha
        //Ya necha wali field ka name stripe ki taraf sa ha to hum isa change nahi kar sakta
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${product.title} Product`,
              description: product.description,
              images: [
                //ya vo image honi chaya jo hosted ha internet pa
                "http://res.cloudinary.com/vehiclebuddy/image/upload/v1654084439/xwmgi1ku2pfxu7uckqrx.jpg",
              ],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });

    //3) Create Session as response
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.createBookingCheckout = async (req, res, next) => {
  //This is tempory because it is very insecure
  const { product, user, price } = req.query;
  if (!product && !user && !price) return next();
  try {
    await Booking.create({ product, user, price });
    //Huma query nahi chaya thi is liya hum na url chnage kar k query ko nikal diya
    res.redirect("http://localhost:3001/");
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.postBooking = async (req, res, next) => {
  try {
    console.log(req.body.Product);
    const product = req.body.Product;
    const user = req.body.User;
    const price = req.body.Price;
    const quantity = req.body.Quantity;
    const booking = await Booking.create({ product, user, price, quantity });

    res.status(201).json({
      status: "Success",
      data: booking,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.BuyUsingStripe = async (req, res, next) => {
  console.log(req.body.amount);
  var amount = req.body.amount;
  try {
    const customer = await stripe.customers.create();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "PKR",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      paymentIntent: paymentIntent.client_secret,
      // ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51LcNiZDfjQDKNGNJCnxuhFqlQVq3RMTmc7PF1VyckZc1NvxHaNvNiiaQYizidxp3f0zUd8XCshH5GqZsRZXX0zaX00qzWx0ciu",
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};
